import CartModel from '../models/cartModel.js';
import ProductVariationModel from '../models/productVariationsModel.js';

export const addToCart = async (req, res) => {
  const { userId, productVariationId, quantity } = req.body;

  try {
    // Kiểm tra xem biến thể sản phẩm có tồn tại không
    const productVariation = await ProductVariationModel.findById(productVariationId);
    if (!productVariation) {
      return res.status(404).json({ message: 'Product variation not found' });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Nếu giỏ hàng đã tồn tại, kiểm tra xem biến thể sản phẩm đã có trong giỏ hàng chưa
      const itemIndex = cart.items.findIndex((item) => item.productVariationId.toString() === productVariationId);

      if (itemIndex > -1) {
        // Nếu biến thể sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Nếu biến thể sản phẩm chưa có trong giỏ hàng, thêm biến thể sản phẩm vào giỏ hàng
        cart.items.push({ productVariationId, quantity });
      }
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      cart = new CartModel({
        userId,
        items: [{ productVariationId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Cannot add to cart', error: error.message });
  }
};
