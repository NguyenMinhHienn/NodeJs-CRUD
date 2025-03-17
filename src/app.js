import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";

const app = express();
app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/reviews`);

// routers
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

export const viteNodeApp = app;

