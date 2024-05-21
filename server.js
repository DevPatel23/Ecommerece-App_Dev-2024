// aa page Admin na dashboard nu page chhe, jya category CREATE(aanu form alag banavyu chhe) karis ane GET karis

// const express = require("express");
// const colors = require("colors");
// type= es6
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"; //mongoDB connected
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

import cors from "cors";

//configure env
dotenv.config(); ////       jo alag folder maa hoy to path aapva pade --> {path:''}            ////

//database config --> connect, connect karva mondoDB ne aa connectDB() lakhyu je db.js mathi aave che
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); ////          json data ne (req,res) ma use karva mate...          ////
app.use(morgan("dev")); ////           configure morgan           ////

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

//app ---> listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode at port ${PORT}`.bgGreen
      .black
  );
});
