// Creating a return model
import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
     buyer:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
     },
     car:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Car"
     },
     returnDate:{
          type:String,
          required:true
     }
},{timestamps:true})

export default mongoose.model("ReturnModel",returnSchema);