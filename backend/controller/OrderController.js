import Order from "../models/OrderModel.js";
import appError from "../utils/appError.js";

//@desc Add user
//@route POST /api/v1/orders/
//@access private
const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  console.log(orderItems);

  try {
    if (orderItems && orderItems.length === 0) {
      return next(appError("No order items found", 400));
    }
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createOrder = await order.save();

    res.json({
      message: "Order items added successfully",
      data: createOrder,
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc get logged in user orders
//@route GET /api/v1/orders/myorders
//@access private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json({
      message: "All Orders List",
      orders,
    });
  } catch (error) {
    return next(appError("Failed to get my orders in :" + error.message, 500));
  }
};

//@desc get order by id
//@route GET /api/v1/orders/:id
//@access private admin
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) return next(appError("Order Not Found", 404));

    res.json({
      message: "Order by id",
      order,
    });
  } catch (error) {
    return next(
      appError("Failed to get order by id in :" + error.message, 500)
    );
  }
};

//@desc update order to paid
//@route PUT /api/v1/orders/:id/pay
//@access private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(appError("Order Not Found", 404));
    order.isPaid = true;
    order.paidAt = Date.now();

    //comes from paylapl request
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json({
      message: "Update order to paid",
      updatedOrder,
    });
  } catch (error) {
    return next(appError("Failed to Pay the  orders  :" + error, 500));
  }
};

//@desc update order to delivereed
//@route GET /api/v1/orders/:id/pay
//@access private ADMIN
const updateOrderToDelivered = async (req, res, next) => {
  try {
    res.json({
      message: "Update order to Delivered by admin",
    });
  } catch (error) {
    return next(appError("Failed to get orders in :" + error, 500));
  }
};

//@desc update order to delivereed
//@route GET /api/v1/orders/:id/pay
//@access private  ADMI
const getOrders = async (req, res, next) => {
  try {
    res.json({
      message: "All Orders by Admin",
    });
  } catch (error) {
    return next(appError("Failed to get orders in :" + error, 500));
  }
};

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
