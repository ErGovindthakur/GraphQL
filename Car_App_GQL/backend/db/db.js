// creating a mongo connection

import mongoose from "mongoose";

export const connectDb = async() => {
     try{
         mongoose.connect(`${process.env.MONGO_URI}`) 

         mongoose.connection.on("connected",()=>{
          console.log("Db connected successfully")
         })

         mongoose.connection.on("error",()=>{
          console.log("Db connection error from try block");
         })

         mongoose.connection.on("disconnect",()=>{
          console.log("Db disconnected")
         })
     }
     catch(err){
          console.log("Db connection error -: ",err.message);
     }
}