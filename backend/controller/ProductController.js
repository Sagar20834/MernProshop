import cloudinary from "../config/cloudinaryConfig.js";
import Product from "../models/ProductModel.js";
import appError from "../utils/appError.js";
import fs from "fs";
import path from "path";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    return next(appError(error.message));
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return next(appError("Product Not Found - with Id " + req.params.id));
    res.json(product);
  } catch (error) {
    return next(appError(error.message));
  }
};

//admin privete

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      name: "Sample Name",
      price: 0,
      description: "Sample Description",
      quantity: 0,
      category: "Sample Category",
      brand: "Sample Brand",
      image:
        "https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg",
      user: req.user._id,
      numReviews: 0,
    });
    res.status(201).json(product);
  } catch (error) {
    return next(appError(error.message));
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return next(appError("Product Not Found - with Id " + req.params.id));
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(appError(error.message));
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, brand, countInStock, image } =
      req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, brand, countInStock, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
