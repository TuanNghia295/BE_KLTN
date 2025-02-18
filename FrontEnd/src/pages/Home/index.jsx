import React from 'react';
import HomeSlider from '../../components/HomeSlider';
import HomeCartSlider from '../../components/HomeCartSlider';
import { LiaShippingFastSolid } from 'react-icons/lia';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      {/* <HomeCartSlider /> */}

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[20px] font-[600]">Popolar Products</h2>
              <p className="text-[14px] font-[400]">Do missing...</p>
            </div>

            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="jewellery" />
              </Tabs>
            </div>
          </div>
          <ProductsSlider items={3} />
        </div>
      </section>

      <section className="py-16 bg-white">
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
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
