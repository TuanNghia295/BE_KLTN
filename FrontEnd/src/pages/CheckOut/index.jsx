import React from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';

const CheckOut = () => {
  return (
    <section className='section bg-white p-5'>
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
            
            <div className='rightPart w-[100%] xl:w-[30%] pl-0 xl:pl-5 font-[300]'>
                <div className='flex w-full'>
                    <h2 className='text-[18px] text-black font-[600]'>YOUR ORDER</h2>
                </div>

                <div className='w-full my-3'>
                    <p className='border-t border-b border-[#f1f1f1] py-2  flex'>Product <span className='ml-auto'>Subtotal</span></p>
                </div>

                <div>
                    <div className='itemCheckout flex items-center mb-3'>
                        <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                            <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://cdn.discordapp.com/attachments/1327924387420311573/1332606328492785796/SBTown.png?ex=67c4025b&is=67c2b0db&hm=0acf600e7b2d32d7a74d33f55fc2973b78433a51f0f7e9178c32237767e2a5db&" />
                            <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                        </div>

                        <div className='info ml-3'>
                            <h4 className='font-[500] text-black'>Nike Dunk 2025</h4>
                            <p>Size: 10</p>
                        </div>

                        <div className='ml-auto'>
                            200$
                        </div>
                    </div>

                    <div className='itemCheckout flex items-center mb-3'>
                        <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                            <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://cdn.discordapp.com/attachments/1327924387420311573/1332606328492785796/SBTown.png?ex=67c4025b&is=67c2b0db&hm=0acf600e7b2d32d7a74d33f55fc2973b78433a51f0f7e9178c32237767e2a5db&" />
                            <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                        </div>

                        <div className='info ml-3'>
                            <h4 className='font-[500] text-black'>Nike Dunk 2025</h4>
                            <p>Size: 10</p>
                        </div>

                        <div className='ml-auto'>
                            200$
                        </div>
                    </div>

                    <div className='itemCheckout flex items-center mb-3'>
                        <div className='border border-[#f1f1f1] rounded-xl w-[60px] h-[60px] relative'>
                            <img className='rounded-xl object-center w-[60px] h-[60px]' src="https://cdn.discordapp.com/attachments/1327924387420311573/1332606328492785796/SBTown.png?ex=67c4025b&is=67c2b0db&hm=0acf600e7b2d32d7a74d33f55fc2973b78433a51f0f7e9178c32237767e2a5db&" />
                            <p className='absolute -top-2 -right-2 rounded-full text-white bg-[#5e5e5e] text-center min-w-6 min-h-6'>1</p>
                        </div>

                        <div className='info ml-3'>
                            <h4 className='font-[500] text-black'>Nike Dunk 2025</h4>
                            <p>Size: 10</p>
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