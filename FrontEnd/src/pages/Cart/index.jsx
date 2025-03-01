import { Button } from '@mui/material'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <section className='section bg-white p-5'>
        <div className='container flex flex-col xl:flex-row w-full'>
            <div className='leftPart xl:w-[70%]'>
                <div className='flex justify-between mb-5 font-[300]'>
                <h2 className='text-[18px] text-black font-[600]'>YOUR CART</h2>
                <p>There are <span className='font-[600]'>2</span> products in your cart</p>
                </div>

                <div className='cartList'>
                    <div className='cartItem w-full flex items-center gap-4 hover:bg-[#f1f1f1] mb-2'>
                            <div className='img w-[25%] xl:w-[15%]'>
                            <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png"/>
                        </div>
                        <div className='cartItemInfo font-[300] w-[85%] pr-5'>
                            <div className='flex justify-between w-full'>
                                <h4 className='text-[14px]'>Footwear</h4>
                                <MdDeleteForever/>
                            </div>
                            
                            <div className='flex justify-between w-full'>
                                <h2 className='font-[500] text-[18px]'>Nike Dunk 2025</h2>
                                <h2 className='text-[18px]'>200$</h2>
                            </div>

                            <div className='flex text-[14px] gap-10'>
                                <p>Size: 10</p>
                                <p>Quantity: 2</p>
                            </div>
                        </div>
                    </div>

                    <div className='cartItem w-full flex items-center gap-4 hover:bg-[#f1f1f1] mb-2'>
                            <div className='img w-[25%] xl:w-[15%]'>
                            <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/598c8584-652e-4167-a659-86a043523c57/M+VAPOR+LITE+3+HC+C.png"/>
                        </div>
                        <div className='cartItemInfo font-[300] w-[85%] pr-5'>
                            <div className='flex justify-between w-full'>
                                <h4 className='text-[14px]'>Footwear</h4>
                                <MdDeleteForever/>
                            </div>
                            
                            <div className='flex justify-between w-full'>
                                <h2 className='font-[500] text-[18px]'>Nike Dunk 2025</h2>
                                <h2 className='text-[18px]'>200$</h2>
                            </div>

                            <div className='flex text-[14px] gap-10'>
                                <p>Size: 10</p>
                                <p>Quantity: 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='rightPart w-[100%] xl:w-[30%] p-10 font-[300]'>
                <p className='flex'>Subtotal <span className='ml-auto'>200$</span></p>
                <p className='flex'>Shipping <span className='ml-auto'>Free</span></p>
                <p className='border-t border-b border-[#f1f1f1] py-3 my-5 flex'>Total <span className='ml-auto'>200$</span></p>
                <Link to="/checkout">
                <Button className='!w-full !bg-[#f1f1f1] !text-gray-600 !py-3 !rounded-none !transition-all duration-1000 hover:!bg-black hover:!text-white'>
                        Check Out
                </Button>
                </Link>
            </div>
        </div>
    </section>
  )
}


export default Cart