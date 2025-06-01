// Creating resolvers

const Product = require("../models/products.models");

const resolvers = {
  // query to get data
  Query: {
    getProducts: async () => await Product.find(),
    
    // Here is the simple data which getSingleProduct method returns (parent,args(contains everything), context, info)

    getSingleProduct: async (_, { id }) => await Product.findById(id),
  },

  Mutation: {
    addProduct: async (_, args) => {
      const product = new Product(args);
      await product.save();
      return product;
    },

    updateProduct: async (_, { id, ...args }) => {
      return await Product.findByIdAndUpdate(id, args, { new: true });
    },

    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return "Product deleted";
    },
  },
};


module.exports = resolvers;