import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
type User {
  name: String
}

type Card {
  name: String
  content: String
  position: Int
}

type Message {
  message: String
}

type Column {
  name: String
  position: Int
  cards: [Card]
}

type Board {
  title: String
  user: User
  columns: [Column]
}

type Mutation {
  createBoard(title: String!): Board
  updateBoard(id: ID!, title: String!): Board
  deleteBoard(id: ID!): Message
}


type Query {
    board: [Board]
    column: [Column]
    card: [Card]
}
`;

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
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
