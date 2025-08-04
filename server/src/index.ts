import { readFileSync } from "fs";
import express from "express";
import http from "http";
import cors from "cors";

import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";

import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import resolvers from "./resolvers";
import { BoarddataSource } from "./datasource";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const corsOptions = {
  origin: "http://localhost:3000", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export interface BoardContext { }
const boardsAPI = new BoarddataSource();

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const user = {};

  // Enable subscriptions
  useServer(
    {
      schema,
      context: async (_) => {
        return {
          user,
          dataSources: {
            boardsAPI: boardsAPI
          },
        };
      },
    },
    wsServer
  );
  const server = new ApolloServer<BoardContext>({
    schema,
    introspection: true
  });
  await server.start();
  app.use(cors(corsOptions));

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
startServer();
