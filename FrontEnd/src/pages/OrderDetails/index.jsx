import React from 'react'
import { CiViewList } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiMoneyWavyLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import OrderStatus from './OrderStatusComponent';
import HomeCartSlider from '../../components/HomeCartSlider';


const OrderDetails = () => {
    const slidesPerView = window.innerWidth > 1024 ? 4 : window.innerWidth > 600 ? 4 : 3;
    return (
        <section className='container !py-10'>
            <section className='statusOrder flex bg-red-500 p-4 items-center rounded-t-lg text-white gap-10'>
                <div className='part1 text-[60px]'>
                    <CiViewList />
                </div>
                <div className='part2 text-[16px]'>
                    <p className='font-[600]'>Chờ xác nhận</p>
                    <p>Description</p>
                </div>
            </section>
            <section className='statusOrder flex bg-[#fff] p-4 items-center rounded-b-lg text-black gap-10'>
                <div className='part1 text-[60px]'>
                    <FaMapLocationDot />
                </div>
                <div className='part2 text-[16px]'>
                    <p className='font-[600]'>Địa chỉ nhận hàng</p>
                    <p>Full Name: Admin User</p>
                    <p>Phone: 0904768764</p>
                    <p>Address: 14 Nguyen Van Bao, P.4, GoVap</p>
                </div>
            </section>

            <section className='paymentMethod bg-white my-10 rounded-lg p-4'>
                <span className='text-[20px] font-[600] text-black flex items-center gap-4'><PiMoneyWavyLight className='text-[30px]' />Payment Method</span>
                <div className='pt-5'>
                    <p className='text-[17px]'>Thanh toán khi nhận hàng</p>
                </div>
            </section>

            <section className='bg-white p-4 rounded-lg'>
                <OrderStatus status='paid' />
                <div className="flex flex-col xl:flex-row">
                    <div className='rightPart w-[100%] xl:w-[30%] pl-0 xl:pl-5 font-[300]'>
                        <div className='flex w-full'>
                            <h2 className='text-[18px] text-black font-[600]'>ORDER ID: ádasdasd</h2>
                        </div>

                        <div className='w-full my-3'>
                            <p className='border-t border-b border-[#f1f1f1] py-2  flex'>Product <span className='ml-auto'>Subtotal</span></p>
                        </div>

                        <div>
                            <div className='itemCheckout flex items-center mb-3'>
                                <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                                    <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8814b1e2-5786-4fea-9aa5-b5a25e5fdb38/WMNS+AIR+FORCE+1+%2707+LX.png" />
                                    <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                                </div>

                                <div className='info ml-3'>
                                    <h4 className='font-[500] text-black'>Nike Air Force 1 '07 LX</h4>
                                    <p>Size: EU 36</p>
                                </div>

                                <div className='ml-auto'>
                                    200$
                                </div>
                            </div>

                            <div className='itemCheckout flex items-center mb-3'>
                                <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                                    <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a42a5d53-2f99-4e78-a081-9d07a2d0774a/AIR+FORCE+1+%2707.png" />
                                    <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                                </div>

                                <div className='info ml-3'>
                                    <h4 className='font-[500] text-black'>Nike Air Force 1 '07</h4>
                                    <p>Size: EUR 42</p>
                                </div>

                                <div className='ml-auto'>
                                    200$
                                </div>
                            </div>

                            <div className='itemCheckout flex items-center mb-3'>
                                <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                                    <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc540e66-3b4e-4e64-a537-cf089a7ca84e/AIR+FORCE+1+%2707.png" />
                                    <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                                </div>

                                <div className='info ml-3'>
                                    <h4 className='font-[500] text-black'>Nike Air Force 1 '07 LX</h4>
                                    <p>Size: EU 42</p>
                                </div>

                                <div className='ml-auto'>
                                    200$
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='leftPart w-[100%] xl:w-[70%] pl-0 xl:pl-10'>
                        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Ngày</th>
                                    <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white even:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">1/42/2025</td>
                                    <td className="border border-gray-300 px-4 py-2">Viết gì đó...</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex justify-end gap-3 py-4'>
                            <Link to="/my-orders">
                            <button className='bg-black text-white p-3'>Return My Order</button>
                            </Link>
                            <button className='bg-red-500 text-white p-3'>Cancel Order</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sản phẩm khác */}
            <section>
                <h2 className="text-[20px] font-[600] mb-4 pl-8  mt-9">Related Product</h2>
                <HomeCartSlider slidesPerView={slidesPerView} />
            </section>
        </section>
    )
}

export default OrderDetails