import Product from "../models/ProductModel.js";
import appError from "../utils/appError.js";

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

export { getProducts, getProductById };
