const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productVariationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product.variations',
      },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;
