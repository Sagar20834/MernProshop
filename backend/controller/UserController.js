import User from "../models/UserModel.js";
import appError from "../utils/appError.js";
import setToken from "../utils/setToken.js";

//@desc Login user
//@route POST /api/v1/users/login
//@access public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound && (await userFound.comparePassword(password))) {
      const usertosend = await User.findOne({ email }).select("-password");
      const token = setToken(userFound, res);
      res.json({
        success: true,
        message: "User logged in successfully",
        user: usertosend,
        token,
      });
    } else {
      return next(appError("Invalid username or password", 401));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Register  user
//@route POST /api/v1/users/
//@access public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(appError("Email already in use", 400));
    }
    const newUser = await User.create({ name, email, password });
    const token = setToken(newUser, res);

    res.json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc lOGOUT user
//@route POST /api/v1/users/logout
//@access private
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: true,
    });

    res.json({
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc get user profile
//@route GET /api/v1/users/profile
//@access private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        message: "User profile",
        user,
      });
    } else {
      return next(appError("User Not Found", 404));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Update user profile
//@route PUT /api/v1/users/profile
//@access private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } else {
      return next(appError("User Not Found", 404));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Update user profile
//@route GET /api/v1/users/
//@access private///ADMIN
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      message: "All users profile By Admin",
      users,
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Update user profile
//@route DELETE /api/v1/users/:id
//@access private///ADMIN
const deleteUser = async (req, res, next) => {
  try {
    res.json("Delete  profile By Admin");
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get user profile
//@route GET /api/v1/users/:id
//@access private///ADMIN
const getUserByID = async (req, res, next) => {
  try {
    res.json("Get User By Id By  Admin");
  } catch (error) {
    return next(appError(error.message, 500));
  }
};
//@desc Get user profile
//@route PUT /api/v1/users/:id
//@access private///ADMIN
const updateUser = async (req, res, next) => {
  try {
    res.json("Update  User By Id By  Admin");
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  updateUserProfile,
  deleteUser,
  getUserByID,
  getUserProfile,
  getUsers,
};
