// Creating carTypes and user

import { gql } from "apollo-server-express";

const typedefs = gql`
  ## Car type
  type Car {
    id: ID!
    carName: String!
    carPrice: Float!
    carColor: String!
    carBrand: String!
    carType: String!
    carImage: String!
    purchases:[Purchase]
  }

  ## User type
  type User {
    id: ID!
    userName: String!
    userEmail: String!
    userPassword:String!
    isAdmin: Boolean!
    userImage: String!
    purchases:[Purchase]
  }

  type Purchase {
    id: ID!
    buyer: User!
    car: Car!
    purchaseDate: String!
    paymentStatus: String!
  }

  ## Query definitions
  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getAllCars: [Car]
    getCarById(id: ID!): Car
    getAllPurchases: [Purchase]
    getPurchasesById(id: ID!): Purchase
    getUserPurchases(id: ID!): [Purchase]
  }

  ## Mutation definitions
  type Mutation {
    ## Add user
    addUser(
      userName: String!
      userEmail: String!
      userPassword:String!
      userImage: String!
      isAdmin: Boolean!
    ): User

    ## Update user
    updateUser(
      id: ID!
      userName: String!
      userEmail: String!
      userPassword:String!
      userImage: String!
      isAdmin: Boolean!
    ): User

    ## Delete user
    deleteUser(id: ID!): User

    ## mutation for cars

    ## addCar
    addCar(
      carName: String!
      carPrice: Float!
      carColor: String!
      carImage: String!
      carBrand: String!
      carType: String!
    ): Car

    ## updateCar
    updateCar(
      id: ID!
      carName: String!
      carPrice: Float!
      carColor: String!
      carImage: String!
      carBrand: String!
      carType: String!
    ): Car

    ## deleteCar
    deleteCar(id: ID!): Car

    ## car mutation
    buyCar(userId: ID!, carId: ID!): Purchase
  }
`;

export default typedefs;
