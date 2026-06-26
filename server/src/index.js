import 'dotenv/config';
import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';

import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

import { createApp } from './app.js';
import { initializeSocket } from './socket/index.js';

async function start() {
  // 1. Conexión a Base de Datos
  await connectDB(config.mongoUri, config.mongoDbName);

  // 2. Inicializar Apollo (Solo la instancia)
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();

  // 3. Crear App de Express pasando Apollo
  const app = createApp(apolloServer);

  // 4. Crear servidor HTTP y Sockets acoplados al App
  const httpServer = createServer(app);
  initializeSocket(httpServer);

  // 5. Encender y Escuchar!
  httpServer.listen(config.port, () => {
    console.log(`🚀 API lista en http://localhost:${config.port}`);
    console.log(`🌟 GraphQL Sandbox en http://localhost:${config.port}/graphql`);
    console.log(`🔌 Socket.IO servidor activo`);
  });
}

start().catch((err) => {
  console.error('🔥 Error fatal iniciando el servidor:', err);
  process.exit(1);
});
