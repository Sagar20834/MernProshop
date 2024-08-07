import User from "../models/UserModel.js";
import appError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(appError("No token, authorization denied", 401));
    }
    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return next(appError("Not authenticated, please login", 401));
  }
};

export default isLoggedIn;
