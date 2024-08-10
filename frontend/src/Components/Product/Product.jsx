import React, { useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

const Product = ({ id, image, name, price, rating }) => {
  return (
    <>
      <div className="max-h-96 max-w-64 border-2 rounded-md shadow-xl p-4 shadow-violet-300 hover:scale-110 hover:-translate-y-1 transition  ease-in-out  ">
        <Link to={`/product/${id}`}>
          <div className="h-48 flex items-center">
            <img
              className="h-full object-contain m-auto p-4"
              src={image}
              alt={name}
            />
          </div>
        </Link>
        <Link to={`/product/${id}`}>
          <h1 className="text-ellipsis overflow-hidden text-nowrap">{name}</h1>
        </Link>

        <h2>Price: Nrs. {price}</h2>
        <Rating value={rating} />
      </div>
    </>
  );
};

export default Product;
