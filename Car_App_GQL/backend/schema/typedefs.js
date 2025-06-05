// typeDefs.js

import { gql } from "apollo-server-express";

const typeDefs = gql`
  ## Custom scalar for consistent DateTime format
  scalar DateTime

  ## Enum for payment status
  enum PaymentStatus {
    PAID
    PENDING
    FAILED
  }

  ## Car type
  type Car {
    id: ID!
    carName: String!
    carPrice: Float!
    carColor: String!
    carBrand: String!
    carType: String!
    carImage: String!
    purchases: [Purchase]
  }

  ## User type (no password field exposed)
  type User {
    id: ID!
    userName: String!
    userEmail: String!
    isAdmin: Boolean!
    userImage: String!
    purchases: [Purchase]
  }

  ## Purchase type
  type Purchase {
    id: ID!
    buyer: User!
    car: Car!
    purchaseDate: DateTime!
    paymentStatus: PaymentStatus!
  }

  ## Return type
  type Return {
    id: ID!
    buyer: User!
    car: Car!
    returnDate: DateTime!
  }

  ## Queries
  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getAllCars: [Car]
    getCarById(id: ID!): Car
    getAllPurchases: [Purchase]
    getPurchaseById(id: ID!): Purchase
    getUserPurchases(id: ID!): [Purchase]
    getAllReturns: [Return]
    getUserReturns(id: ID!): [Return]
  }

  ## Mutations
  type Mutation {
    ## User mutations
    addUser(
      userName: String!
      userEmail: String!
      userPassword: String!
      userImage: String!
      isAdmin: Boolean!
    ): User

    updateUser(
      id: ID!
      userName: String!
      userEmail: String!
      userPassword: String!
      userImage: String!
      isAdmin: Boolean!
    ): User

    deleteUser(id: ID!): User

    ## Car mutations
    addCar(
      carName: String!
      carPrice: Float!
      carColor: String!
      carImage: String!
      carBrand: String!
      carType: String!
    ): Car

    updateCar(
      id: ID!
      carName: String!
      carPrice: Float!
      carColor: String!
      carImage: String!
      carBrand: String!
      carType: String!
    ): Car

    deleteCar(id: ID!): Car

    ## Purchase/Return operations
    buyCar(userId: ID!, carId: ID!): Purchase
    returnCar(purchaseId: ID!): Return
  }
`;

export default typeDefs;
