import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from "react-icons/md";
import '../CartPanel/style.css'

import { useContext } from 'react';
import { MyContext } from '../../App'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const CartPanel = () => {
     const context = useContext(MyContext)

  return (
        <>
        <div className='flex items-center justify-between py-3 px-4 border-b border-[#f1f1f1]'>
          <h1 className='font-[300] text-[18px]'>Shopping Cart (1)</h1>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={()=>context.setOpenCartPanel(false)}/>
        </div>

        <div>
            <div className='scroll custom-scrollbar w-full max-h-[430px] overflow-y-scroll overflow-x-hidden py-3 px-4'>
                <div className='cartItem w-full flex items-center gap-4 mb-5'>
                  <div className='img w-[30%]'>
                    <img className='w-full' src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png" />
                  </div>
                  <div className='info w-[60%]'>
                      <h4 className='text-black font-[500]'><Link to="/product/2">Nike Dunk 2025</Link></h4>
                      <p className='font-[300]'>
                        <span>Price : 200$</span>
                      </p>
                  </div>
                  <div className='cursor-pointer'>
                    <MdDelete className='text-[30px] text-[#f1f1f1] hover:text-red-300 mr-4'/>
                  </div>
                </div>
                <div className='cartItem w-full flex items-center gap-4 mb-5'>
                  <div className='img w-[30%]'>
                    <img className='w-full' src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png" />
                  </div>
                  <div className='info w-[60%]'>
                      <h4 className='text-black font-[500]'><Link to="/product/2">Nike Dunk 2025</Link></h4>
                      <p className='font-[300]'>
                        <span>Price : 200$</span>
                      </p>
                  </div>
                  <div className='cursor-pointer'>
                    <MdDelete className='text-[30px] text-[#f1f1f1] hover:text-red-300 mr-4'/>
                  </div>
                </div>
                <div className='cartItem w-full flex items-center gap-4 mb-5'>
                  <div className='img w-[30%]'>
                    <img className='w-full' src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png" />
                  </div>
                  <div className='info w-[60%]'>
                      <h4 className='text-black font-[500]'><Link to="/product/2">Nike Dunk 2025</Link></h4>
                      <p className='font-[300]'>
                        <span>Price : 200$</span>
                      </p>
                  </div>
                  <div className='cursor-pointer'>
                    <MdDelete className='text-[30px] text-[#f1f1f1] hover:text-red-300 mr-4'/>
                  </div>
                </div>
                <div className='cartItem w-full flex items-center gap-4 mb-5'>
                  <div className='img w-[30%]'>
                    <img className='w-full' src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png" />
                  </div>
                  <div className='info w-[60%]'>
                      <h4 className='text-black font-[500]'><Link to="/product/2">Nike Dunk 2025</Link></h4>
                      <p className='font-[300]'>
                        <span>Price : 200$</span>
                      </p>
                  </div>
                  <div className='cursor-pointer'>
                    <MdDelete className='text-[30px] text-[#f1f1f1] hover:text-red-300 mr-4'/>
                  </div>
                </div>
            </div>

            <div className='bottomInfo absolute bottom-0 font-[300] py-3 px-3 w-full border-t border-[#f1f1f1] items-center justify-between'>
                <div className='flex'>
                    <span>Sub : </span>
                    <span className='ml-auto'>800$</span>
                </div>

                <div className='flex'>
                    <span>Shipping : </span>
                    <span className='ml-auto'>800$</span>
                </div>

                <div className='flex'>
                    <span>Total : </span>
                    <span className='ml-auto'>800$</span>
                </div>

                <div className='flex flex-col w-full justify-center mt-4'>
                  <Link to="/checkout">
                  <Button className='w-full !bg-black !rounded-none !text-white !py-3' onClick={()=>context.setOpenCartPanel(false)}>Checkout</Button>
                  </Link>
                  <Link to="/cart">
                  <Button className='w-full !text-gray-600 !bg-[#f1f1f1] !rounded-none !mt-2 !py-3 hover:!bg-black hover:!text-white' onClick={()=>context.setOpenCartPanel(false)}>View Cart</Button>
                  </Link>
                </div>
            </div>
        </div>
        </>
  )
}

export default CartPanel