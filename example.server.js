// Basic packages to initial gql project

import {ApolloServer,gql} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

// Creating a Query
const typeDefs = gql`
type Query{
     myGreet: String
}
`;

// Creating a resolver for created query

const resolvers = {
     Query:{
          myGreet : ()=>{
               return "Hello Govind !";
          },
     },
};

// creating a server for running this project at apollo playground

const server = new ApolloServer({
     typeDefs,
     resolvers,
     plugins:[
          ApolloServerPluginLandingPageGraphQLPlayground
     ]
});

// listen at predefined port
server.listen().then(({url})=>{
     console.log(`Server is running at ${url}`)
});