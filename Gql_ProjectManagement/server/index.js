// Setting up basic apollo-server with express

const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const mongoose = require('mongoose');
const cors = require("cors");


const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const startServer = async() => {

     const app = express();
     app.use(cors());


     // setting apollo server
     const server = new ApolloServer({typeDefs,resolvers});
     await server.start();
     server.applyMiddleware({app});

     // connecting mongo database
     mongoose.connect('mongodb://localhost:27017/',{
          useNewUrlParser: true,
          useUnifiedTopology: true,
     });


     app.listen({port:4000},()=>{
          console.log(`server is ready at http://localhost:4000${server.graphqlPath}`)
     })
}

startServer();