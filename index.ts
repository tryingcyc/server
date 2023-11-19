import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import estateRoutes from "./Routes/estateRoutes";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser = require("body-parser");

//For env File
dotenv.config();

const app: Application = express();

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/estates", estateRoutes);

const MONGO_URI = process.env.MONGO_URI || "";
const port = process.env.PORT || 3500;


app.listen(port, () => {
  mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
});
