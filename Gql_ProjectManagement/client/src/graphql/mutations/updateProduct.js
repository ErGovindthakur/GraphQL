// writing mutation for updating product details

import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $productId: String!
    $reason: String!
    $image: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      productId: $productId
      reason: $reason
      image: $image
    ) {
      id
      name
      productId
      reason
      image
    }
  }
`;
