import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import { useGetSingleProductByIdQuery } from "../../slices/productApiSlice";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { useState } from "react";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetSingleProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className="text-center text-2xl">
          {error.data.message || error.message}
        </div>
      ) : (
        <>
          <div>
            <Link to="/" className="p-2 my-2 bg-green-400 rounded-md">
              {" "}
              Go Back
            </Link>
          </div>
          <h1 className="text-5xl text-center font-bold">Product Details</h1>
          <div className="flex sm:flex-wrap md:flex-nowrap lg:flex-nowrap  xl:flex-nowrap">
            <div className=" m-4  w-[25%]  ">
              <img src={product.image} alt={product.name} />
            </div>
            <div className=" w-[45%] ">
              <h1 className=" my-6 text-2xl font-bold">{product.name}</h1>
              <hr />
              <p className="text-xl my-6"> {product.description}</p>
              <hr />
              <h2 className="text-xl font-bold my-6">
                Price: Nrs. {product.price}
              </h2>
              <hr />
              <div className="flex items-center gap-4 my-6">
                <h2 className="text-xl font-bold">Rating: {product?.rating}</h2>
                <Rating value={product?.rating} />
              </div>
            </div>
            <div className="my-4  ml-4 w-[30%] flex flex-col border-2 rounded-lg h-48 shadow-sm">
              <h1 className="h-[33%] flex justify-between items-center mx-6 text-xl ">
                price: <span> Nrs. {product.price}</span>
              </h1>
              <hr />
              <h1 className="h-[33%] flex justify-between items-center mx-6 text-xl ">
                Status:{" "}
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </h1>
              <hr />
              {product.countInStock > 0 ? (
                <div className="h-[33%] flex justify-between items-center mx-6 text-xl ">
                  <label htmlFor="qty">Quantity:</label>
                  <select
                    type="select"
                    id="qty"
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((item) => (
                      <option key={item + 1} value={item + 1}>
                        {item + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
              <hr />
              <div className="flex items-center justify-center my-2 mx-2">
                <button
                  className={`p-2 bg-green-400 rounded-md t ${
                    product.countInStock === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={product.countInStock === 0}
                  onClick={() => {
                    dispatch(addToCart({ ...product, qty }));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
