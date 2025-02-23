import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'; // Import tệp CSS tùy chỉnh

import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';

const HomeCartSlider = ({ slidesPerView }) => {
  return (
    <div className="home-cart-slider mt-5 mb-5">
      <div className="container">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          loop={true}
        >
          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to={`/product/1`}>
              <div className="item py-7 px-3 bg-white rounded-sm flex text-center items-center justify-center flex-col">
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_451,c_limit/981757c4-1988-4410-a0fb-fecd783fe41d/air-jordan-1-mid-shoes-SQf7DM.png"
                  alt="Air Jordan 1 Mid"
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                />
                <h3 className="text-[16px] font-[500] mt-2">Air Jordan 1 Mid</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCartSlider;
