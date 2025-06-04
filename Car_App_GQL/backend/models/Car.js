import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
     carName:{
          type:String,
          required:true
     },
     carColor:{
          type:String,
          required:true
     },
     carPrice:{
          type:Number,
          required:true
     },
     carBrand:{
          type:String,
          required:true
     },
     carType:{
          type:String,
          required:true
     },
     carImage:String,
     purchases:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Purchase"
     }]
},{timestamps:true});

export default mongoose.model("Car",carSchema);