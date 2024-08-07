import mongoose from "mongoose";

import dotenv from "dotenv";
import users from "./Data/User.js";
import products from "./Data/ProductData.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OrderModel.js";
import dbConnect from "./config/dbConnect.js";
dotenv.config();
dbConnect();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log("Users created", createdUsers.length);
    const adminUser = createdUsers[1]._id;

    const createdProducts = products.map((product, i) => {
      return {
        ...product,
        user: adminUser,
        reviews: product.reviews.map((review) => ({
          ...review,
          user: adminUser,
        })),
      };
    });
    await Product.insertMany(createdProducts);
    console.log("Products created", createdProducts.length);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error importing data", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error("Error destroying data", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
