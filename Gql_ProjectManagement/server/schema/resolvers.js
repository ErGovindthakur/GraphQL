// Creating resolvers

const Product = require("../models/products.models");

const resolvers = {
  // query to get data
  Query: {
    getProducts: async () => await Product.find(),
    getSingleProduct: async (_, { id }) => await Product.findById(id),
  },

  Mutation: {
    updateProduct: async (_, args) => {
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