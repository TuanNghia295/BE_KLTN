import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';

const ProductsSlider = (props) => {
  return (
    <div className='productsSlider mt-5'>
        <div className='container'>
            <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            loop={true}
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default ProductsSlider;