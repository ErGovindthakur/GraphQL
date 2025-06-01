// Setting up basic apollo-server with express

const express = require("express");
const {ApolloServer} = require("apollo-server-express");
// const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = require("./db/db")
const cors = require("cors");


const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");


const port = process.env.PORT || 5000;

const startServer = async() => {

     const app = express();
     app.use(cors());


     // setting apollo server
     const server = new ApolloServer({typeDefs,resolvers});
     await server.start();
     server.applyMiddleware({app});

     // connecting mongo database
     // mongoose.connect('mongodb://localhost:27017/',{
     //      useNewUrlParser: true,
     //      useUnifiedTopology: true,
     // });

     await connectDb();


     app.listen(port,()=>{
          console.log(`server is ready at http://localhost:${port}${server.graphqlPath}`)
     })
}

startServer();