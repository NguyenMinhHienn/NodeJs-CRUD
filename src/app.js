import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";
const app = express();
// middleware
app.use(express.json());

// Kết nối db

mongoose.connect(`mongodb://localhost:27017/wd19321`);

// routers
app.use("/api", productRouter);
export const viteNodeApp = app;
