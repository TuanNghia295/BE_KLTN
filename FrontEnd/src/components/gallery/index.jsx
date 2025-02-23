import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductZoom from '../ProductZoom';

export default function Gallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        lazyPreloadPrevNext={true}
      >
        <SwiperSlide>
          <ProductZoom
            img={
              'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/603c6f9c-75fd-4af1-aa21-eb78c277cd80/M+VAPOR+LITE+3+HC+C.png'
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductZoom
            img={
              'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png'
            }
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/603c6f9c-75fd-4af1-aa21-eb78c277cd80/M+VAPOR+LITE+3+HC+C.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
