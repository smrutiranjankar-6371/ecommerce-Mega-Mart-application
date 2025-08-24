require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import routes
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");

const { connectToDB } = require("./database/db");

// -------------------- server init --------------------
const server = express();

// -------------------- database connection --------------------
connectToDB();

// -------------------- middlewares --------------------
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// -------------------- serve static images --------------------
// ✅ This allows your React app to fetch images from backend/public/images
server.use("/images", express.static(path.join(__dirname, "public/images")));

// -------------------- routes --------------------
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

// -------------------- test route --------------------
server.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

// -------------------- start server --------------------
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server [STARTED] ~ http://localhost:${PORT}`);
});
