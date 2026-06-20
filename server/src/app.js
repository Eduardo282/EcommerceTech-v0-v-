import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expressMiddleware } from '@as-integrations/express4';
import { asyncRoute } from './http/asyncRoute.js';
import { errorMiddleware } from './http/errorMiddleware.js';
import { createCheckoutSession } from './services/StripeService.js';
import { buildContext } from './graphql/context.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authlibArchivePath = path.resolve(
  __dirname,
  '../storage/downloads/authlib-react-source.zip'
);

export function createApp(apolloServer) {
  const app = express();

  // Configuración de CORS
  app.use(cors({
    origin: [
      'https://embeddable-sandbox.cdn.apollographql.com',
      'http://localhost:5173',
      'http://localhost:3000',
      ...(process.env.FRONTEND_ORIGIN?.split(',') || []),
    ],
    credentials: true,
  }));

  app.use(cookieParser());

  // Endpoints Básicos
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.get('/', (_req, res) => res.send('GraphQL Servidor Listo y Activo'));
  app.get('/downloads/authlib-react-source.zip', (_req, res) => {
    res.setHeader('Cache-Control', 'private, no-store');
    res.download(authlibArchivePath, 'authlib-react-source.zip', (error) => {
      if (error && !res.headersSent) {
        res.status(404).json({ error: 'The source package is not available.' });
      }
    });
  });

  app.post('/create-checkout-session', express.json(), asyncRoute(async (req, res) => {
    const session = await createCheckoutSession(req.body.items, req.get('origin'));
    res.json({ id: session.id, url: session.url });
  }));

  // Endpoints GraphQl inyectando el Core de GraphQL inicializado en Root
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  app.use(errorMiddleware);

  return app;
}
