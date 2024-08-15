import React, { useEffect, useState } from "react";
import {
  useGetSingleProductByIdQuery,
  useUpdateProductMutation,
} from "../../slices/productApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetSingleProductByIdQuery(id);
  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [countInStock, setCountInStock] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setBrand(product.brand);
      setImage(product.image);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);

    if (image) {
      formData.append("image", image);
    }

    try {
      await updateProduct({ id, formData }).unwrap(); // unwrap to handle the result or error
      toast.success("Product updated successfully!");
      refetch();
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <div>
        <Link to="/admin/products" className="p-2 my-2 bg-green-400 rounded-md">
          Go Back
        </Link>
      </div>
      <h1 className="text-3xl md:text-5xl text-center font-bold my-4">
        Edit Product
      </h1>
      {loadingUpdateProduct && <Spinner />}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error?.data?.message || error.message}</p>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-full md:w-1/2">
            <form autoComplete="off" onSubmit={submitHandler}>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-xl font-semibold">
                  Name
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="price" className="text-xl font-semibold">
                  Price
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="description" className="text-xl font-semibold">
                  Description
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="countinstock" className="text-xl font-semibold">
                  Count in Stock
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="number"
                  id="countinstock"
                  name="countinstock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="category" className="text-xl font-semibold">
                  Category
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="brand" className="text-xl font-semibold">
                  Brand
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="brand"
                  name="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="image" className="text-xl font-semibold">
                  Image
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  autoComplete="off"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 w-48 h-48 object-cover"
                  />
                )}
              </div>

              <div className="flex justify-center my-2">
                <button
                  type="submit"
                  className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4"
                  disabled={loadingUpdateProduct}
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
