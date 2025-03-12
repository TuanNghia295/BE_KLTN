import { Button } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import AccountSlidebar from '../../components/AccountSlidebar';

const MyAccount = () => {
  return (
    <section className='py-10 w-full'>
        <div className='container flex flex-col xl:flex-row gap-5'>
            <div className='col1 w-full xl:w-[20%]'>
                <AccountSlidebar/>
            </div>

            <div className='col2 w-full xl:w-[80%]'>
                <div className='card bg-white p-5 rounded-md'>
                    <h1 className='text-[22px] font-[600]'>MY PROFILE</h1>
                    <form className='mt-5'>
                        <div className='flex items-center gap-5 my-4'>
                            <div className='w-[50%]'>
                                <TextField className='w-full' label="Full Name" variant="outlined" />
                            </div>
                            <div className='w-[50%]'>
                                <TextField className='w-full' label="Email" variant="outlined" />
                            </div>
                        </div>
                        <div className='flex items-center gap-5 my-4'>
                            <div className='w-[100%]'>
                                    <TextField className='w-full' label="Phone Number" variant="outlined" />
                            </div>
                        </div>
                        <div className='flex items-center gap-5 my-4'>
                            <div className='w-[100%]'>
                                    <Button className='w-full !bg-black !text-white !p-3'>Save</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MyAccount