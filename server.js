import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {users,quotes} from "./fakedb.js"

// Creating our first query in gql
const typeDefs = gql`
  type Query {
    users:[User]
    quotes:[Quote]
  }
  type User {
     id:ID!
     firstName:String
     lastName:String
     email:String
     password:String
     quotes:[Quote]
  }
  type Quote {
     quote:String
     by:ID
  }
`;

// here is first resolver for created query
const resolvers = {
  Query: {
    users:()=>users,
    quotes:()=>quotes
  },
  User: {
     quotes:(ur)=>quotes.filter((quote)=>quote.by == ur.id)
  }
};

// Server creation for gql
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Starts listening server at predefined port via "url"
server.listen().then(({ url }) => {
  console.log(`server is ready at ${url}`);
});
