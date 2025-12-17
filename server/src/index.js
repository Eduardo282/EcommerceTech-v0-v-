import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import Stripe from 'stripe'; // Import Stripe

import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext } from './graphql/context.js';

const PORT = process.env.PORT || 4000;

// Inicializa Stripe para prevenir errores si la clave no está presente en el archivo .env
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  WARNING: STRIPE_SECRET_KEY no está presente en el archivo .env. Características de Stripe no funcionarán.');
}

async function start() {
  await connectDB(process.env.MONGODB_URI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();

  // --- 👇 MODIFICACIÓN AQUÍ ---
  // la configuración original bloqueaba el Sandbox de Apollo.
  // Esta configuración permite AMBOS: el frontend Y el Sandbox.
  // Permite todos los orígenes para depuración, o definidos estrictamente
  app.use(
    cors({
      origin: [
        'https://embeddable-sandbox.cdn.apollographql.com',
        'http://localhost:5173',
        'http://localhost:3000',
        ...(process.env.FRONTEND_ORIGIN?.split(',') || []),
      ],
      credentials: true,
    })
  );

  app.use(cookieParser());

  // Salud
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Ruta raíz para prevenir 404 HTML DE GOLPE
  app.get('/', (_req, res) => res.send('GraphQL Servidor Listo'));

  // Endpoint para crear una sesión de pago
  app.post('/create-checkout-session', express.json(), async (req, res) => {
    console.log('💰 Recibida solicitud de pago');

    if (!stripe) {
      console.error('❌ Error: Stripe no está inicializado. Falta STRIPE_SECRET_KEY.');
      return res.status(500).json({
        error: 'Error de configuración: Clave STRIPE_SECRET_KEY no encontrada en el servidor.',
      });
    }

    try {
      const { items } = req.body;
      console.log('🛒 Items recibidos:', items.length);

      // Mapea los items a items de Stripe
      const lineItems = items.map((item) => ({
        price_data: {
          currency: 'mxn', // moneda
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round((item.price || 0) * 100), // monto en centavos
        },
        quantity: 1, // Asumiendo que la cantidad es 1 para ahora
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.get('origin') || 'http://localhost:3000'}/success`, // Redirige a la página de éxito
        cancel_url: `${req.get('origin') || 'http://localhost:3000'}/cancel`, // Redirige a la página de cancelación (generalmente al carrito o la página de inicio)
      });

      res.json({ id: session.id, url: session.url });
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  // Crear HTTP server para Socket.IO + Express
  const httpServer = createServer(app);

  // Inicializar Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: [
        'https://embeddable-sandbox.cdn.apollographql.com',
        ...(process.env.FRONTEND_ORIGIN?.split(',') || []),
      ],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('chat:message', (msg) => {
      // Envía el mensaje a todos los clientes conectados
      io.emit('chat:message', msg);
    });

    socket.on('chat:clear', () => {
      io.emit('chat:clear'); // Limpia el chat para todos los clientes
    });

    socket.on('chat:delete', (id) => {
      io.emit('chat:delete', id); // Elimina un mensaje específico
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL servidor listo en http://localhost:${PORT}/graphql`);
    console.log(`🔌 Socket.IO servidor listo en http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Falló el servidor', err);
  process.exit(1);
});
