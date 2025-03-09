import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';
import '../ProductsSlider/style.css';

const ProductsSlider = ({items, listProducts}) => {
  return (
    <div className="productsSlider mt-5 w-full">
      <div className="container">
        <Swiper
          slidesPerView={items}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="productSlide"
          loop={true}
        >
        {listProducts.length === 0 ? (
            <p>Không có sản phẩm nào.</p>
          ) : (
          listProducts.map((product) => (
            <SwiperSlide>
              <ProductItem key={product._id} product={product} />
            </SwiperSlide>
          ))
        )}          
        
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;
