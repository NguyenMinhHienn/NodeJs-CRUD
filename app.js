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
    { id: 4, name: "Product D", price: 400 }, // item

    // 4 - {id: 4, name: "Product D update", price: 400}
];

/**
 * @route   GET /products
 * @desc    Lấy toàn bộ danh sách sản phẩm
 * @access  Public
 * @returns {Array} Danh sách sản phẩm hiện tại
 * */
app.get("/products", (req, res) => {
    res.status(200).json(data);
});
/**
 * @route   GET /products/:id
 * @desc    Lấy thông tin chi tiết của một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần lấy
 * @returns {Object} Thông tin sản phẩm hoặc thông báo lỗi
 * */
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

/**
 * @route   POST /products
 * @desc    Thêm một sản phẩm mới vào danh sách
 * @access  Public
 * @param   {Object} req.body - Dữ liệu sản phẩm được gửi trong body của request
 * @property {number} id - ID của sản phẩm (bắt buộc)
 * @property {string} name - Tên của sản phẩm (bắt buộc)
 * @property {number} price - Giá của sản phẩm (bắt buộc)
 * @returns {Object} Thông tin sản phẩm vừa được thêm hoặc thông báo lỗi
 * */

app.post("/products", (req, res) => {
    const { id, name, price } = req.body;
    // // Kiểm tra thông tin đầu vào
    if (!id || !name || !price) {
        return res.status(400).json({ message: "Thiếu thông tin sản phẩm!" });
    }
    // Kiểm tra xem sản phẩm có trùng ID không
    const existProduct = data.find((item) => item.id === +id);
    if (existProduct) return res.status(400).json({ message: "Sản phẩm trùng ID!" });
    const newProduct = { id, name, price };
    data.push(newProduct);
    return res.status(201).json(newProduct);
});
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = data.find((item) => item.id === +id);
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    // dữ liệu fake
    data.filter((item) => item.id !== +id);
    return res.status(200).json({
        message: "Xóa sản phẩm thành công",
        product,
    });
});
/**
 * @route   PUT /products/:id
 * @desc    Cập nhật thông tin một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần cập nhật
 * @param   {Object} req.body - Dữ liệu mới của sản phẩm
 * @property {string} name - Tên mới của sản phẩm (tuỳ chọn)
 * @property {number} price - Giá mới của sản phẩm (tuỳ chọn)
 * @returns {Object} Thông báo trạng thái và thông tin sản phẩm đã cập nhật
 * */
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = data.find((item) => item.id === +id);
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    // cập nhật
    data.map((item) => (item.id === +id ? { id: +id, ...body } : item));
    return res.status(200).json({
        message: "Cập nhật sản phẩm thành công",
        product: { id: +id, ...body },
    });
});
export const viteNodeApp = app;

/**
 * Xóa sản phẩm
 * B1: Định nghĩa router
 *  - METHOD: DELETE
 *  - PATH: /products/:id
 * B2: Xử lý logic
 *  - Lấy ID sản phẩm cần xóa
 *  - Kiểm tra nếu không có sản phẩm ở trong db thì báo lỗi
 *  - Xóa sản phẩm dựa theo id nhận được
 *  - Nếu thành công thi trả về thông báo
 */

/**
 * Cập nhật sản phẩm
 * B1: Đinh nghĩa router
 *  - Method: PUT
 *  - Path: /products/:id
 * B2: Xử lý logic
 *  - Lấy ID sản phẩm cần cập nhật
 *  - Kiểm tra nếu không có sản phẩm ở trong db thì báo lỗi
 *  - Cập nhật sản phẩm dựa id, body nhận được
 *      + nếu sản phẩm có id bằng với id nhận được thì cập nhật
 *      + Ngược lại thì giữ nguyên
 * - Nếu thành công thì trả về sản phẩm vừa cập nhật
 */
