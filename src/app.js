import express from "express";
import productRouter from "./routers/product";
const app = express();
// middleware
app.use(express.json());
// routers
app.use("/api", productRouter);

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
