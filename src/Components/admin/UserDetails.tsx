import React, { useState } from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useParams } from 'react-router-dom';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SuperAdminApis } from '../../apis/superAdminApi';

function UserDetails() {
    const [toggleBtn, setToggleBtn] = useState(1);

    const params: any = useParams();
    let id: string = params?.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>([]);
    const [status, setStatus] = React.useState<any>('');
    const userLoginData = useSelector((state: any) => state.data.login.value);

    React.useEffect(() => {
        SuperAdminApis.getsingleUserData(id).then(
            (response: AxiosResponse) => {
                if (response?.data) {
                    setUserData(response?.data?.data)
                }

                // toast.success(response?.data?.message);
            }
        ).catch(function (error) {
            // handle error
            console.log(error.response.data);
            // toast.error(error.response.data?.message);
        })

    }, []);

    console?.log(userData)


    return (
        <>
            <AdminSidebar  />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6 '>
                    <h1 className='text-[30px] font-semibold'>User Profile</h1>

                    <div className='mt-5'>
                        <div className='flex justify-between border border-[#D9D9D9] rounded-[20px] p-5'>
                            <div>
                                <h3 className='text-[20px] font-semibold'>{userData?.user_data?.name}</h3>
                                <h3 className='text-[16px] text-[#A9A9A9] mt-1'>Business Man</h3>
                                <h3 className='text-[16px] text-[#A9A9A9] mt-1'>Ikeja, Lagos</h3>
                            </div>
                            <div>
                                <div className='flex justify-end'>
                                    <button type="button" className="py-2 px-5 text-sm font-medium text-white focus:outline-none bg-[#149E49] rounded-full ">{userData?.user_data?.sub_status}</button>
                                </div>
                                <div className='flex space-x-3 mt-4'>
                                    <button type="button" className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-[#0071BC] ">Action 1</button>
                                    <button type="button" className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-[#0071BC] ">Action 2</button>
                                    <button type="button" className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-[#0071BC]">Action 3</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='flex justify-between border border-[#D9D9D9] rounded-[20px] p-5'>
                            <div>
                                <h2 className='text-[18px] font-semibold'>Personal Information</h2>
                                <div className='mt-3'>
                                    <h2 className='text-[#A9A9A9] text-[16px]'>Bussines Name</h2>
                                    <h3 className='text-black text-[16px] font-semibold'>{userData?.user_data?.name}</h3>
                                </div>
                                <div className='mt-3'>
                                    <h2 className='text-[#A9A9A9] text-[16px]'>Email Address</h2>
                                    <h3 className='text-black text-[16px] font-semibold'>{userData?.user_data?.email}</h3>
                                </div>
                                <div className='mt-3'>
                                    <h2 className='text-[#A9A9A9] text-[16px]'>Phone Number</h2>
                                    <h3 className='text-black text-[16px] font-semibold'>{userData?.user_data?.phone_number ==null?'Empty':userData?.user_data?.phone_number}</h3>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-[18px] font-semibold'>Account Information</h2>
                                <div className='mt-3'>
                                    <h2 className='text-[#A9A9A9] text-[16px]'>Account Type</h2>
                                    <h3 className='text-black text-[16px] font-semibold'>{userData?.user_data?.business_category ==null?'Empty':userData?.user_data?.business_category}</h3>
                                </div>
                                <div className='mt-3'>
                                    <h2 className='text-[#A9A9A9] text-[16px]'>Country</h2>
                                    <h3 className='text-black text-[16px] font-semibold'>Nigeria</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className=' border border-[#D9D9D9] rounded-[20px] p-5'>

                            <h2 className='text-[18px] font-semibold'>Links Created</h2>
                            <div className='flex space-x-3 mt-4'>


                                <button type="button"
                                    onClick={() => setToggleBtn(1)}
                                    className={` ${toggleBtn === 1 ? "bg-[#0071BC] text-[#ffffff] border border-[#0071BC]" : "text-black"}     font-medium rounded-full text-sm py-2 px-5 mr-2 mb-2 border border-gray-200 cursor-pointer`}
                                >Whatsapp Link</button>

                                <button type="button" onClick={() => setToggleBtn(2)}
                                    className={` ${toggleBtn === 2 ? "bg-[#0071BC] text-[#ffffff] border border-[#0071BC]" : "text-black"}     font-medium rounded-full text-sm py-2 px-5 mr-2 mb-2 border border-gray-200 cursor-pointer`}>Redirect Link</button>

                                <button type="button" onClick={() => setToggleBtn(3)}
                                    className={` ${toggleBtn === 3 ? "bg-[#0071BC] text-[#ffffff] border border-[#0071BC]" : "text-black"}     font-medium rounded-full text-sm py-2 px-5 mr-2 mb-2 border border-gray-200 cursor-pointer`}>MultiLink</button>

                                <button type="button" onClick={() => setToggleBtn(4)}
                                    className={` ${toggleBtn === 4 ? "bg-[#0071BC] text-[#ffffff] border border-[#0071BC]" : "text-black"}     font-medium rounded-full text-sm py-2 px-5 mr-2 mb-2 border border-gray-200 cursor-pointer`}>Market Link</button>
                            </div>

                            <div className={toggleBtn === 1 ? "block " : "hidden"}>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-white bg-[#0071BC]  ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Type
                                                </th>

                                                <th scope="col" className="px-6 py-3">
                                                    Date Created
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                userData?.whatsapp_link?.map(
                                                    (datas: any, index: any) => (
                                                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {datas?.name}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                {datas?.type}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {(datas?.created_at).slice(0, 10)}
                                                            </td>


                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                            <div className={toggleBtn === 2 ? "block " : "hidden"}>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-white bg-[#0071BC]  ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Type
                                                </th>

                                                <th scope="col" className="px-6 py-3">
                                                    Date Created
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                userData?.redirect_link?.map(
                                                    (datas: any, index: any) => (
                                                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {datas?.name}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                {datas?.type}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {(datas?.created_at).slice(0, 10)}
                                                            </td>


                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={toggleBtn === 3 ? "block " : "hidden"}>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-white bg-[#0071BC]  ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Type
                                                </th>

                                                <th scope="col" className="px-6 py-3">
                                                    Date Created
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                userData?.multi_link?.map(
                                                    (datas: any, index: any) => (
                                                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {datas?.name}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                {datas?.type}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {(datas?.created_at).slice(0, 10)}
                                                            </td>


                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={toggleBtn === 4 ? "block " : "hidden"}>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-white bg-[#0071BC]  ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Link Name
                                                </th>


                                                <th scope="col" className="px-6 py-3">
                                                    Date Created
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                userData?.market_link?.map(
                                                    (datas: any, index: any) => (
                                                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {datas?.link_name}
                                                            </td>


                                                            <td className="px-6 py-4">
                                                                {(datas?.created_at).slice(0, 10)}
                                                            </td>


                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails