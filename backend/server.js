import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import ProductRouter from "./routes/ProductRoute.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import OrderRouter from "./routes/OrderRoute.js";
import path from "path";

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

app.use(globalErrorHandler);

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
  const staticPath = path.resolve("frontend", "dist");
  console.log("Serving static files from:", staticPath);
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    console.log("Request received for:", req.url);
    console.log(
      "Serving index.html from:",
      path.resolve(staticPath, "index.html")
    );
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
} else {
  console.log("Development mode");
  app.get("/", (req, res) => {
    res.json("API server is Up and Running , this is the API server!");
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
