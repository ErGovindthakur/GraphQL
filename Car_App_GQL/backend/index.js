// Setup base server file using express and gql

import express from 'express';
import cors from 'cors'
const app = express();

import { ApolloServer } from 'apollo-server-express';

import dotenv from "dotenv";
dotenv.config({});

import { connectDb } from './db/db.js';

import typeDefs from './schema/typeDefs.js';
import resolvers from "./schema/resolvers.js"

const port = process.env.PORT || 5000;

const startServer = async() => {
     try{
          await connectDb()
          app.use(cors());
          app.use(express.json());
     
     
          const server = new ApolloServer({typeDefs,resolvers});
          await server.start()
          server.applyMiddleware({app});
     
          app.listen(port,()=>{
               console.log(`server is ready at http://localhost:${port}${server.graphqlPath}`)
          })
     }
     catch(err){
          console.log("fail to start server",err.message)
     }
}

startServer();
