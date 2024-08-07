import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
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
      <div>
        <h1 className="text-center text-3xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h1 className=" my-8 text-center text-amber-600 text-xl font-bold">
            No Items in Cart{" "}
            <span className="text-green-400">
              <Link to="/">Go Back to Shop ?</Link>
            </span>
          </h1>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-2 text-2xl font-semibold mb-2 text-center mx-8">
              <div className="cart-item col-span-2">Item</div>
              <div className="item-price">Price</div>
              <div className="quantity">Quantity</div>
              <div className="total">Total</div>
            </div>
            <hr />
            {cartItems.map((cartItem, i) => {
              return (
                <div key={i} className="border-b p-4">
                  <>
                    <div
                      key={cartItem._id}
                      className="grid grid-cols-5 gap-2 items-center my-4    mx-8"
                    >
                      <div className="flex items-start gap-4  col-span-2">
                        <div className="h-12 max-w-16 mr-4">
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            className="object-fill"
                          />
                        </div>
                        <div className="">
                          <h3>{cartItem.name}</h3>
                          <div>
                            {cartItem.rating} <Rating value={cartItem.rating} />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">Nrs. {cartItem.price}</div>
                      <div className="flex items-center justify-center">
                        <button
                          className="border-gray-300 h-10 w-10 rounded-md  m-2 p-2 shadow-md bg-green-400"
                          onClick={() => {
                            dispatch(decreaseCartItemQuantity(cartItem._id));
                          }}
                        >
                          -
                        </button>
                        <span className="flex h-10 w-10 text-center justify-center items-center ">
                          {cartItem.qty}
                        </span>
                        <button
                          className="border-gray-300 h-10 w-10 m-2 p-2 rounded-md shadow-md bg-green-400"
                          onClick={() => {
                            dispatch(increaseCartItemQuantity(cartItem._id));
                          }}
                        >
                          +
                        </button>
                        <button
                          className="border-gray-300 m-2 p-2 rounded-md shadow-md bg-red-500"
                          onClick={() => {
                            dispatch(removeCartItem(cartItem._id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-center">
                        Nrs. {(cartItem.price * cartItem.qty).toFixed(2)}
                      </div>
                    </div>
                  </>
                </div>
              );
            })}
            <hr />
            <div className="grid grid-cols-6 ">
              <div className="col-start-5 col-span-2 border-4 p-2 border-black ">
                <h2 className="text-left font-bold text-3xl">Total Amount:</h2>
                <div className="text-xl font-semibold ">
                  <div className="grid grid-cols-2">
                    <p>Sub total:</p>
                    <p> {itemsPrice}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Net tax:</p>
                    <p> {taxPrice}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Net Shipping:</p>
                    <p> {shippingPrice}</p>
                  </div>
                  <div className="grid grid-cols-2 text-2xl font-bold">
                    <p>Net total Nrs.:</p>
                    <p> {totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-center items-center">
              <button
                className=" bg-green-400 p-4 rounded-lg text-xl font-semibold hover:scale-110"
                disabled={cartItems.length === 0}
                onClick={() => {
                  navigate("/login?redirect=/shipping");
                }}
              >
                {" "}
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
