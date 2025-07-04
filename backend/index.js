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

// ✅ CORS: Allow all origins
app.use(
  cors({
    origin: true, // This allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/order", ordersRoute);
app.use("/holding", holdingsRoute);
app.use("/position", positionsRoute);

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
