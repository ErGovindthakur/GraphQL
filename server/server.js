// ApolloServer: Main class to define your GraphQL server
import { ApolloServer } from "@apollo/server";
// startStandaloneServer: Helper to start the server easily without needing Express.
import { startStandaloneServer } from "@apollo/server/standalone";

// 1. Sample user data
const users = [
  { id: "1", name: "ajay", age: 23, isMarried: false },
  { id: "2", name: "vijay", age: 30, isMarried: true },
  { id: "3", name: "jay", age: 32, isMarried: true },
  { id: "4", name: "jea", age: 42, isMarried: true },
];

// 2. GraphQL type definitions (schema)
const typeDefs = `
  type Query {
    getUser: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

// 3. GraphQL resolvers
const resolvers = {
  Query: {
    getUser: () => users,

    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      return newUser; // ✅ Required to return a value
    },
  },
};

// 4. Start the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server is running at ${url}`);
