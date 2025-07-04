require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 56173;
const uri = process.env.MONGO_URL;

const authRoute = require("./routes/AuthRoute");
const ordersRoute = require("./routes/OrderRoute");
const holdingsRoute = require("./routes/HoldingRoute");
const positionsRoute = require("./routes/PositionRoute");

const app = express();

// ✅ CORS: Allow all origins with OPTIONS support
app.use(
  cors({
    origin: true, // This allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/order", ordersRoute);
app.use("/holding", holdingsRoute);
app.use("/position", positionsRoute);

// ✅ Root route handler
app.get("/", (req, res) => {
  res.json({ message: "Zerodha Clone Backend API is running!" });
});

// ✅ Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Connect MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ✅ Export for Vercel
module.exports = app;
