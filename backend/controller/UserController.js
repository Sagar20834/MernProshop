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
      setToken(res, userFound);

      res.json({
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: setToken(res, userFound),
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

    setToken(res, newUser);

    res.json({
      message: "User registered successfully",
      user: newUser,
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
    res.cookie("token", "", {
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
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: setToken(res, updatedUser),
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
    res.json(users);
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Update user profile
//@route DELETE /api/v1/users/:id
//@access private///ADMIN
const deleteUser = async (req, res, next) => {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) return next(appError("User Not Found", 404));
    if (userFound) {
      if (userFound.isAdmin) {
        return next(appError("User is admin and cannot be deleted", 404));
      }
      await User.findByIdAndDelete(userFound._id || userFound.id);
      res.json("Delete  profile By Admin");
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get user profile
//@route GET /api/v1/users/:id
//@access private///ADMIN
const getUserByID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    return next(appError(error.message, 500));
  }
};
//@desc Get user profile
//@route PUT /api/v1/users/:id
//@access private///ADMIN
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(appError("User Not Found", 404));
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: Boolean(updatedUser.isAdmin),
      });
    }
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
