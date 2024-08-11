import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../../slices/orderApiSlice";
import { FaCheck, FaCross, FaXmark } from "react-icons/fa6";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const dispatch = useDispatch();
  console.log(orders);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const updatedUser = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      console.log(updatedUser);
      dispatch(setCredentials(updatedUser));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile" + err?.data?.message);
    }
  };

  return (
    <>
      {loadingUpdateProfile ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col md:flex-row sm:flex-col justify-between  p-2 gap-4">
            <div className="w-full md:w-1/3">
              <form autoComplete="off" onSubmit={onSubmit}>
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
                <div className="flex flex-col mb-4">
                  <label htmlFor="password" className="text-xl font-semibold">
                    Password
                  </label>
                  <input
                    className="border border-gray-500 p-2 rounded-md"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="confirmpassword"
                    className="text-xl font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="border border-gray-500 p-2 rounded-md"
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex justify-center my-2">
                  <button
                    type="submit"
                    className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4"
                    disabled={loadingUpdateProfile ? true : false}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
            <div className="w-auto md:w-2/3">
              <h2 className="text-2xl font-bold text-center mb-4">My Orders</h2>
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <p>{error?.data?.message}</p>
              ) : (
                <>
                  <table className="table-auto w-full border-collapse border border-gray-300 text-xs md:text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-2 md:px-4 py-2">
                          Order ID
                        </th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2">
                          Date
                        </th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2">
                          Total
                        </th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2">
                          Paid
                        </th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2">
                          Delivered
                        </th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.data?.map((order, index) => (
                        <tr
                          key={order._id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="border border-gray-300 px-2 md:px-4 py-2">
                            <Link
                              to={`/order/${order._id}`}
                              className="hover:underline"
                            >
                              {order._id}
                            </Link>
                          </td>
                          <td className="border border-gray-300 px-2 md:px-4 py-2">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                          <td className="border border-gray-300 px-2 md:px-4 py-2">
                            Nrs. {Math.round(order.totalPrice.toFixed(2))}
                          </td>
                          <td className="border border-gray-300 px-2 md:px-4 py-2">
                            {order?.isPaid ? (
                              new Date(order?.paidAt).toLocaleString()
                            ) : (
                              <FaXmark className="text-red-600" />
                            )}
                          </td>
                          <td className="border border-gray-300 px-2 md:px-4 py-2">
                            {order.isDelivered ? (
                              new Date(order?.deliveredAt).toLocaleString()
                            ) : (
                              <FaXmark className="text-red-600" />
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
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
