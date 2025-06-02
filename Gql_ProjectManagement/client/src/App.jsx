import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { GET_PRODUCTS } from "./graphql/queries/getProducts";
import { ADD_PRODUCT } from "./graphql/mutations/addProduct";
import { DELETE_PRODUCT } from "./graphql/mutations/deleteProduct";
import { UPDATE_PRODUCT } from "./graphql/mutations/updateProduct";
import { Link } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    productId: "",
    reason: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...rest } = formData;

    try {
      if (id) {
        await updateProduct({ variables: { id, ...rest } });
        toast.success("Product updated successfully!");
      } else {
        await addProduct({ variables: rest });
        toast.success("Product added successfully!");
      }
      setFormData({ id: null, name: "", productId: "", reason: "", image: "" });
      refetch();
    } catch (err) {
      toast.error("Something went wrong!", err.message);
    }
    handleFormModal(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    handleFormModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct({ variables: { id } });
      toast.success("Product deleted!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete!", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  // Writing logic to open and close form modal when user click at add product

  let handleFormModal = () => {
    setIsOpen(!isOpen ? true : false);
  };
  return (
    <div className="p-6 w-full relative">
      <Toaster />

      <button
        className="px-10 py-2 bg-blue-700 text-white rounded-sm border-none"
        onClick={handleFormModal}
      >
        Add Product
      </button>

      <div className="w-full p-3  ">
        <ul className=" grid grid-cols-1 md:grid-cols-5 gap-14 ">
          {data.getProducts.map((product) => (
            <li
              key={product.id}
              className="border p-2 rounded shadow-sm bg-gray-50 w-[270px] h-[300px]"
            >
              <Link to={`product/${product.id}`}>
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p>
                <strong>ID:</strong> {product.productId}
              </p>
              <p>
                <strong>Reason:</strong> {product.reason}
              </p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
              <div className="space-x-3 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="p-5 w-[360px] bg-amber-50 shadow-md rounded-md absolute top-[140px] left-[10px] md:left-[430px]">
          <h1 className="text-2xl font-bold mb-4 text-center">
            🛒 Product Manager
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 bg-white p-4 shadow rounded mb-6"
          >
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Product ID"
              className="border w-full p-2 rounded"
              value={formData.productId}
              onChange={(e) =>
                setFormData({ ...formData, productId: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Reason"
              className="border w-full p-2 rounded"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border w-full p-2 rounded"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              required
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
              type="submit"
            >
              {formData.id ? "Update" : "Add"} Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
