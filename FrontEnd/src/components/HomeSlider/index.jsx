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
        delay: 30000,
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
        <Link to={'/listing'}>
          <div className='w-full relative'>
            <img className='object-center w-full' src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/bba76ce9-61bf-466b-b0f5-ac779feb333c/nike-just-do-it.png" alt="Jordan" />
            <div className='w-full absolute bottom-[30%] flex flex-col items-center justify-center text-white z-20'>
              <p className='px-4 py-2 bg-red-500 text-white rounded-full'>Comming Soon !</p>
              <h1 className='text-white text-[50px] xl:text-[200px] font-[800] uppercase'>Juka 4</h1>
              <p className='text-center hidden xl:block w-1/2'>Luka Dončić plays with zero remorse. He hits game winners without breaking a sweat and leaves defenders looking clueless—and he never feels bad about it. So what sort of shoes do you design for someone like that? They've got to be comfortable with firm support—ideal for step-backs, euro steps and playing bully ball in the post. Flightwire cables. IsoPlate. Cushlon foam. Air Zoom unit. It's all got to be in there. In short, you've got to give a bad man some really nice shoes.</p>
            </div>
            <div className='bg-black w-full h-full absolute top-0 left-0 opacity-50'></div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to={'/listing'}>
          <img src={nike} alt="Nike" />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
