import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  updateUserProfile,
  deleteUser,
  getUserByID,
  getUserProfile,
  getUsers,
} from "../controller/UserController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/", registerUser);
UserRouter.post("/logout", logoutUser);
UserRouter.get("/profile", isLoggedIn, getUserProfile);
UserRouter.put("/profile", isLoggedIn, updateUserProfile);
UserRouter.get("/", isLoggedIn, isAdmin, getUsers); //admin
UserRouter.delete("/:id", isLoggedIn, isAdmin, deleteUser); //admin
UserRouter.get("/:id", isLoggedIn, isAdmin, getUserByID); //admin
UserRouter.put("/:id", isLoggedIn, isAdmin, updateUser); //admin

export default UserRouter;
