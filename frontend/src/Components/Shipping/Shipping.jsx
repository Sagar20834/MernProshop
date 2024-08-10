import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { saveShippingAddress } from "../../slices/cartSlice";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";

const Shipping = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/payment";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (shippingAddress) {
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("country", shippingAddress.country);
    }
    if (!cart.cartItems.length) {
      toast.error("No items in cart. Please add items to proceed.");
      navigate("/");
      return;
    }
  }, [shippingAddress, cart, setValue]);
  const onSubmit = async ({ address, country, postalCode, city }) => {
    try {
      dispatch(saveShippingAddress({ address, country, postalCode, city }));
      navigate(`/payment`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className="max-w-[420px] min-h-52 shadow-2xl shadow-violet-500 mx-auto rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center flex-col m-8 p-2 gap-2"
        >
          <span className="text-xl font-bold mb-8 text-center">
            Fill the Shipping Details
          </span>

          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full">
            <input
              className="h-12 ml-6 rounded  py-2 px-3 text-black font-medium leading-tight focus:outline-none w-full"
              type="text"
              {...register("address", {
                required: "address is required",
              })}
              aria-invalid={errors.address ? "true" : "false"}
              placeholder="Address"
            />
            {errors.address && (
              <p
                role="alert"
                className="absolute  -top-2 -right-8 text-red-600"
              >
                ** {errors.address.message}
              </p>
            )}
          </div>
          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full">
            <input
              className="h-12 ml-6 rounded  py-2 px-3 text-black font-medium leading-tight focus:outline-none w-full"
              type="text"
              {...register("city", {
                required: "City is required",
              })}
              aria-invalid={errors.city ? "true" : "false"}
              placeholder="City"
            />
            {errors.city && (
              <p
                role="alert"
                className="absolute  -top-2 -right-8 text-red-600"
              >
                ** {errors.city.message}
              </p>
            )}
          </div>

          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full  ">
            <input
              className="h-12  ml-6 rounded w-full py-2 px-3 text-black font-medium leading-tight focus:outline-none"
              type="text"
              {...register("postalCode", {
                required: "postalCode is required",
              })}
              aria-invalid={errors.postalCode ? "true" : "false"}
              placeholder="Postal Code"
            />

            {errors.postalCode && (
              <p role="alert" className="absolute -top-2 -right-8 text-red-600">
                ** {errors.postalCode.message}
              </p>
            )}
          </div>
          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full  ">
            <input
              className="h-12  ml-6 rounded w-full py-2 px-3 text-black font-medium leading-tight focus:outline-none"
              type="text"
              {...register("country", {
                required: "Country is required",
              })}
              aria-invalid={errors.country ? "true" : "false"}
              placeholder="Country"
            />

            {errors.country && (
              <p role="alert" className="absolute -top-2 -right-8 text-red-600">
                ** {errors.country.message}
              </p>
            )}
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

export default Shipping;
