import express from "express";

// framework
const app = express();

// middleware

app.use(express.json());
// data fake
const data = [
    { id: 1, name: "Product A", price: 100 }, // item
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 300 },
    { id: 4, name: "Product D", price: 400 },
];

// Lấy danh sách sản phẩm
app.get("/products", (req, res) => {
    res.status(200).json(data);
});

// Lấy thông tin sản phẩm theo ID
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

// Thêm sản phẩm mới
app.post("/products", (req, res) => {
    const { id, name, price } = req.body;
    // // Kiểm tra thông tin đầu vào
    if (!id || !name || !price) {
        return res.status(400).json({ message: "Thiếu thông tin sản phẩm!" });
    }
    // Kiểm tra xem sản phẩm có trùng ID không
    const existProduct = data.find((item) => item.id === +id);
    if (existProduct) return res.status(400).json({ message: "Sản phẩm trùng ID!" });
    // // Thêm sản phẩm vào danh sách

    const newProduct = { id, name, price };
    data.push(newProduct);
    return res.status(201).json(newProduct);
});

export const viteNodeApp = app;
