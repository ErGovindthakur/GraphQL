import { GraphQLScalarType, Kind } from "graphql";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Purchase from "../models/Purchase.js";
import Return from "../models/Return.js";

// Custom scalar for DateTime (ISO String)
const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO 8601 DateTime scalar type",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : value;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const resolvers = {
  DateTime,

  Query: {
    getAllUsers: async () => await User.find(),

    getUserById: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    },

    getAllCars: async () => await Car.find(),

    getCarById: async (_, { id }) => {
      const car = await Car.findById(id);
      if (!car) throw new Error("Car not found");
      return car;
    },

    getAllPurchases: async () =>
      await Purchase.find().populate("buyer").populate("car"),

    getPurchaseById: async (_, { id }) => {
      const purchase = await Purchase.findById(id)
        .populate("buyer")
        .populate("car");
      if (!purchase) throw new Error("Purchase not found");
      return purchase;
    },

    getUserPurchases: async (_, { id }) =>
      await Purchase.find({ buyer: id }).populate("car"),

    getAllReturns: async () => await Return.find().populate("buyer").populate("car"),

    getUserReturns: async (_, { id }) =>
      await Return.find({ buyer: id }).populate("car"),
  },

  Mutation: {
    addUser: async (_, { userName, userEmail, userPassword, userImage, isAdmin }) => {
      const user = new User({ userName, userEmail, userPassword, userImage, isAdmin });
      await user.save();
      return user;
    },

    updateUser: async (_, { id, userName, userEmail, userPassword, userImage, isAdmin }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, userEmail, userPassword, userImage, isAdmin },
        { new: true }
      );
      if (!updatedUser) throw new Error("User not found");
      return updatedUser;
    },

    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("User not found");
      return deletedUser;
    },

    addCar: async (_, { carName, carPrice, carColor, carImage, carBrand, carType }) => {
      const car = new Car({ carName, carPrice, carColor, carImage, carBrand, carType });
      await car.save();
      return car;
    },

    updateCar: async (_, { id, carName, carPrice, carColor, carImage, carBrand, carType }) => {
      const updatedCar = await Car.findByIdAndUpdate(
        id,
        { carName, carPrice, carColor, carImage, carBrand, carType },
        { new: true }
      );
      if (!updatedCar) throw new Error("Car not found");
      return updatedCar;
    },

    deleteCar: async (_, { id }) => {
      const deletedCar = await Car.findByIdAndDelete(id);
      if (!deletedCar) throw new Error("Car not found");
      return deletedCar;
    },

    buyCar: async (_, { userId, carId }) => {
      // Check if user and car exist
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      const car = await Car.findById(carId);
      if (!car) throw new Error("Car not found");

      const purchase = new Purchase({
        buyer: userId,
        car: carId,
        purchaseDate: new Date(),
        paymentStatus: "PAID",
      });
      await purchase.save();

      // Add purchase references
      await User.findByIdAndUpdate(userId, { $push: { purchases: purchase._id } });
      await Car.findByIdAndUpdate(carId, { $push: { purchases: purchase._id } });

      return purchase.populate("buyer").populate("car");
    },

    returnCar: async (_, { purchaseId }) => {
      const purchase = await Purchase.findById(purchaseId);
      if (!purchase) throw new Error("Purchase not found");

      const returnEntry = new Return({
        buyer: purchase.buyer,
        car: purchase.car,
        returnDate: new Date(),
      });
      await returnEntry.save();

      await Purchase.findByIdAndDelete(purchaseId);

      return await returnEntry.populate("buyer").populate("car");
    },
  },

  // Nested resolvers for types that contain references
  User: {
    purchases: async (parent) => await Purchase.find({ buyer: parent.id }),
  },

  Car: {
    purchases: async (parent) => await Purchase.find({ car: parent.id }),
  },

  Purchase: {
    buyer: async (parent) => await User.findById(parent.buyer),
    car: async (parent) => await Car.findById(parent.car),
  },

  Return: {
    buyer: async (parent) => await User.findById(parent.buyer),
    car: async (parent) => await Car.findById(parent.car),
  },
};

export default resolvers;
