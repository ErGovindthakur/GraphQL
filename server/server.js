import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// creating an array of users 
const users = [
     {id:1,name:'ajay', age:23, isMarried:false},
     {id:2,name:'vijay', age:30, isMarried:true},
     {id:3,name:'jay', age:32, isMarried:true},
     {id:4,name:'jea', age:42, isMarried:true},
]

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
