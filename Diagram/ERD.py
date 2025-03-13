from graphviz import Digraph

# Tạo đối tượng đồ thị ERD
erd = Digraph('ERD', filename='ecommerce_ERD', format='png')
erd.attr(rankdir='LR', size='10')

# Bảng User
erd.node('User', '''User
----------------------
id (PK)
username
password
email
role
createdAt
updatedAt''', shape='box')

# Bảng Categories
erd.node('Categories', '''Categories
----------------------
id (PK)
type''', shape='box')

# Bảng Product
erd.node('Product', '''Product
----------------------
id (PK)
adminId (FK)
name
price
description
categoryId (FK)
imageUrl
createdAt
updatedAt''', shape='box')

# Bảng Product_Variation
erd.node('Product_Variation', '''Product_Variation
----------------------
id (PK)
productId (FK)
size
color
amount''', shape='box')

# Bảng Cart
erd.node('Cart', '''Cart
----------------------
id (PK)
userId (FK)
createdAt
updatedAt''', shape='box')

# Bảng Cart_Item
erd.node('Cart_Item', '''Cart_Item
----------------------
id (PK)
cartId (FK)
productVariationId (FK)
quantity''', shape='box')

# Bảng Order
erd.node('Order', '''Order
----------------------
id (PK)
userId (FK)
totalPrice
status
createdAt
updatedAt''', shape='box')

# Bảng Order_Item
erd.node('Order_Item', '''Order_Item
----------------------
id (PK)
orderId (FK)
productVariationId (FK)
price''', shape='box')

# Bảng Payment
erd.node('Payment', '''Payment
----------------------
id (PK)
orderId (FK, Unique)
paymentMethod
transactionId
status
createdAt
updatedAt''', shape='box')

# Bảng Refund
erd.node('Refund', '''Refund
----------------------
id (PK)
orderId (FK, Unique)
reason
status
createdAt
updatedAt''', shape='box')

# Thiết lập các quan hệ (Foreign Keys)
erd.edge('User', 'Product', label='1 → n (Admin quản lý)')
erd.edge('Categories', 'Product', label='1 → n (Thuộc danh mục)')
erd.edge('Product', 'Product_Variation', label='1 → n (Biến thể)')
erd.edge('User', 'Cart', label='1 → 1 (Mỗi user có 1 cart)')
erd.edge('Cart', 'Cart_Item', label='1 → n (Chứa nhiều sản phẩm)')
erd.edge('Product_Variation', 'Cart_Item', label='1 → n (Sản phẩm trong giỏ)')
erd.edge('User', 'Order', label='1 → n (User đặt nhiều order)')
erd.edge('Order', 'Order_Item', label='1 → n (Order có nhiều sản phẩm)')
erd.edge('Product_Variation', 'Order_Item', label='1 → n (Sản phẩm trong order)')
erd.edge('Order', 'Payment', label='1 → 1 (Order có thanh toán)')
erd.edge('Order', 'Refund', label='1 → 1 (Có thể được hoàn tiền)')

# Tạo tệp hình ảnh
try:
    erd.render()
    print("Tệp hình ảnh đã được tạo thành công.")
except Exception as e:
    print(f"Đã xảy ra lỗi khi tạo tệp hình ảnh: {e}")