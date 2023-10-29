import cors from "cors";
import http from "http";
import express from "express";
import pkg from "body-parser";
import { db } from "./utils/database.js";
import { ApolloServer } from "@apollo/server";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./guards/permissions.js";
import { typeDefs, resolvers } from "./schema/schema.js";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const { json } = pkg;

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// server.start();

app.use("/profilePhotos", express.static("public/profilePhotos"));

app.use("/signatures", express.static("public/signatures"));

app.use(graphqlUploadExpress());

app.use(
  "/graphql",
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      req: req,
      res: res,
      authHeaders: req.headers.authorization,
      clientIp: req.ip,
    }),
  })
);

db.sync();

// httpServer.listen();
httpServer.listen({ port: 3007 });
// await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));

console.log(`🚀 Server ready at http://localhost:3000/graphql`);
