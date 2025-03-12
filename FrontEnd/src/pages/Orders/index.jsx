import React from 'react'
import AccountSlidebar from '../../components/AccountSlidebar';
import { FaAngleDown } from "react-icons/fa";
import '../Orders/style.css'

const Orders = () => {
  return (
    <section className='py-10 w-full'>
        <div className='container flex flex-col xl:flex-row gap-5'>
            <div className='col1 w-full xl:w-[20%]'>
                <AccountSlidebar/>
            </div>

            <div className='col2 w-full xl:w-[80%]'>
                <div className='card bg-white p-5 rounded-md'>
                    <h1 className='text-[22px] text-black font-[600]'>MY ORDERS</h1>
                    <p>Total: 1 orders</p>

                    <table class="border border-gray-300 divide-y divide-gray-200 mt-3">
                        <thead class="bg-gray-100">
                            <tr>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Details</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Order ID</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Payment ID</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Time</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Full Name</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Phone Number</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Address</th>
                            <th class="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                            <td class="px-4 py-2"><FaAngleDown /></td>
                            <td class="px-4 py-2">1</td>
                            <td class="px-4 py-2">payment_asdasdasd</td>
                            <td class="px-4 py-2">12:09 4/3/2025</td>
                            <td class="px-4 py-2">Admin</td>
                            <td class="px-4 py-2">0704539076</td>
                            <td class="px-4 py-2">Yersin, District 1, HCM City</td>
                            <td class="px-4 py-2">Pending</td>
                            </tr>
                        </tbody>
                        
                        </table>

                </div>
            </div>
        </div>
    </section>
  )
}

export default Orders;