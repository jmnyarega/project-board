import {readFileSync} from "fs";

import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
const typeDefs = readFileSync("./schema.graphql", {encoding: "utf-8"});

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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
});

console.log(`🚀  Server ready at: ${url}`);
