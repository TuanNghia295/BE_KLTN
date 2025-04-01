import React from 'react'
import AccountSlidebar from '../../components/AccountSlidebar';
import { FaAngleDown } from "react-icons/fa";
import '../Orders/style.css'
import TabListOrders from './TabListOrders';

const Orders = () => {
  return (
    <section className='py-10 w-full'>
        <div className='container flex flex-col xl:flex-row gap-5'>
            <div className='col1 w-full xl:w-[20%]'>
                <AccountSlidebar/>
            </div>

            <div className='col2 w-full xl:w-[80%]'>
                <div className='card bg-white p-5 rounded-md'>
                    <TabListOrders/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Orders;