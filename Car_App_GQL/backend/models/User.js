import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     userName:String,
     userEmail:String,
     userPassword:String,
     userImage:String,
     isAdmin:Boolean,
     purchases:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Purchase"
     }]
},{timestamps:true});

export default mongoose.model("User",userSchema);