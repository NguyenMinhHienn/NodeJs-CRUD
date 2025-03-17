import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
    name: Joi.string().required().min(3).message({
        "any.required": "Tên sản phẩm không được để trống",
        "string.min": "Tên phải có ít nhất {#limit} ký tự",
        "any.emty": "Tên sản phẩm là bắt buộc",
    }),
    price: Joi.number().required().min(0).message({
        "number.base": "Giá sản phẩm không được để trống",
        "number.min": "Giá phải lớn hơn 0",
        "number.emty": "Giá sản phẩm là bắt buộc",
    }),
});

export const getProducts = async (req, res) => {
    const { _limit = 10, _page = 1, _sort = "price", _order = "asc" } = req.query;
    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort ]: _order === "asc" ? 1 : -1,
        },
    };
    try {
        const products = await Product.paginate({}, options);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const createProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false,
            convert: true,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const product = await Product.create(value);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Xóa thành công",
            data: product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const updateProduct = async (req, res) => {
    const { error, value } = productSchema.validate(req.body, {
        abortEarly: false,
        convert: true,
    });
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
            message: errors,
        })
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, value, {new: true});
        if (!product) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            data: product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}