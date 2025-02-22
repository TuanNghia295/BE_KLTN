import React from 'react';
import HomeSlider from '../../components/HomeSlider';
import { LiaShippingFastSolid } from 'react-icons/lia';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import HomeCartSlider from '../../components/HomeCartSlider';
import Banner2 from '../../assets/banner/banner2.jpg';
import Banner3 from '../../assets/banner/banner3.jpg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white">
      <HomeSlider />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="flex flex-col justify-center items-center mt-4 mb-5">
            <h3 className="font-bold text-[16px]">Sabrina ionescu</h3>
            <h3 className="text-black text-[48px] font-[800] uppercase">Ride Easy</h3>
            <p className="mb-2">That’s the sound of Sabrina Ionescu changing the game.</p>
            <Button variant="contained" className="!bg-black !rounded-full">
              Shop
            </Button>
          </div>
          <Link>
            <img src={Banner3} alt="running woman"></img>
          </Link>
        </div>
      </section>

      {/* <HomeCartSlider /> */}

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec w-[30%]">
              <h2 className="text-[20px] font-[600]">Popular Products</h2>
            </div>

            <div className="rightSec ml-auto w-[20%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="standard"
                scrollButtons="block"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Jewellery" />
              </Tabs>
            </div>
          </div>
          <ProductsSlider items={3} />
        </div>
      </section>

      {/* <section className="py-16 bg-white">
        <div className="container">
          <div className="freeshipping w-full p-2 border-2 text-white border-none flex items-center justify-between rounded-md bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500">
            <div className="col1 flex-1 flex items-center text-center">
              <LiaShippingFastSolid className="text-[40px]" />
              <span className="font-[600] pl-4 text-[20px] pt-1">FREE SHIPPING</span>
            </div>
            <div className="col2 flex">
              <p className="mb-0 font-[600]  text-[20px]">FREESHIP HO CHI MINH</p>
            </div>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section> */}

      {/* <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest</h2>

          <ProductsSlider items={4} />

          <AdsBannerSlider items={4} />
        </div>
      </section> */}

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">Don't Miss</h2>
          <Link>
            <img src={Banner2} alt="running woman"></img>
          </Link>
          <div className="flex flex-col justify-center items-center mt-4">
            <h3 className="font-bold text-[16px]">Women’s Air Jordan 4RM</h3>
            <h3 className="text-black text-[48px] font-[800] uppercase">Ride Easy</h3>
            <p className="mb-2">This new take on a classic comes in a comfortable low profile with iconic style.</p>
            <Button variant="contained" className="!bg-black !rounded-full">
              Shop
            </Button>
          </div>
        </div>
      </section>

      <section className="py-5 pb-8 bg-white blogSection">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">Shop By Sport</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={12}
            className="blogSlider"
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            modules={[Pagination, Autoplay]}
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
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <br />
      <br />
      <br />
    </div>
  );
}
