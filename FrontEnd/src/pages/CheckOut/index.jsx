import React from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';

const CheckOut = () => {
  return (
    <section className='section bg-white p-5 relative'>
        <div className='container flex flex-col xl:flex-row w-full'>
            <div className='leftPart xl:w-[70%]'>
                <div className='flex w-full'>
                    <h2 className='text-[18px] text-black font-[600]'>BILLING DETAILS</h2>
                </div>

                <form className='w-full my-3'>
                    <div className='flex items-center gap-3'>
                        <div className='col w-[50%]'>
                            <TextField className='w-full' label="Full Name" variant='outlined' size="small"></TextField>
                        </div>

                        <div className='col w-[50%]'>
                            <TextField type='email' className='w-full' label="Email" variant='outlined' size="small"></TextField>
                        </div>
                    </div>

                    <h6 className='font-[300] my-3'>Street Address (*)</h6>

                    <div className='flex items-center gap-3'>
                        <div className='col w-[100%]'>
                            <TextField className='w-full' label="House Number and Street Name" variant='outlined' size="small"></TextField>
                        </div>

                    </div>
                </form>
                
            </div>
            
            <div className='rightPartw-[100%] xl:w-[30%] pl-0 xl:pl-5 font-[300]'>
                <div className='flex w-full'>
                    <h2 className='text-[18px] text-black font-[600]'>YOUR ORDER</h2>
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

                <div className='w-full'>
                    <Link to="/checkout">
                    <Button className='!w-full !bg-[#f1f1f1] !text-gray-600 !py-3 !rounded-none !transition-all duration-1000 hover:!bg-black hover:!text-white'>
                            Check Out
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckOut