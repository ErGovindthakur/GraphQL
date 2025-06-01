// Writing mutation to addProduct

import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
mutation AddProduct($name:String!, $productId:String!,$reason:String!, $image:String!){
     addProduct(name:$name,productId:$productId, reason:$reason, image:$image){
          name
          productId
          reason
          image
     }
}
`;
