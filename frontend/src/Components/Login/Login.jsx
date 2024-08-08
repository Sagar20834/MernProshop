import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { setCredentials } from "../../slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login successful", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="max-w-[420px] min-h-52 shadow-2xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center flex-col m-8 p-2 gap-2"
        >
          <span className="text-xl font-bold mb-8 text-center">
            Please Enter the Credentials
          </span>

          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full">
            <FaEnvelope className="w-6 h-6 absolute pointer-events-none text-violet-500" />
            <input
              className="h-12 ml-6 rounded  py-2 px-3 text-black font-medium leading-tight focus:outline-none w-full"
              type="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Must be a valid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Email Address"
            />
            {errors.email && (
              <p
                role="alert"
                className="absolute  -top-2 -right-8 text-red-600"
              >
                ** {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative border-b-[1px] flex items-center focus-within:border-b-2 focus-within:border-[#B66053] w-full  ">
            <FaLock className="w-6 h-6 absolute pointer-events-none text-violet-500" />
            <input
              className="h-12  ml-6 rounded w-full py-2 px-3 text-black font-medium leading-tight focus:outline-none"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password required",
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-0 top-4 pr-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash size={20} className="text-red-500" />
              ) : (
                <FaEye size={20} className="text-green-400" />
              )}
            </button>
            {errors.password && (
              <p role="alert" className="absolute -top-2 -right-8 text-red-600">
                ** {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex gap-5 shrink">
            <button
              type="submit"
              className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4"
              disabled={isLoading ? true : false}
            >
              Login
            </button>
          </div>
          <span className="flex justify-center m-auto items-center font-bold">
            Or New User?
          </span>
          <div className="flex gap-5 shrink">
            <Link
              to={redirect ? `register?redirect=${redirect}` : "/register"}
              className="flex bg-[#B66053] min-w-32 rounded-lg text-white hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
