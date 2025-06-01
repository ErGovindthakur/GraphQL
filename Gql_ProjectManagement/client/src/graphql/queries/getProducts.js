// query for getting products

import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      productId
      reason
      image
    }
  }
`;
