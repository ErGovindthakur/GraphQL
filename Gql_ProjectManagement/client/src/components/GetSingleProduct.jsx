import React from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PRODUCT } from "../graphql/queries/getSingleProduct";
import { useQuery } from "@apollo/client";

const GetSingleProduct = () => {
  const { id } = useParams();

  // console.log(id);
  const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: id },
    skip: !id,
  });

  if (loading) <>Data is Loading ..</>;
  if (error) <>Error -: {error.message}</>;

  const product = data?.getSingleProduct;
  //  console.log(product);

  return (
    <div>
      <h1>{product?.name || "Product Name"}</h1>
      <p>ID: {product?.productId || "Product Id"}</p>
      <p>Reason: {product?.reason || "Product Feedback"}</p>
      <img
        src={product?.image || "Product Image"}
        alt={product?.name}
        className="w-48 h-48"
      />
    </div>
  );
};

export default GetSingleProduct;
