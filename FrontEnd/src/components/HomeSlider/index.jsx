import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import jordanImage from '../../assets/banner/jordan.png';
import nike from '../../assets/banner/nike.jpg';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      autoplay={{
        delay: 3000,
        reverseDirection: false,
      }}
      modules={[Autoplay, Pagination]}
      style={{
        '--swiper-pagination-color': '#fff',
        '--swiper-pagination-left': 'auto',
        '--swiper-pagination-right': '8px',
        '--swiper-pagination-bottom': '8px',
        '--swiper-pagination-top': 'auto',
        '--swiper-pagination-fraction-color': 'inherit',
        '--swiper-pagination-progressbar-bg-color': 'rgba(0, 0, 0, 0.25)',
        '--swiper-pagination-progressbar-size': '4px',
        '--swiper-pagination-bullet-size': '8px',
        '--swiper-pagination-bullet-width': '8px',
        '--swiper-pagination-bullet-height': '8px',
        '--swiper-pagination-bullet-inactive-color': '#000',
        '--swiper-pagination-bullet-inactive-opacity': '0.2',
        '--swiper-pagination-bullet-opacity': '1',
        '--swiper-pagination-bullet-horizontal-gap': '4px',
        '--swiper-pagination-bullet-vertical-gap': '6px',
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <Link to={'/jordan'}>
          <img src={jordanImage} alt="Jordan" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to={'/nike'}>
          <img src={nike} alt="Nike" />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
