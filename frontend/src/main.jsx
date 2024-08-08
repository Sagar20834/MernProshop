import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import ProductDetails from "./Components/Product/ProductDetails.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Cart from "./Components/Cart/Cart.jsx";
import Login from "./Components/Login/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/users/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
