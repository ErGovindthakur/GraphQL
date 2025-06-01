import { useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/queries/getSingleProduct';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;

  const { name, productId, reason, image } = data.getSingleProduct;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p><strong>Product ID:</strong> {productId}</p>
      <p><strong>Reason:</strong> {reason}</p>
      {image && <img src={image} alt={name} className="w-full mt-4" />}
      <Link to="/" className="text-blue-600 mt-4 inline-block">← Back to Products</Link>
    </div>
  );
};

export default ProductDetail;
