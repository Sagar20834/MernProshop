import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import {
  useCreateReviewMutation,
  useGetSingleProductByIdQuery,
} from "../../slices/productApiSlice";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetSingleProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ id, rating, comment }).unwrap();
      console.log(res);
      refetch();
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to create review" + error?.data?.message);
      setRating(0);
      setComment("");
    }
  };

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
              Go Back
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl text-center font-bold my-4">
            Product Details
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="m-4 w-[100%] h-[40%] md:w-[30%] lg:w-[30%] flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full h-auto object-fill"
              />
            </div>
            <div className="w-full md:w-[60%] lg:w-[45%] px-4">
              <h1 className="my-4 text-2xl font-bold">{product.name}</h1>
              <hr />
              <p className="text-lg my-4">{product.description}</p>
              <hr />
              <h2 className="text-xl font-bold my-4">
                Price: Nrs. {product.price}
              </h2>
              <hr />
              <div className="flex items-center gap-4 my-4">
                <h2 className="text-xl font-bold">Rating: {product?.rating}</h2>
                <Rating value={product?.rating} />
              </div>
            </div>
            <div className="my-4 w-full md:w-[35%] lg:w-[35%] h-[30%] border-2 rounded-lg shadow-sm p-4 flex flex-col justify-between">
              <h1 className="flex justify-between items-center text-xl">
                Price: <span>Nrs. {product.price}</span>
              </h1>
              <hr />
              <h1 className="flex justify-between items-center text-xl my-2">
                Status:{" "}
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </h1>
              <hr />
              {product.countInStock > 0 && (
                <div className="flex justify-between items-center text-xl my-2">
                  <label htmlFor="qty">Quantity:</label>
                  <select
                    id="qty"
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border rounded p-1"
                  >
                    {[...Array(product.countInStock).keys()].map((item) => (
                      <option key={item + 1} value={item + 1}>
                        {item + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex items-center justify-center my-4">
                <button
                  className={`p-2 bg-green-400 rounded-md ${
                    product.countInStock === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={product.countInStock === 0}
                  onClick={() => {
                    dispatch(addToCart({ ...product, qty }));
                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className=" md:mx-24">
            <h1 className="text-left text-3xl font-bold">Reviews:</h1>
            <div className="flex justify-start flex-col">
              {product.reviews.length === 0 && (
                <>
                  <p>No reviews</p>
                </>
              )}
              {product.reviews.map((review) => (
                <div key={review._id} className="my-4">
                  <h2>{review.name}</h2>
                  <Rating value={review.rating} />
                  <p>{review.comment}</p>
                  <hr />
                </div>
              ))}
              <div>
                <h2 className="text-3xl font-bold">Write a Review:</h2>
                {loadingReview && <Spinner />}
                {userInfo ? (
                  <>
                    <form action="submit" onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="rating">Rating:</label>
                        <select
                          id="rating"
                          name="rating"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="border rounded p-1"
                        >
                          <option value="" hidden>
                            Select...
                          </option>
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="3">3-Good</option>
                          <option value="4">4-Very Good</option>
                          <option value="5">5-Excellent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows="4"
                          className="border rounded p-1 flex md:w-1/2 w-full"
                        ></textarea>
                        <div className="flex justify-left my-4">
                          <button
                            type="submit"
                            className="p-2 bg-green-400 rounded-md"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="text-2xl">Login to Continue </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
