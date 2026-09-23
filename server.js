import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoutes from './routes/orderRoutes.js'
import cors from "cors";
//config env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use('/api/v1/subcategory',subCategoryRoutes)
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use('/api/v1/order', orderRoutes)

//test api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ECommerce app",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on PORT ${PORT}`.bgBlue
      .white
  );
});
