import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductZoom from '../ProductZoom';

export default function Gallery({imageProduct}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(imageProduct)
  return (
    <>
      {/* {Array.isArray(imageProduct) && imageProduct.length > 0 ? (
              imageProduct.map((image) => (
                <>

                </>
              ))
      ) : (
              <p>No images available</p>
      )}       */}
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
        {Array.isArray(imageProduct) && imageProduct.length > 0 ? (
              imageProduct.map((image) => (
                <>
                  <SwiperSlide>
                    <ProductZoom
                      img={image.url}
                    />
                  </SwiperSlide>
                </>
              ))
        ) : (
                <p>No images available</p>
        )}         
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2"
      >
        {Array.isArray(imageProduct) && imageProduct.length > 0 ? (
              imageProduct.map((image) => (
                <>
                  <SwiperSlide>
                  <img src={image.url} />
                </SwiperSlide>
                </>
              ))
        ) : (
                <p>No images available</p>
        )} 
      </Swiper>
    </>
  );
}
