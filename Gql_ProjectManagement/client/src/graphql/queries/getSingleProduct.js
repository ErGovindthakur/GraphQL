// writing query for getting a single product

import { gql } from "@apollo/client";

export const GET_SINGLE_PRODUCT = gql`
query GetSingleProduct($id:ID!){
     getSingleProduct(id:$id){
          id
          name
          productId
          reason
          image
     }
}
`