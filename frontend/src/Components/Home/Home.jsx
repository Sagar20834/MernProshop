import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { useGetAllProductsQuery } from "../../slices/productApiSlice";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className="text-center text-2xl">
          {error.data.message || error.message}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2  lg:grid-cols-3 gap-4 ">
            {products?.map(({ _id, image, name, price, rating }) => (
              <div key={_id}>
                <Product
                  key={_id}
                  id={_id}
                  image={image}
                  name={name}
                  price={price}
                  rating={rating}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
