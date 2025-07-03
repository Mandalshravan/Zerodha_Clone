const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");

require("dotenv").config();

const authRoute = require("../routes/AuthRoute");
const ordersRoute = require("../routes/OrderRoute");
const holdingsRoute = require("../routes/HoldingRoute");
const positionsRoute = require("../routes/PositionRoute");

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://zerodha-clone-4rjo.vercel.app", // your frontend
      "https://zerodha-clone-khaki.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoute);
app.use("/order", ordersRoute);
app.use("/holding", holdingsRoute);
app.use("/position", positionsRoute);

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors());

// ✅ MongoDB connection (do NOT connect on every invocation)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
  console.log("MongoDB connected");
}

// ✅ Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ✅ Export handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
