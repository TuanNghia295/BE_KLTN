import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';
import '../ProductsSlider/style.css';
import { useState, useEffect } from 'react';

const ProductsSlider = (props) => {
  const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0); // Số trang
    const [page, setPage] = useState(1); // Trang hiện tại
  
    useEffect(() => {
      fetch(`http://localhost:3001/products/getAllProducts?page=${page}`) // Gửi trang hiện tại
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.products)) {
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setPage(data.page);
          } else {
            console.error("Dữ liệu trả về không phải là mảng", data);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    }, [page]); // useEffect sẽ chạy lại khi `page` thay đổi
    
  return (
    <div className="productsSlider mt-5 w-full">
      <div className="container">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="productSlide"
          loop={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductItem key={product._id} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;
