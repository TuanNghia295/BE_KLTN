import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    required: true,
  },
  items: [
    {
      productVariationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product.variations',
      },
      price: { type: Number, required: true },
    },
  ],
  payment: {
    method: { type: String, required: true },
    transactionId: { type: Number, unique: true },
    status: { type: String, required: true },
  },
  refund: {
    reason: { type: String },
    status: { type: String },
  },
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
