import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  usePayByKhaltiMutation,
} from "../../slices/orderApiSlice";

import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { formatDateNepali } from "../../utils/formatDateNepali";

const Order = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: order,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrderDetailsQuery(id);
  const orderDetails = order?.order;

  const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  const [payByKhalti, { isLoading: khaltiLoading, error: khaltiError }] =
    usePayByKhaltiMutation();

  const {
    data: paypal,
    isLoading: paypalLoading,
    error: errorpaypal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorpaypal && !paypalLoading && paypal?.clientId) {
      const loadPayPalScript = async () => {
        if (!window.paypal) {
          paypalDispatch({
            type: "resetOptions",
            value: {
              clientId: paypal.clientId,
              currency: "USD",
            },
          });
          paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        } else {
          console.log("PayPal script already loaded");
        }
      };

      if (order && !order.isPaid) {
        loadPayPalScript();
      }
    }
  }, [order, paypal, paypalDispatch, paypalLoading, errorpaypal]);

  const handleKhalti = async () => {
    console.log("working");

    const khaltiData = {
      return_url: `${window.location.origin}/order/${orderDetails._id}`,
      website_url: window.location.origin,
      amount: orderDetails.totalPrice,
      purchase_order_id: `${orderDetails._id}`,
      purchase_order_name: "Your Product Name",
      customer_info: {
        name: `${orderDetails.user.name}`,
        email: `${orderDetails.user.email}`,
        phone: `${orderDetails.user.phone}`,
      },
    };

    try {
      const { data } = await payByKhalti(khaltiData);
      console.log("Payment Initiated: ", data);
    } catch (error) {
      console.error("Payment initiation failed: ", error);
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId: id, details });
        refetch();
        toast.success("Order Paid Successfully!");
      } catch (error) {
        toast.error("Error while processing payment" + error?.data?.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId: id, details: { payer: {} } });
    refetch();
    toast.success("Order Paid Successfully!");
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: orderDetails?.totalPrice,
            },
          },
        ],
      })
      .then((id) => {
        return id;
      });
  }
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success("Order delivered Successfully!");
    } catch (error) {
      toast.error("Error while delivering order" + error?.data?.message);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <>
      <div>
        <h1>{error}</h1>
      </div>
    </>
  ) : (
    <>
      {orderDetails ? (
        <>
          {isLoading ? <Spinner /> : ""}
          <div className="flex  flex-col md:flex-row my-8 gap-8 ">
            <div className="flex flex-col gap-4 md:max-w-[70%]  w-full">
              <div>
                <h1 className="text-2xl font-bold"> Order Details </h1>
                <p>
                  <strong>Order Id : </strong>
                  {orderDetails?._id}
                </p>
              </div>
              <hr />
              <div>
                <h1 className="text-2xl font-bold"> Shipping Details </h1>
                <p className="text-green-500 text-xl font-bold">
                  <strong className="text-black text-md font-semibold">
                    Name :{" "}
                  </strong>
                  {orderDetails?.user.name}
                </p>
                <p className="text-green-500 text-xl font-bold">
                  <strong className="text-black text-md font-semibold">
                    Email :{" "}
                  </strong>
                  {orderDetails?.user.email}
                </p>
                <p>
                  <strong>Address : </strong>
                  {orderDetails?.shippingAddress.address},
                  {orderDetails?.shippingAddress.city},
                  {orderDetails?.shippingAddress.postalCode},
                  {orderDetails?.shippingAddress.country}
                </p>
                <div
                  className={` my-4${
                    orderDetails?.isDelivered
                      ? "text-green-500 bg-green-300 p-4 rounded-md"
                      : " text-red-500  bg-red-300  p-4 rounded-md"
                  }`}
                >
                  <strong>Delivery Status : </strong>
                  {orderDetails?.isDelivered ? (
                    <span>Delivered</span>
                  ) : (
                    <span className="">Not Delivered</span>
                  )}
                </div>
              </div>
              <hr />
              <div>
                <h1 className="text-2xl font-bold"> Payment Details </h1>

                <p className="text-green-500 text-xl font-bold">
                  <strong className="text-black text-md font-semibold">
                    Method :{" "}
                  </strong>
                  {orderDetails?.paymentMethod}
                </p>

                <div>
                  <div
                    className={` my-4${
                      orderDetails?.isPaid
                        ? "text-green-500 bg-green-300 p-4 rounded-md"
                        : " text-red-500  bg-red-300  p-4 rounded-md"
                    }`}
                  >
                    <strong>Payment Status : </strong>
                    {orderDetails?.isPaid ? (
                      <span>
                        Paid at {formatDateNepali(orderDetails.paidAt)}
                      </span>
                    ) : (
                      <span className="">Not Paid</span>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h1 className="text-2xl font-bold mb-2"> Order Items </h1>
                {orderDetails?.orderItems?.map((item) => (
                  <div
                    key={item?._id}
                    className="grid grid-cols-8 items-center gap-4 my-2 "
                  >
                    <div className="col-span-1">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className=" h-16 w-16 object-contain"
                      />
                    </div>
                    <div className="col-span-4">
                      <Link
                        to={`/product/${item?._id}`}
                        className="no-underline hover:underline"
                      >
                        {item?.name}
                      </Link>
                    </div>

                    <div className="col-span-3">
                      {item?.qty} x Nrs. {item?.price} = Nrs.{" "}
                      {(item?.qty * item?.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-4 md:max-w-[30%] w-full ">
              <div className=" flex flex-col shrink shadow-lg rounded-lg shadow-orange-300 p-4">
                <div className="text-2xl text-center font-bold mb-4">
                  <h1> Items Summary </h1>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Items:-</h1>
                  <p>Nrs. {orderDetails?.itemsPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Shipping:-</h1>
                  <p> Nrs. {orderDetails?.shippingPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl ">
                  <h1>Tax:-</h1>
                  <p>Nrs. {orderDetails?.taxPrice}</p>
                </div>
                <div className="grid grid-cols-2 text-xl font-semibold">
                  <h1>Total:-</h1>
                  <p>Nrs. {Math.round(orderDetails?.totalPrice)}</p>
                </div>
                {!orderDetails?.isPaid && (
                  <>
                    {payLoading && <Spinner />}
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <div className="text-center">
                          <button
                            onClick={onApproveTest}
                            className="text-2xl font-bold my-4 bg-orange-400 w-full rounded-md p-1 hover:bg-orange-300"
                          >
                            Test Pay Order{" "}
                          </button>
                          <button
                            className="text-2xl font-bold my-4 bg-violet-400 w-full rounded-md p-1 hover:bg-orange-300"
                            onClick={handleKhalti}
                          >
                            Pay By Khalti
                          </button>
                        </div>
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </>
                    )}
                  </>
                )}

                {deliverLoading && <Spinner />}
                {userInfo &&
                  userInfo.isAdmin &&
                  orderDetails.isPaid &&
                  !orderDetails.isDelivered && (
                    <>
                      <button
                        type="submit"
                        onClick={deliverOrderHandler}
                        className="flex bg-green-400 min-w-32 rounded-lg text-black hover:scale-110 justify-center items-center text-center m-auto min-h-9 my-4 transition-all ease-in-out p-2 font-medium"
                      >
                        Mark As Delivered Order
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>No Items in cart</div>
        </>
      )}
    </>
  );
};

export default Order;
