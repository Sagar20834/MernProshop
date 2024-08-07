import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import ProductRouter from "./routes/ProductRoute.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.json("API server is Up and Running , this is the API server!");
});
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
