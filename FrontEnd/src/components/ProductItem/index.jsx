import React from 'react'
import "../ProductItem/style.css"
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const ProductItem = () => {
  return (
    <div className='productItem rounded-md overflow-hidden'>
        <div className='imgWrapper w-[100%] h-[250px] overflow-hidden rounded-md '>
            <img src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/dab259aa-dbc3-4c18-85e8-38dababbed92/dunk-low-retro-shoes-Xhh8kc.png"  className='w-full h-full object-cover'/>
        </div>

            <div className='info p-3'>
                <h6 className='text-[14px]'><Link to="/" className='link transition-all'>Footwear</Link></h6>
                <h3 className='text-[16px] title mt-2 font-[500]'>
                <Link to="/" className='link transition-all'>Nike Jordan 2025</Link>
                </h3>
                <Rating name="size-small" defaultValue={4} size="small" readOnly />
            </div>
    </div>
  )
}

export default ProductItem;