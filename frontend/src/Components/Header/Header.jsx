import React from "react";
import logo from "../../assets/react.svg";

import { FaBeer, FaCaretDown, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <div className="h-12 bg-gray-700 text-gray-300 ">
        <div className="flex justify-between items-center mx-6">
          <Link to="/" className="flex gap-4 text-2xl font-bold">
            <img src={logo} alt="logo" className="" />
            <h1>Shop it</h1>
          </Link>
          <div className="flex gap-4">
            <Link to="/cart" className="flex gap-1">
              <FaShoppingCart size={24} />
              <h1>Cart</h1>
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0) >
              0 ? (
                <span className="bg-violet-500  rounded-md text-center px-2">
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                </span>
              ) : (
                ""
              )}
            </Link>
            <Link to="/login" className="flex gap-1">
              <FaUser size={24} />
              <h1>Sign In</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
