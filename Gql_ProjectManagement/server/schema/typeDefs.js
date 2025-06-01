// Defining gql schema and resolvers

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  ## Here creating a product types
  type Product {
    id: ID!
    name: String!
    productId: String!
    reason: String!
    image: String
  }

  ## Here creating a query for product
  type Query {
    getProducts: [Product]
    getSingleProduct(id: ID!): Product
  }

  ## Here creating a mutation
  type Mutation {
     ## Mutation for addProduct
    addProduct(
      name: String!
      productId: String!
      reason: String!
      image: String!
    ): Product

   ## Mutation for updateProduct 
    updateProduct(
      id: ID!
      name: String!
      productId: String!
      reason: String
      image: String!
    ): Product

    ## Mutation for deleteProduct
    deleteProduct(id: ID!): String

  }
`;

module.exports = typeDefs