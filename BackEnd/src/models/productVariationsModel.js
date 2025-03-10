import mongoose from 'mongoose';

const productVariations = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductVariationsModel = mongoose.model('ProductVariations', productVariations);
export default ProductVariationsModel;
