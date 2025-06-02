import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries/getProducts';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {data.getProducts.map((product) => (
          <li key={product.id} className="border p-2">
            {/* <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline"> */}
              {product.name}
            {/* </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
