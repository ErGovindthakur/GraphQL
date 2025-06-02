import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
     carName:String,
     carColor:String,
     carPrice:Number,
     carBrand:String,
     carType:String,
     carImage:String,
     purchases:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Purchase"
     }]
},{timestamps:true});

export default mongoose.model("Car",carSchema);