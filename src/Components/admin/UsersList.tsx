import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import {NavLink, Link } from 'react-router-dom';

function UsersList() {
    return (
        <>
            <AdminSidebar />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6 '>
                    <h1 className='text-[30px] font-semibold'>Users</h1>
                    <div className='flex justify-between mt-5'>
                        <div>
                            <Link to="/add-course">
                            <button type='button' className="font-normal text-white bg-[#0071BC] px-5 py-2 rounded-md">+ Add New</button>
                        </Link>
                        </div>
                        <div className='flex justify-end'>
                            <div className=" lg:ml-auto mr-3 flex justify-end">
                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" /></svg>
                                    </div>
                                    <input type="text" placeholder='search...' id="simple-search" className=" border border-gray-300 text-gray-500 text-sm rounded-md block w-full pl-4 p-1  " required />
                                </div>

                                {/* <div className='mt-0.5 ml-2'><button type='button' className={"font-normal text-white bg-[#0071BC] px-3 py-0.5 rounded-md"}>Search</button> </div> */}

                                <div className='ml-4 mt-1 cursor-pointer' onClick={() => { }}>
                                    {/* <CSVLink data={csvData} filename={"usersList.csv"} target="_blank">

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 7H6V3H18V7ZM18 12.5C18.2833 12.5 18.5207 12.404 18.712 12.212C18.904 12.0207 19 11.7833 19 11.5C19 11.2167 18.904 10.979 18.712 10.787C18.5207 10.5957 18.2833 10.5 18 10.5C17.7167 10.5 17.4793 10.5957 17.288 10.787C17.096 10.979 17 11.2167 17 11.5C17 11.7833 17.096 12.0207 17.288 12.212C17.4793 12.404 17.7167 12.5 18 12.5ZM16 19V15H8V19H16ZM18 21H6V17H2V11C2 10.15 2.29167 9.43767 2.875 8.863C3.45833 8.28767 4.16667 8 5 8H19C19.85 8 20.5627 8.28767 21.138 8.863C21.7127 9.43767 22 10.15 22 11V17H18V21Z" fill="#9DA4AA" />
                                        </svg>

                                    </CSVLink> */}

                                </div>

                            </div>

                            {/* <div className='mt-1'>Filter </div> */}
                        </div>
                    </div>




                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Date Joined
                </th>
                <th scope="col" className="px-6 py-3">
                    Links Created
                </th>
                <th scope="col" className="px-6 py-3">
                    Something
                </th>
                <th scope="col" className="px-6 py-3">
                    Subscription
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b  hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Samodex Store
                </th>
                <td className="px-6 py-4">
                   12-11-2023
                </td>
                <td className="px-6 py-4">
                    4
                </td>
                <td className="px-6 py-4">
                    Something
                </td>
                <td className="px-6 py-4">
                <button type="button" className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ">Free Trial</button>
                </td>

                <td className="px-6 py-4 flex space-x-3 mt-1">
                    <NavLink to="/user-details">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                    </NavLink>
                    
                    <a href="#" className="font-medium text-blue-600 hover:underline">Delete</a>
                </td>
            </tr>
            
            
        </tbody>
    </table>
</div>




                </div>
                
            </div>
        </>
    )
}

export default UsersList