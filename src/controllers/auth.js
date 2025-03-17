import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const userSchema = Joi.object({
    username: Joi.string().required().min(6),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

const signInSchema = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6),
});

export const signup = async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body, {
            abortEarly: false,
            convert: true,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        };
        const existUser = await User.findOne({ email: value.email });
        if (existUser) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
        }
        const hashPassword = await bcrypt.hash(value.password, 10);
        const user = await User.create({ ...value, password: hashPassword });
        user.password = undefined;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = signInSchema.validate(req.body, {
            abortEarly: false,
            convert: true,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Sai tài khoản hoặc mật khẩu",
            })
        }

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });

        user.password = undefined;

        return res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            token,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}