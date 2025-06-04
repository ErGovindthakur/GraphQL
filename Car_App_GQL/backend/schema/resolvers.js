// Import Mongoose models (default imports because models were exported using `export default`)
import User from "../models/User.js";
import Car from "../models/Car.js";
import Purchase from "../models/Purchase.js";

// Define resolvers for your GraphQL types and operations
const resolvers = {
  // Top-level Query resolvers
  Query: {
    // Fetch all users from the User collection
    getAllUsers: async () => await User.find(),

    // Fetch a single user by ID
    getUserById: async (_, { id }) => await User.findById(id),

    // Fetch all cars
    getAllCars: async () => await Car.find(),

    // Fetch a car by ID
    getCarById: async (_, { id }) => await Car.findById(id),

    // Fetch all purchases, and populate user and car for reference
    getAllPurchases: async () =>
      await Purchase.find().populate("buyer").populate("car"),

    // Fetch a single purchase by its ID
    getPurchasesById: async (_, { id }) =>
      await Purchase.findById(id).populate("buyer").populate("car"),

    // Get all purchases made by a specific user
    getUserPurchases: async (_, { id }) =>
      await Purchase.find({ buyer: id }).populate("car"),
  },

  // Top-level Mutation resolvers
  Mutation: {
    // Add a new user using the provided fields
    addUser: async (
      _,
      { userName, userEmail, userPassword, userImage, isAdmin }
    ) => {
      const user = new User({
        userName,
        userEmail,
        userPassword,
        userImage,
        isAdmin,
      });
      await user.save();
      return user;
    },

    // Update a user by ID
    updateUser: async (
      _,
      { id, userName, userEmail, userPassword, userImage, isAdmin }
    ) => {
      return await User.findByIdAndUpdate(
        id,
        { userName, userEmail, userPassword, userImage, isAdmin },
        { new: true }
      );
    },

    // Delete a user and return the deleted document
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },

    // Add a new car
    addCar: async (
      _,
      { carName, carPrice, carColor, carImage, carBrand, carType }
    ) => {
      const car = new Car({
        carName,
        carPrice,
        carColor,
        carImage,
        carBrand,
        carType,
      });
      await car.save();
      return car;
    },

    // Update a car by ID
    updateCar: async (
      _,
      { id, carName, carPrice, carColor, carImage, carBrand, carType }
    ) => {
      return await Car.findByIdAndUpdate(
        id,
        { carName, carPrice, carColor, carImage, carBrand, carType },
        { new: true }
      );
    },

    // Delete a car and return the deleted document
    deleteCar: async (_, { id }) => {
      return await Car.findByIdAndDelete(id);
    },

    // Buy a car — Create a Purchase record connecting user and car
    buyCar: async (_, { userId, carId }) => {
      const purchase = new Purchase({
        buyer: userId,
        car: carId,
        purchaseDate: new Date().toISOString(), // Set current date/time
        paymentStatus: "PAID", // Default status
      });
      await purchase.save();

      // Optional: Push this purchase to user's and car's purchases array
      await User.findByIdAndUpdate(userId, {
        $push: { purchases: purchase._id },
      });

      await Car.findByIdAndUpdate(carId, {
        $push: { purchases: purchase._id },
      });

      return purchase.populate("buyer").populate("car");
    },
  },
};

export default resolvers;
