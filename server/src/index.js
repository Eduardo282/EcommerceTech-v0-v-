import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";

import { connectDB } from "./config/db.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { buildContext } from "./graphql/context.js";

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
  app.use(
    cors({
      origin: [
        "https://embeddable-sandbox.cdn.apollographql.com", // Origen del Sandbox
        ...(process.env.FRONTEND_ORIGIN?.split(",") || []), // Tus orígenes de frontend
      ],
      credentials: true,
    })
  );
  // --- 👆 FIN DE LA MODIFICACIÓN ---

  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(server, { context: buildContext })
  );

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL server running on http://localhost:${PORT}/graphql`
    );
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
