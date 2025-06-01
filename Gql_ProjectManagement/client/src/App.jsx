import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { GET_PRODUCTS } from './graphql/queries/getProducts';
import { ADD_PRODUCT } from './graphql/mutations/addProduct';
import { DELETE_PRODUCT } from './graphql/mutations/deleteProduct';
import { UPDATE_PRODUCT } from './graphql/mutations/updateProduct';

function App() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    productId: '',
    reason: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...rest } = formData;

    try {
      if (id) {
        await updateProduct({ variables: { id, ...rest } });
        toast.success('Product updated successfully!');
      } else {
        await addProduct({ variables: rest });
        toast.success('Product added successfully!');
      }
      setFormData({ id: null, name: '', productId: '', reason: '', image: '' });
      refetch();
    } catch (err) {
      toast.error('Something went wrong!',err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct({ variables: { id } });
      toast.success('Product deleted!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete!',err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-center">🛒 Product Manager</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 shadow rounded mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Product ID"
          className="border w-full p-2 rounded"
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Reason"
          className="border w-full p-2 rounded"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border w-full p-2 rounded"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded" type="submit">
          {formData.id ? 'Update' : 'Add'} Product
        </button>
      </form>

      <ul className="space-y-4">
        {data.getProducts.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow-sm bg-gray-50">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p><strong>ID:</strong> {product.productId}</p>
            <p><strong>Reason:</strong> {product.reason}</p>
            {product.image && (
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mt-2" />
            )}
            <div className="space-x-3 mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-yellow-600 hover:underline"
              >Edit</button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline"
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
