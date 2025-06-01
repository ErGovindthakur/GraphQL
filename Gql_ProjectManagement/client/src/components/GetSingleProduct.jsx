import React from 'react'
import { GET_SINGLE_PRODUCT } from '../graphql/queries/getSingleProduct'
import { useQuery } from '@apollo/client'


const GetSingleProduct = ({ProductId}) => {

     const {loading,error,data} = useQuery(GET_SINGLE_PRODUCT,{
          variables:{id:ProductId},
          skip:!ProductId
     })

     if(loading)<>Data is Loading ..</>
     if(error)<>Error -: {error.message}</>

     const product = data?.getSingleProduct;

  return (
     <div>
      <h1>{product.name}</h1>
      <p>ID: {product.productId}</p>
      <p>Reason: {product.reason}</p>
      <img src={product.image} alt={product.name} className="w-48 h-48" />
    </div>
  )
}

export default GetSingleProduct