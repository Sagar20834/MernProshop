import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/react.svg";
import { FaShoppingCart, FaUser, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { deleteCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      dispatch(deleteCredentials());
      const res = await logout().unwrap();
      toast.success(res.message);
      console.log(res);
      navigate("/");
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out user", error);
    }
  };

  return (
    <div className="h-12 bg-gray-700 text-gray-300">
      <div className="flex justify-between items-center mx-6">
        <Link to="/" className="flex gap-4 text-2xl font-bold">
          <img src={logo} alt="logo" />
          <h1>MeroProShop</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/cart" className="flex gap-1 items-center">
            <FaShoppingCart size={24} />
            <h1>Cart</h1>
            {cartItems.reduce((acc, item) => acc + Number(item.qty), 0) > 0 && (
              <span className="bg-violet-500 rounded-md text-center px-2">
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="flex gap-1 items-center focus:outline-none"
              >
                <h1>{userInfo?.name}</h1>
                <FaCaretDown />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link
                    to="/users/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex gap-1 items-center">
              <FaUser size={24} />
              <h1>Sign In</h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
