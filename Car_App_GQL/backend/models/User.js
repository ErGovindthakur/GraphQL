import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     userName:{
          type:String,
          required:true
     },
     userEmail:{
          type:String,
          required:true,
          unique:true
     },
     userPassword:{
          type:String,
          required:true
     },
     userImage:{
          type:String,
     },
     isAdmin:Boolean,
     purchases:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Purchase"
     }]
},{timestamps:true});

export default mongoose.model("User",userSchema);