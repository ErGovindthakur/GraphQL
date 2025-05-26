// ApolloServer: Main class to define your GraphQL server
import { ApolloServer } from "@apollo/server";
//startStandaloneServer: Helper to start the server easily without needing Express.
import { startStandaloneServer } from "@apollo/server/standalone";

// creating an array of users 
const users = [
     {id:1,name:'ajay', age:23, isMarried:false},
     {id:2,name:'vijay', age:30, isMarried:true},
     {id:3,name:'jay', age:32, isMarried:true},
     {id:4,name:'jea', age:42, isMarried:true},
]



// 1. Query: Used to read/fetch data (e.g., get all users)
// 2. Mutation: Used to write/change data (e.g., create user)
// 3. type user: Defines the shape of a user object
// 4. ID!, String!: The ! means "required"

const typeDefs = `

type Query{
getUser:[user]
getUserById(id:ID!):user
}

type Mutation{
createUser(name:String!, age:Int!, isMarried:Boolean!):user
}


type user{
id:ID
name:String
age:Int
isMarried:Boolean
}

`;

// 5. Resolvers
// Resolvers define how to respond to the queries and mutations in typeDefs.

// 6. 🔹 What to Learn:
// parent, args: args contains the values passed in the query/mutation.

// users.find(...): Finds a user by ID.

// users.push(...): Adds a new user to the array.

const resolvers = {
     Query: {
          getUser: () => {
               return users
          },

          getUserById: (parent,args) => {
               const id = args.id;
               return users.find((user)=>user.id === id)
          }
     },

     Mutation:{
         createUser:(parent,args)=>{

          const {name,age,isMarried} = args;

          const newUser = {
               id:(users.length+1).toString(),
               name,
               age,
               isMarried
          };
          users.push(newUser);
         } 
     }
};

// 7. Start server at port => 4000
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`server is running at ${url}`);

// Need to learn
// 1. query, 2. Mutation
// 3. typedefs, 4. resolvers
