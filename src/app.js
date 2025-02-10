import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/reviews`);

// routers

export const viteNodeApp = app;
