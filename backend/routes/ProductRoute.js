import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createReview,
} from "../controller/ProductController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import multer from "multer";

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const ProductRouter = express.Router();

ProductRouter.get("/", getProducts);

ProductRouter.post("/", isLoggedIn, isAdmin, createProduct);
ProductRouter.get("/:id", getProductById);
ProductRouter.delete("/:id", isLoggedIn, isAdmin, deleteProduct);
ProductRouter.put(
  "/:id",
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  updateProduct
);

ProductRouter.post("/:id/reviews", isLoggedIn, createReview);
export default ProductRouter;
