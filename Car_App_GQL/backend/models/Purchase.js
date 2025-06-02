import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
     buyer:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
     },
     car:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Car"
     },
     purchaseDate:{
          type:String,
          required:true
     },
     paymentStatus:{
          type:String,
          required:true
     }
},{timestamps:true});

export default mongoose.model("Purchase",purchaseSchema);