import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useStoreProvider } from '../../contexts/StoreProvider'
import Avatar from '@mui/material/Avatar';
const AccountSlidebar = () => {
    const { userInfo } = useStoreProvider()

  return (
    <div className='card bg-white shadow-md rounded-md p-5'>
        <div className='w-full p-3 flex items-center justify-center flex-col border-b border-[#f1f1f1] mb-2'>

            <div className='w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative'>
                <Avatar sx={{ width: 100, height: 100 }} alt={userInfo ? (userInfo.fullName) : ("Default")} src="https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg" />
                <div className='overlay w-full h-full absolute top-0 left-0 z-50 bg-[#000000ab] flex items-center justify-center'>
                    <FaCloudUploadAlt className='text-[#fff]'/>
                    <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'></input>
                </div>
            </div>

            <h3 className='text-black text-[20px] font-[600]'>{userInfo ? (userInfo.fullName) : ("Guest")}</h3>
            <p className='text-[13px]'>{userInfo ? (userInfo.phone) : ("")}</p>

        </div>

        <ul className='list-none myAccountTabs flex flex-col gap-1'> 
            <li className='w-full'>
                <NavLink to='/my-account' exact={true} activeClassname="isActive">
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My Profile</Button>
                </NavLink>
            </li>

            <li className='w-full'>
                <NavLink to='/my-address' exact={true} activeClassname="isActive">
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My Address</Button>
                </NavLink>
            </li>

            <li className='w-full'>
                <NavLink to='/my-list' exact={true} activeClassname="isActive">
                <Button className='w-full !text-black !bg-[#f1f1f1] !my-1 !rounded-none flex gap-2 items-center'>My List</Button>
                </NavLink>
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