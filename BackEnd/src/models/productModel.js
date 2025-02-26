import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
},{
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;