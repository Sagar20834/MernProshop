import User from "../models/UserModel.js";
import appError from "../utils/appError.js";

const isAdmin = async (req, res, next) => {
  console.log(req);
  try {
    const user = await User.findById(req.user._id);
    const isAdmin = user.isAdmin;
    if (!isAdmin) {
      return next(appError("Unauthorized User, You are not admin", 401));
    }
    next();
  } catch (error) {
    return next(appError(error.message, 401));
  }
};

export default isAdmin;
