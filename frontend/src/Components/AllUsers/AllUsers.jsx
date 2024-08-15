import React, { useEffect } from "react";
import { FaXmark, FaTrash, FaCheck } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
useGetUsersQuery;

const AllUsers = () => {
  const dispatch = useDispatch();
  const { data: users, isLoading, refetch, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [users]);

  const deletehandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        if (res.success) {
          toast.success("User deleted successfully");
        } else {
          toast.error(
            "Failed to delete user beacuse - " + res.error?.data?.message
          );
        }
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center font-bold text-2xl mb-4"> All users</h1>
          <div className="grid grid-cols-1 border-b  overflow-auto">
            <table>
              <thead className="bg-orange-200 text-center">
                <tr>
                  <th>SN.</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users?.map((user, i) => (
                  <tr
                    key={user._id}
                    className={`${i % 2 === 0 ? " bg-gray-200" : "bg-white"}`}
                  >
                    <td>{i + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <div className="flex justify-center items-center text-center">
                          <FaCheck className="text-green-500" />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center text-center">
                          <FaXmark className="text-red-500" />
                        </div>
                      )}
                    </td>

                    <td className=" px-2 md:px-4 py-2  flex gap-4 justify-center items-center">
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="hover:underline "
                      >
                        <button className="bg-orange-300 p-1 rounded-md text-xs md:text-sm">
                          <FaEdit className=" text-red-500 " />
                        </button>
                      </Link>
                      <button
                        className="p-1 rounded-md text-xs md:text-sm"
                        onClick={() => deletehandler(user._id)}
                      >
                        <FaTrash className="bg-white" />
                      </button>
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

export default AllUsers;
