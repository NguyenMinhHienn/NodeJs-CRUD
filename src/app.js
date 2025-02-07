import express from "express";
// what? 1 framework nodejs
// why? nhanh, nhẹ, dễ sử dụng
// when? khi cần xây dựng 1 ứng dụng web
import mongoose from "mongoose";
import productRouter from "./routers/product";
const app = express();
app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/wd19321`);

// routers
app.use("/api", productRouter);
export const viteNodeApp = app;
