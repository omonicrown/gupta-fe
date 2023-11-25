import React from 'react'

import AdminSidebar from "../Sidebar/AdminSidebar";

function Dashboard() {
  return (
    <div>
      <AdminSidebar />
      <div className="relative md:ml-64 bg-white">
        <div className='py-10 lg:py-20 lg:px-10 px-6 '>
          <div className="space-y-2 lg:grid lg:grid-cols-3 sm:gap-5  lg:space-y-0  ">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500  text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3 className='text-[22px] font-normal'>Total Users</h3>
            <h5 className='text-[30px] font-bold'>2055</h5>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-blue-600 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3 className='text-[22px] font-normal'>Total Clicks</h3>
            <h5 className='text-[30px] font-bold'>3055</h5>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3>Total Whatsapp Link</h3>
            <h5 className='text-[30px] font-bold'>1055</h5>
          </div>
          <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3>Total Redirect Link</h3>
            <h5 className='text-[30px] font-bold'>205</h5>
          </div>
          <div className="bg-gradient-to-r from-teal-200 to-lime-200 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3>Total Multi Link</h3>
            <h5 className='text-[30px] font-bold'>255</h5>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
            <h3>Total Market Link</h3>
            <h5 className='text-[30px] font-bold'>200</h5>
          </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard