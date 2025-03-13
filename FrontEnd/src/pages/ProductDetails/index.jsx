import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import ProductZoom from '../../components/ProductZoom';
import '../ProductDetails/style.css';
import { Button } from '@mui/material';
import HomeCartSlider from '../../components/HomeCartSlider';
import Gallery from '../../components/gallery';
import Size from '../../components/Size';
// Call API Get Detail Products
import { getDetailProducts } from '../../apis/productsService';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const productId  = useParams();  
  const [detailProduct, setDetailProduct] = useState([])

  useEffect(() => {
    getDetailProducts(productId).then((response) => {
      setDetailProduct(response)
    })
  },[productId])

  console.log(detailProduct)

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
              <Gallery imageProduct={detailProduct.imageUrl} />
            </div>

            {/* Loại sản phẩm, size addtoCart và description */}
            <div className="p-5  w-[100%] xl:w-[35%] ">
              <h3>Footwear</h3>
              <h1 className="text-[30px] font-[600] text-black">{detailProduct.name}</h1>
              <p className="text-[20px] font-[600] text-primary">${detailProduct.price}</p>
              {/* Size component */}
              <h1 className="text-lg font-[500] mb-1 text-black">Select Size</h1>
              <div className='flex gap-3'>
                  {Array.isArray(detailProduct.variations) && detailProduct.variations.length > 0 ? (
                    detailProduct.variations.map((variation) => (
                      <>
                        <div key={variation._id}>
                          <button
                              className="size-button border min-w-16 border-black text-black bg-white hover:bg-black hover:text-white px-4 py-2 rounded transition duration-300"
                            >
                              {variation.size}
                          </button>
                        </div>
                      </>
                    ))
                  ) : (
                    <p>No size avaiable</p>
                  )}
              </div>

              <Button className="!bg-[#f1f1f1] !w-full !text-black !mt-3">Add To Cart</Button>
              <Button className="!bg-black !w-full !text-white !mt-3">Buy Now</Button>

              <p className="mt-4">
                {detailProduct.description}
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
