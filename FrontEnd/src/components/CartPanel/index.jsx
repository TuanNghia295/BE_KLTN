import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import '../CartPanel/style.css'

import { useContext } from 'react';
import { MyContext } from '../../App'

const CartPanel = () => {
     const context = useContext(MyContext)

  return (
        <>
        <div className='flex items-center justify-between py-3 px-4 border-b border-[#f1f1f1]'>
          <h1>Shopping Cart (1)</h1>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={()=>context.setOpenCartPanel(false)}/>
        </div>

        <div>
            <div className='scroll custom-scrollbar w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4'>
                <div className='cartItem w-full flex flex-col items-center gap-4'>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                    <h1>asdasdasdsad</h1>
                </div>
            </div>
        </div>
        </>
  )
}

export default CartPanel