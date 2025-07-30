import {readFileSync} from "fs";
import express from "express";
import http from "http";
import cors from "cors";

import {ApolloServer} from '@apollo/server';
import {makeExecutableSchema} from "@graphql-tools/schema";
import {expressMiddleware} from "@apollo/server/express4";

import {useServer} from "graphql-ws/lib/use/ws";
import {WebSocketServer} from "ws";

const typeDefs = readFileSync("./schema.graphql", {encoding: "utf-8"});

const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export interface BoardContext {}

const user = {
  name: "josiah"
}

const cards = [
  {
    name: "one",
    content: "This is a content",
    position: 0,
  },
  {
    name: "two",
    content: "This is a content",
    position: 1,
  },
  {
    name: "two",
    content: "This is a content",
    position: 2,
  }
]

const columns = [
  {
    name: "one",
    position: 0,
    cards: [
      cards[1],
      cards[2]
    ]
  },
  {
    name: "two",
    position: 1,
    cards: [
      cards[0],
    ]
  }
]

const boards = [
  {
    title: 'The Awakening',
    user,
    columns: [
      columns[0]
    ]
  },
  {
    title: 'City of Glass',
    user,
    columns: [
      columns[1]
    ]
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    board: () => boards,
    column: () => columns,
    card: () => cards,
  },
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({typeDefs, resolvers});

  // WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Enable subscriptions
  useServer(
    {
      schema,
      context: async (ctx) => {
        return {
          user,
          dataSources: {
            boards: boards,
          },
        };
      },
    },
    wsServer
  );
  const server = new ApolloServer<BoardContext>({schema});
  await server.start();
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions)); // This handles preflight requests

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => ({boards}),
    })
  );
  await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000/graphql`);
}
startServer();
