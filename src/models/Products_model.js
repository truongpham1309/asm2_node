import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: String,
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("products", ProductsSchema);