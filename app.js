import express from "express";
// framework
const app = express();

// data fake
const data = [
    { id: 1, name: "Product A", price: 100 }, // item
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 300 },
    { id: 4, name: "Product D", price: 400 },
];

app.get("/products", (req, res) => {
    res.status(200).json(data);
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = data.find((item) => item.id === +id);
    if (!product) {
        return res.status(400).json({
            message: "Không có sản phẩm nào!",
        });
    }
    return res.status(200).json(product);
});
export const viteNodeApp = app;
// Nhìn - Hiểu -> Nhớ -> coding
