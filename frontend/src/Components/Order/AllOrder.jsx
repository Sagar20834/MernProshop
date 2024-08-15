import React, { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const AllOrder = () => {
  const dispatch = useDispatch();
  const { data: orders, isLoading, refetch, isError } = useGetOrdersQuery();

  useEffect(() => {
    refetch();
  }, [orders]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center font-bold text-2xl mb-4"> All Orders</h1>
          <div className="grid grid-cols-1 border-b  overflow-auto">
            <table>
              <thead className="bg-orange-200 text-center">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders?.map((order, i) => (
                  <tr
                    key={order._id}
                    className={`${i % 2 === 0 ? " bg-gray-200" : "bg-white"}`}
                  >
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{Math.round(order.totalPrice)}</td>
                    <td>
                      {order.isPaid ? (
                        new Date(order.paidAt).toLocaleString()
                      ) : (
                        <div className="flex justify-center items-center text-center">
                          <FaXmark className="text-red-500" />
                        </div>
                      )}
                    </td>
                    <td>
                      {" "}
                      {order.isDelivered ? (
                        new Date(order.deliveredAt).toLocaleString()
                      ) : (
                        <div className="flex justify-center items-center text-center">
                          <FaXmark className="text-red-500" />
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="hover:underline"
                      >
                        <button className="bg-orange-300 p-1 rounded-md text-xs md:text-sm">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default AllOrder;
