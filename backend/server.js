import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import ProductRouter from "./routes/ProductRoute.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import OrderRouter from "./routes/OrderRoute.js";

dotenv.config();

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());

//middlewares
// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("API server is Up and Running , this is the API server!");
});
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/orders", OrderRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
} else {
  app.get("/", (req, res) => {
    res.json("API server is Up and Running , this is the API server!");
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "build", "index.html"));
});

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
