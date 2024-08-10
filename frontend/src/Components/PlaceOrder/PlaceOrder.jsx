import React, { useEffect } from "react";
import { useCreateOrderMutation } from "../../slices/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../../slices/cartSlice";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import {
  FaArrowRightToBracket,
  FaFirstOrder,
  FaTruckFast,
} from "react-icons/fa6";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
    if (!cart.cartItems.length) {
      toast.error("No items in cart. Please add items to proceed.");
      navigate("/");
      return;
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success("Order created successfully");
      console.log(res);
      navigate(`/order/${res.data._id}`);
    } catch (error) {
      console.log(error.data.stack);
      toast.error(error?.data.message || error.error);
    }
  };

  return (
    <>
      {cart.cartItems.length > 0 ? (
        <>
          {isLoading ? <Spinner /> : ""}
          <CheckoutSteps step1 step2 step3 step4 />
          <div className="flex  flex-col md:flex-row my-8 gap-8 ">
            <div className="flex flex-col gap-4 md:max-w-[70%]  w-full">
              <div>
                <h1 className="text-2xl font-bold"> Shipping </h1>
                <p>
                  <strong>Address : </strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
              <hr />
              <div>
                <h1 className="text-2xl font-bold"> Payment Method </h1>
                <p className="text-green-500 text-xl font-bold">
                  <strong className="text-black text-md font-semibold">
                    Method :{" "}
                  </strong>
                  {cart.paymentMethod}
                </p>
              </div>
              <hr />
              <div>
                <h1 className="text-2xl font-bold"> Order Items </h1>
                {cart.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-8 items-center gap-4 "
                  >
                    <div className="col-span-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className=" h-16 w-16 object-contain"
                      />
                    </div>
                    <div className="col-span-4">
                      <Link
                        to={`/product/${item._id}`}
                        className="no-underline hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="col-span-3">
                      {item.qty} x Nrs. {item.price} = Nrs.{" "}
                      {(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-4 md:max-w-[30%] w-full ">
              <div className=" flex flex-col shrink shadow-lg rounded-lg shadow-orange-300 p-4">
                <div className="text-2xl text-center font-bold mb-4">
                  <h1> Items Summary </h1>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Items:-</h1>
                  <p>Nrs. {cart.itemsPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Shipping:-</h1>
                  <p> Nrs. {cart.shippingPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Tax:-</h1>
                  <p>Nrs. {cart.taxPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl font-semibold">
                  <h1>Total:-</h1>
                  <p>Nrs. {Math.round(cart.totalPrice)}</p>
                </div>

                <div className="flex gap-5 shrink">
                  <button
                    type="submit"
                    onClick={placeOrderHandler}
                    className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4 transition-all ease-in-out"
                  >
                    Place Order <FaTruckFast className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>No Items in cart</div>
        </>
      )}
    </>
  );
};

export default PlaceOrder;
