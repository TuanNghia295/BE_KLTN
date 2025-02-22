import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';
import '../ProductsSlider/style.css';

const ProductsSlider = (props) => {
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
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;
