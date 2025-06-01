// creating a simple product model schema using mongoose

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name:{
          type:String,
     },
     productId:{
          type:String,
          unique:true
     },
     reason:{
          type:String,
     },
     image:{
          type:String
     }
},{timestamps:true});

const ProductModel = mongoose.model("ProductGql",productSchema);

module.exports = ProductModel;