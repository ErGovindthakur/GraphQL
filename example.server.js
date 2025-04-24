// Exploring basic of gql
import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {users,quotes} from "./fakedb.js";

// creating a basic query (schema)

const typeDefs = gql`
type Query{
     users:[User]
     quotes:[Quote]
}
type User{
     id:ID!
     firstName:String
     lastName:String
     email:String
     password:String,
     quotes:[Quote]
},
type Quote{
     quote:String,
     by:ID
}
`;

// creating a resolver
const resolvers = {
     Query:{
         users:()=>users,
         quotes:()=>quotes
     },
     User:{
          quotes:(ur)=>quotes.filter((quote)=>quote.by == ur.id)
     }
};

// Initializing an ApolloServer
const server = new ApolloServer({
     typeDefs,
     resolvers,
     plugins:[ApolloServerPluginLandingPageGraphQLPlayground]
});

server.listen().then(({url})=>{
     console.log(`Server is ready at ${url}`)
});