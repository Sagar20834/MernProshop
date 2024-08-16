import Product from "../models/ProductModel.js";
import appError from "../utils/appError.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { unlink } from "fs/promises";

const getProducts = async (req, res, next) => {
  try {
    const pageSize = await Product.countDocuments({});
    const page = Number(req.query.pageNumber) || 1;
    const skip = (page - 1) * pageSize;
    const productCount = await Product.countDocuments({});

    const products = await Product.find({}).limit(pageSize).skip(skip);
    res.json({ products, page, pages: Math.ceil(productCount / pageSize) });
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

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, countInStock } =
      req.body;

    // Find the existing product by its ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if a new image file is provided
    if (req.file) {
      // Specify the folder path dynamically, for example using the product ID or category
      const folderPath = `products/${product._id}`; // You can use any naming convention

      // If the product already has an image, delete the old image from Cloudinary
      if (product.image) {
        const publicId = product.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId); // Remove the old image
      }

      // Upload the new image to Cloudinary and specify the folder and public_id
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folderPath,
        public_id: product._id, // Use the product ID as the file name
        overwrite: true, // Ensure that the existing file with the same public_id is overwritten
      });

      // Remove the uploaded file from the server
      await unlink(req.file.path);

      // Update the image URL in the product object
      product.image = result.secure_url;
    }

    // Update other product fields
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.user = req.user._id;

    // Save the updated product
    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//api/v1/products/:id/review //post private
const createReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return next(appError("Product Not Found - with Id " + req.params.id));
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.json({ message: "Review added successfully", product });
  } catch (error) {
    return next(appError(error.message));
  }
};
export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
};
