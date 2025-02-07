import User from "../models/user";
import Joi from "joi";

const signupSchema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email().trim().required(),
    phone: Joi.number(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().min(6).valid(Joi.ref("password")),
});
export const signup = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors);
        }
        console.log(value);
    } catch (error) {
        return res.status(400).json({
            messages: error.message,
        });
    }
};
/**
 * Bước 1: Sử dụng Joi để validate đầu vào
 *  - username: string, minLength = 3
 *  - email: string, required, email, trim
 *  - password: string, minLength = 6, required
 *  - confirmPassword: string, required, minLength = 6, ref: password
 *  - phone: number
 *  - trả về nhiều lỗi
 * Bước 2: Kiểm tra email nếu email đã tồn tại, trả về lỗi
 * Bước 3: Nếu email chưa tồn tại, tạo user mới
 *  - Mã hóa mật khẩu trước khi lưu vào database ( sử dụng thư viện bcryptjs )
 * Bước 4: Trả về thông tin user đã tạo
 *  - Trả về id, email, username ( + token )
 *  - Không được trả về mật khẩu
 */
