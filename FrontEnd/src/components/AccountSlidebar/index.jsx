import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const AccountSlidebar = () => {
  return (
    <div className='card bg-white shadow-md rounded-md p-5'>
        <div className='w-full p-3 flex items-center justify-center flex-col border-b border-[#f1f1f1] mb-2'>

            <div className='w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative'>
                <img src="https://cdn.discordapp.com/attachments/1327924387420311573/1332593402486980648/SBTown.png?ex=67c5f091&is=67c49f11&hm=e257bd507c4c022bc49009b0acb50d3c2095586bafb6fb7f3f5684c41fafaa16&" />
                <div className='overlay w-full h-full absolute top-0 left-0 z-50 bg-[#000000ab] flex items-center justify-center'>
                    <FaCloudUploadAlt className='text-[#fff]'/>
                    <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'></input>
                </div>
            </div>

            <h3 className='text-black text-[20px] font-[600]'>Vuu Tri Tan</h3>
            <p className='text-[13px]'>vuutritan2k2@gmail.com</p>

        </div>

        <ul className='list-none myAccountTabs'> 
            <li className='w-full'>
                <NavLink to='/my-account' exact={true} activeClassname="isActive">
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My Profile</Button>
                </NavLink>
            </li>

            <li className='w-full'>
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My List</Button>
            </li>

            <li className='w-full'>
                <NavLink to='/my-orders' exact={true} activeClassname="isActive">
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My Orders</Button>
                </NavLink>
            </li>

            <li className='w-full'>
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>Logout</Button>
            </li>
        </ul>
    </div>
  )
}

export default AccountSlidebar;