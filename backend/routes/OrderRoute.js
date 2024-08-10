import express from "express";

const OrderRouter = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controller/OrderController.js";
import isAdmin from "../middlewares/isAdmin.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

//routes
OrderRouter.post("/", isLoggedIn, addOrderItems);
OrderRouter.get("/myorders", isLoggedIn, getMyOrders);
OrderRouter.put("/:id/pay", isLoggedIn, updateOrderToPaid);
OrderRouter.get("/:id", isLoggedIn, isAdmin, getOrderById); //admim
OrderRouter.put("/:id/deliver", isLoggedIn, isAdmin, updateOrderToDelivered); //admin
OrderRouter.get("/", isLoggedIn, isAdmin, getOrders); //admin

export default OrderRouter;
