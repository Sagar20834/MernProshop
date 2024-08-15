import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controller/ProductController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../config/multerConfig.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getProducts);

ProductRouter.post("/", isLoggedIn, isAdmin, createProduct);
ProductRouter.get("/:id", getProductById);
ProductRouter.delete("/:id", isLoggedIn, isAdmin, deleteProduct);
ProductRouter.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  updateProduct
);

export default ProductRouter;
