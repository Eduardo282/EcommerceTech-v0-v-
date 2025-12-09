import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';

import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext } from './graphql/context.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGODB_URI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();

  // --- 👇 MODIFICACIÓN AQUÍ ---
  // Tu configuración original bloqueaba el Sandbox de Apollo.
  // Esta configuración permite AMBOS: tu frontend Y el Sandbox.
  // Allow all origins for debugging, or strictly defined ones
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

  // Health check
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Root route to prevent 404 HTML on root hit
  app.get('/', (_req, res) => res.send('GraphQL Server Ready'));

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  // Create HTTP server for Socket.IO + Express
  const httpServer = createServer(app);

  // Initialize Socket.IO
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
    console.log('New client connected:', socket.id);

    socket.on('chat:message', (msg) => {
      // Broadcast to all clients including sender (simple chat)
      io.emit('chat:message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`);
    console.log(`🔌 Socket.IO server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
