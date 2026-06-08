require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const moduleRoutes = require("./routes/modules");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/auth", authRoutes);

app.use("/user", userRoutes);
app.use("/modules", moduleRoutes);



if (!global.mongoose) {
  global.mongoose = mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
}

module.exports = app;
