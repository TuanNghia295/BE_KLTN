import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'],
      required: true,
    },
    items: [
      {
        productVariationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product.variations',
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }, // Thêm số lượng sản phẩm
      },
    ],
    payment: {
      method: { type: String, enum: ['Cash', 'BankTransfer'], required: true },
      transactionId: { type: String }, // Transaction ID là chuỗi
      status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true },
    },
    refund: {
      reason: { type: String },
      status: { type: String, enum: ['Requested', 'Approved', 'Rejected', 'Completed'] },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
