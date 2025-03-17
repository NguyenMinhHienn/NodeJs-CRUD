import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        type: String,
        price: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);