import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    useSelector((state) => state.cart);

  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <h1 className="my-8 text-center text-amber-600 text-xl font-bold">
            No Items in Cart{" "}
            <span className="text-green-400">
              <Link to="/">Go Back to Shop?</Link>
            </span>
          </h1>
        ) : (
          <>
            {/* Header for Cart Items */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-xl md:text-2xl font-semibold mb-2 text-center mx-2 md:mx-8">
              <div className="cart-item col-span-5 text-center">Item</div>
              <div className="item-price col-span-2">Price</div>
              <div className="quantity col-span-3 mr-8">Quantity</div>
              <div className="total col-span-2">Total</div>
            </div>
            <hr className="hidden md:block" />

            {/* Cart Items */}
            {cartItems.map((cartItem, i) => (
              <div key={i} className="border-b p-2 ">
                <div
                  key={cartItem._id}
                  className="flex flex-col md:flex-row gap-4 items-center my-4 mx-2 md:mx-8  "
                >
                  {/* Item and Image */}
                  <div className="flex flex-col md:flex-row items-start gap-4 md:w-5/12 ">
                    <div className="h-24 w-full md:w-16 flex-shrink-0">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="object-contain h-full w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg md:text-xl">{cartItem.name}</h3>
                      <div className="flex text-center items-center">
                        {cartItem.rating} <Rating value={cartItem.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center md:w-2/12">
                    Nrs. {cartItem.price}
                  </div>

                  {/* Quantity and Buttons */}
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-4 md:mt-0 md:w-3/12">
                    <div className="flex items-center">
                      <button
                        className="border-gray-300 h-8 w-8 md:h-10 md:w-10 rounded-md m-1 p-1 shadow-md bg-green-400"
                        onClick={() => {
                          dispatch(decreaseCartItemQuantity(cartItem._id));
                        }}
                      >
                        -
                      </button>
                      <span className="flex h-8 w-8 md:h-10 md:w-10 text-center justify-center items-center border border-gray-300 rounded-md">
                        {cartItem.qty}
                      </span>
                      <button
                        className="border-gray-300 h-8 w-8 md:h-10 md:w-10 rounded-md m-1 p-1 shadow-md bg-green-400"
                        onClick={() => {
                          dispatch(increaseCartItemQuantity(cartItem._id));
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="border-gray-300 h-8 w-auto md:h-10 rounded-md m-1 p-1 md:p-2 shadow-md bg-red-500 text-white mt-2 md:mt-0"
                      onClick={() => {
                        dispatch(removeCartItem(cartItem._id));
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Total */}
                  <div className="text-center md:text-center mt-4 md:mt-0 ">
                    Nrs. {(cartItem.price * cartItem.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="md:col-start-3  p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-left font-bold text-xl md:text-3xl">
                  Total Amount:
                </h2>
                <div className="text-sm md:text-xl xl:text-xl font-semibold mt-4">
                  <div className="grid grid-cols-2">
                    <p>Sub total:</p>
                    <p>Nrs. {itemsPrice}</p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-2">
                    <p>Net tax:</p>
                    <p>Nrs. {taxPrice}</p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-2">
                    <p>Net Shipping:</p>
                    <p>Nrs. {shippingPrice}</p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-2 text-xl md:text-2xl font-bold">
                    <p>Net total :</p>
                    <p>Nrs. {Math.round(totalPrice)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center items-center mt-8">
              <button
                className="bg-green-400 p-4 rounded-lg text-lg md:text-xl font-semibold hover:scale-105 transition-transform"
                disabled={cartItems.length === 0}
                onClick={() => {
                  navigate("/login?redirect=/shipping");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
