import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import ProductZoom from '../../components/ProductZoom';
import '../ProductDetails/style.css';
import { Button } from '@mui/material';
import HomeCartSlider from '../../components/HomeCartSlider';
import Gallery from '../../components/gallery';
import Size from '../../components/Size';

const ProductDetails = () => {
  // lấy ra tỉ lệ màn hình hiện tại để xác định số lượng slide hiển thị
  const slidesPerView = window.innerWidth > 1024 ? 4 : window.innerWidth > 600 ? 3 : 3;
  return (
    <div className="h-full">
      <div className="flex justify-center p-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
            Core
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
      <section className="bg-white py-5">
        <div className="container flex gap-4 flex-col ">
          {/* Hình ảnh khác của sản phẩm hiện tại */}

          <div className="flex justify-evenly xl:flex-row flex-col gap-4 xl:gap-0">
            {/* Hình ảnh sản phẩm */}
            <div className="productZoomContainer custom-scrollbar w-[100%] xl:w-[40%]  xl:h-[auto] overflow-x-scroll overflow-y-hidden xl:overflow-x-hidden ">
              <Gallery />
            </div>

            {/* Loại sản phẩm, size addtoCart và description */}
            <div className="p-5  w-[100%] xl:w-[35%] ">
              <h3>Footwear</h3>
              <h1 className="text-[30px] font-[600] text-black">Nike Dunk 2025</h1>
              <p className="text-[20px] font-[600] text-primary">2.000.000đ</p>
              {/* Size component */}
              <Size type={'shoes'} />

              <Button className="!bg-[#f1f1f1] !w-full !text-black !mt-3">Add To Cart</Button>
              <Button className="!bg-black !w-full !text-white !mt-3">Buy Now</Button>

              <p className="mt-4">
                "This pair of shoes combines both comfort and style, making them perfect for everyday wear. The upper is
                crafted from high-quality leather, offering durability and a sleek, polished look. The shoes feature a
                cushioned insole for added comfort, ensuring a smooth stride throughout the day. The outsole is made of
                rubber, providing excellent traction and stability. With a classic design, these shoes are versatile
                enough to pair with both casual and semi-formal outfits. Whether you're heading to the office or out for
                a weekend stroll, these shoes are a perfect choice for any occasion."
              </p>
            </div>
          </div>
          {/* Sản phẩm khác */}
          <section className="container">
            <h2 className="text-[20px] font-[600] mb-4 pl-8  mt-9">Related Product</h2>
            <HomeCartSlider slidesPerView={slidesPerView} />
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
