import express from "express";

const app = express();

app.listen(() => {
    console.log("Server is running!");
});
export const viteNodeApp = app;
