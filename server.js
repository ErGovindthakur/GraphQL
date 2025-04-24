import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// Creating our first query in gql
const typeDefs = gql`
  type Query {
    greet: String
  }
`;

// here is first resolver for created query
const resolvers = {
  Query: {
    greet: () => {
      return "Hello World !";
    },
  },
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
