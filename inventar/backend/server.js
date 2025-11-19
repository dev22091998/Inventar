const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// .env faylni o‘qish
dotenv.config();

// MongoDB ga ulanish
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
