import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);
export default mongoose.model("Product", productSchema);
