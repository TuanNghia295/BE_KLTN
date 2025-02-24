import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import ProductZoom from '../../components/ProductZoom';
import '../ProductDetails/style.css'
import { Button } from '@mui/material';

const ProductDetails = () => {
    return (
        <>
            <div className='flex justify-center p-4'>
                <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Home
                </Link>
                <Link
                underline="hover"
                color="inherit"
                to="/productListing"
                >
                Product
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Nike Dunk 2025</Typography>
                </Breadcrumbs>
            </div>
            <section className='bg-white py-5'>
                <div className='container flex gap-4 pl-[10%] pr-[10%] flex-col xl:flex-row'>

                    <div className='productZoomContainer custom-scrollbar w-[100%] xl:w-[40%]  xl:h-[800px] overflow-x-scroll overflow-y-hidden xl:overflow-x-hidden xl:overflow-y-scroll '>
                        <ProductZoom/>
                    </div>
                    <div className='w-[100%] xl:w-[30%] ml-auto '>
                        <h3>Footwear</h3>
                        <h1 className='text-[30px] font-[600] text-black'>Nike Dunk 2025</h1>
                        <p>Size: </p>
                        <p>Color: </p>
                        <Button className='!bg-[#f1f1f1] !w-full !text-black !mt-3'>Add To Cart</Button>
                        <Button className='!bg-black !w-full !text-white !mt-3'>Buy Now</Button>
                        <p className='mt-3'>Desciption : <br/> "This pair of shoes combines both comfort and style, making them perfect for everyday wear. The upper is crafted from high-quality leather, offering durability and a sleek, polished look. The shoes feature a cushioned insole for added comfort, ensuring a smooth stride throughout the day. The outsole is made of rubber, providing excellent traction and stability. With a classic design, these shoes are versatile enough to pair with both casual and semi-formal outfits. Whether you're heading to the office or out for a weekend stroll, these shoes are a perfect choice for any occasion."</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;