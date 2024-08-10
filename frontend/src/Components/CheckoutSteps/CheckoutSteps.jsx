import React from "react";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center gap-4">
      <div className="text-center">
        {step1 ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-bold"
                : "text-blue-600 font-bold hover:text-blue-800"
            }
          >
            Sign In
          </NavLink>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Sign In</span>
        )}
      </div>
      <div className="text-center">
        {step2 ? (
          <NavLink
            to="/shipping"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-bold"
                : "text-blue-600 font-bold hover:text-blue-800"
            }
          >
            Shipping
          </NavLink>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>
      <div className="text-center">
        {step3 ? (
          <NavLink
            to="/payment"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-bold"
                : "text-blue-600 font-bold hover:text-blue-800"
            }
          >
            Payment
          </NavLink>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>
      <div className="text-center">
        {step4 ? (
          <NavLink
            to="/placeorder"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-bold"
                : "text-blue-600 font-bold hover:text-blue-800"
            }
          >
            Place Order
          </NavLink>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
