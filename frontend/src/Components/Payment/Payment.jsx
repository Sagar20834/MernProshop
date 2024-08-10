import React, { useEffect, useState } from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useForm } from "react-hook-form";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../slices/cartSlice";

const Payment = () => {
  const { register, handleSubmit, setValue } = useForm();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
    if (paymentMethod) {
      setValue("paymentMethod", paymentMethod);
    }
    if (!cart.cartItems.length) {
      toast.error("No items in cart. Please add items to proceed.");
      navigate("/");
      return;
    }
  }, [shippingAddress, navigate]);
  const onSubmitHandler = (data) => {
    if (data.paymentMethod === null) {
      toast.warning("Please select a payment method");
      return;
    }
    dispatch(savePaymentMethod(data.paymentMethod));
    navigate("/placeorder");
    console.log(data);
  };
  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div className="max-w-[420px] min-h-52 shadow-2xl shadow-violet-500 mx-auto rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex justify-center items-center flex-col m-8 p-2 gap-2"
        >
          <h1 className=" text-xl font-bold mb-8 text-center">
            Payment Method
          </h1>
          <div className="flex gap-2 shadow-md p-2 hover:scale-105 rounded-md">
            <label htmlFor="paypal">Paypal</label>
            <input
              {...register("paymentMethod")}
              type="radio"
              value={"PayPal"}
            />
          </div>
          <div className="flex gap-2 shadow-md p-2 hover:scale-105 rounded-md">
            <label htmlFor="esewa">Esewa</label>
            <input
              {...register("paymentMethod")}
              type="radio"
              value={"Esewa"}
            />
          </div>
          <div className="flex gap-2 shadow-md p-2 hover:scale-105 rounded-md">
            <label htmlFor="cashondelivery">Cash On Delivery</label>
            <input
              {...register("paymentMethod")}
              type="radio"
              value={"cashondelivery"}
            />
          </div>
          <div className="flex gap-5 shrink">
            <button
              type="submit"
              className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4"
            >
              Continue <FaArrowRightToBracket className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
