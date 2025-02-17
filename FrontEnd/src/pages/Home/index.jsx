import React from 'react';
import HomeSlider from '../../components/HomeSlider';
import HomeCartSlider from '../../components/HomeCartSlider';
import { LiaShippingFastSolid } from "react-icons/lia"
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductsSlider from '../../components/ProductsSlider';

export default function Home() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <HomeCartSlider />

      <section className='bg-white py-8'> 
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='leftSec'>
              <h2 className='text-[20px] font-[600]'>Popolar Products</h2>
              <p className='text-[14px] font-[400]'>Do missing...</p>
            </div>

            <div className='rightSec w-[60%]'>
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
                      <Tab label="Item One" />
                      <Tab label="Item Two" />
                      <Tab label="Item Three" />
                      <Tab label="Item Four" />
                      <Tab label="Item Five" />
                      <Tab label="Item Six" />
                      <Tab label="Item Seven" />
                    </Tabs>
            </div>
          </div>
        </div>

        <ProductsSlider />
      </section>

      <section className='py-16 bg-white '>
        <div className='container'>
            <div className='freeshipping w-full py-4 p-4 border-2 border-[red] flex items-center justify-between rounded-md'>
              <div className='col1 flex items-center'>
                <LiaShippingFastSolid className='text-[50px]'/>
                <span className='font-[600] pl-4 text-[20px]'>FREE SHIPPING</span>
              </div>
              <div className='col2'>
                <p className='mb-0 font-[500]'>FREESHIP | HỎA TỐC HCM VÀ HÀ NỘI</p>
              </div>
              <div className='font-bold text-[50px]'>
                - ONLY 200$
              </div>
            </div>

            <AdsBannerSlider items={3} />
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
