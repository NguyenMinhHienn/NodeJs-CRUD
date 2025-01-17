import Joi from "joi";
import Product from "../models/product";

// shcema validation
const productSchema = Joi.object({
    id: Joi.number().positive().integer().messages({
        "number.base": "ID phải là số",
        "number.positive": "ID phải là số dương",
    }),
    name: Joi.string().trim().required().min(3).messages({
        "string.base": "Tên sản phẩm phải là chuỗi",
        "string.trim": "Tên sản phẩm không được chứa khoảng trắng",
        "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
        "any.required": "Tên sản phẩm bắt buộc nhập",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Giá sản phẩm phải là số",
        "number.positive": "Giá sản phẩm phải là số dương",
        "any.required": "Giá sản phẩm bắt buộc nhập",
    }),
});

// data fake
const data = [
    { id: 1, name: "Product A", price: 100 }, // item
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 300 },
    { id: 4, name: "Product D", price: 400 }, // item
];
/**
 * @route   GET /products
 * @desc    Lấy toàn bộ danh sách sản phẩm
 * @access  Public
 * @returns {Array} Danh sách sản phẩm hiện tại
 * */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * @route   GET /products/:id
 * @desc    Lấy thông tin chi tiết của một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần lấy
 * @returns {Object} Thông tin sản phẩm hoặc thông báo lỗi
 * */
export const getProductById = async (req, res) => {
    // const id = req.params.id;
    // const product = data.find((item) => item.id === +id);
    // if (!product) {
    //     return res.status(400).json({
    //         message: "Không có sản phẩm nào!",
    //     });
    // }
    // return res.status(200).json(product);

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                message: "Không có sản phẩm nào!",
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

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
export const createProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false, // cho phép hiển thị nhiều lỗi
            convert: false, // Không cho phép convert dữ liệu đầu vào
        });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json(errors);
        }

        const product = await Product.create(value);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }

    // const existProduct = data.find((item) => item.id === +value.id);
    // if (existProduct) return res.status(400).json({ message: "Sản phẩm trùng ID!" });
    // const newProduct = { ...value, id: data.length + 1 };
    // data.push(newProduct);
    // return res.status(201).json(newProduct);
};

export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: " Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    // const { error, value } = productSchema.validate({ id: req.params.id }, { abortEarly: false });
    // const { id } = req.params;
    // const product = data.find((item) => item.id === +id);
    // if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    // // dữ liệu fake
    // data.filter((item) => item.id !== +id);
    // return res.status(200).json({
    //     message: "Xóa sản phẩm thành công",
    //     product,
    // });
};
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
export const updateProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false, // cho phép hiển thị nhiều lỗi
            convert: false, // Không cho phép convert dữ liệu đầu vào
        });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json(errors);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, value, { new: true });
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công!",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    // const { id } = req.params;
    // const body = req.body;
    // const product = data.find((item) => item.id === +id);
    // if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    // // cập nhật
    // data.map((item) => (item.id === +id ? { id: +id, ...body } : item));
    // return res.status(200).json({
    //     message: "Cập nhật sản phẩm thành công",
    //     product: { id: +id, ...body },
    // });
};
