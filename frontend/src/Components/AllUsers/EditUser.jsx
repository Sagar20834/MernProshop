import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";

const EditUser = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(id);
  const [updatedUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updatedUser({ id, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully!");
      refetch();
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <div>
        <Link to="/admin/users" className="p-2 my-2 bg-green-400 rounded-md">
          Go Back
        </Link>
      </div>
      <h1 className="text-3xl md:text-5xl text-center font-bold my-4">
        Edit User
      </h1>
      {(isLoading || loadingUpdateUser) && <Spinner />}
      {error ? (
        <p>{error?.data?.message || error.message}</p>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-full md:w-1/2">
            <form autoComplete="off" onSubmit={submitHandler}>
              <div className="flex flex-col mb-4">
                <label htmlFor="userid" className="text-xl font-semibold">
                  User Id
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="userid"
                  name="userid"
                  value={userId}
                  readOnly
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-xl font-semibold">
                  Name
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-xl font-semibold">
                  Email
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex  mb-4  gap-4 items-center">
                <label htmlFor="isAdmin" className="text-xl font-semibold">
                  Is Admin
                </label>
                <input
                  className="border border-gray-500 p-2 rounded-md h-8 w-6"
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-center my-2">
                <button
                  type="submit"
                  className={`flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4 ${
                    loadingUpdateUser ? "bg-red-500" : " bg-green-400"
                  }`}
                  disabled={loadingUpdateUser}
                >
                  {loadingUpdateUser ? "Updating..." : "Update User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default EditUser;
