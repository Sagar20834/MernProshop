import React, { useEffect } from "react";
import {
  FaXmark,
  FaPen,
  FaTrash,
  FaPenToSquare,
  FaPlus,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";

const AllProduct = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product created successfully");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="flex  justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div>
          <button
            className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4 transition-all ease-in-out "
            onClick={createProductHandler}
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>
      {loadingCreate && <Spinner />}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <>
          <div className="grid grid-cols-1 border-b overflow-auto">
            <table>
              <thead className="bg-orange-200 text-center">
                <tr>
                  <th>SN.</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data?.products?.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`${i % 2 === 0 ? " bg-gray-200" : "bg-white"}`}
                  >
                    <td>{i + 1}</td>
                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        className="hover:underline"
                      >
                        {product._id}
                      </Link>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>

                    <td className="px-2 md:px-4 py-2  flex">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className=" p-1 rounded-md text-xs md:text-sm mr-4">
                          <FaPenToSquare />
                        </button>
                      </Link>

                      <button
                        className=" p-1 rounded-md text-xs md:text-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={data.page}
              pages={data?.pages}
              products={data?.products}
              total={data?.productCount}
              pageSize={data?.pageSize}
              skip={data?.skip}
              pageNumber={pageNumber}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AllProduct;
