import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductZoom from '../ProductZoom';

export default function Gallery({ product }) {
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
            img={product.imageUrl}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductZoom
            img={product.imageUrl}
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
          <img src={product.imageUrl} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.imageUrl} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
