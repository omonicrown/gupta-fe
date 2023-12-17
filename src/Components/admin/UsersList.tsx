import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuperAdminApis } from '../../apis/superAdminApi';

function UsersList() {

    const navigate = useNavigate();
    const [userLists, setUserList] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');


    React.useEffect(() => {
        const query: any = {
            search: searchText,
        };
        SuperAdminApis.getAllUsers('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setUserList(response?.data?.data)
                    console?.log(response?.data?.data?.data)
                }
            }
        ).catch(function (error) {
            // handle error

        })
    }, []);



    const paginator = React.useCallback(
        (value: any) => {
            //   setLoader(true);
            let value2 = '';
            if (value !== null) {
                value2 = value;
            } else {
                value2 = ''
            }
            const query: any = {
                search: searchText,
            };

            SuperAdminApis.getAllUsers(value2, query).then(
                (response: AxiosResponse<any>) => {
                    if (response?.data) {
                        setUserList(response?.data?.data)
                    }
                }
            ).catch(function (error) {
                console.log(error.response.data);
            })

        }, [userLists, searchText]);




    return (
        <>
            <AdminSidebar />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6 '>
                    <h1 className='text-[30px] font-semibold'>Users</h1>
                    <div className='flex justify-end'>
                            <div className=" lg:ml-auto mr-3 flex justify-end">
                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" /></svg>
                                    </div>
                                    <input type="text" onClick={() => paginator('')} onChange={e => setSearchText(e.target.value)} placeholder='search...' id="simple-search" className=" border border-gray-300 text-gray-500 text-sm rounded-md block w-full pl-4 p-1  " required />
                                </div>

                                <div className='mt-0.5 ml-2'><button type='button' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => paginator('')} className={"font-normal text-white bg-[#0071BC] px-3 py-0.5 rounded-md"}>Search</button> </div>

                               

                            </div>

                            {/* <div className='mt-1'>Filter </div> */}
                        </div>




                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub Start
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub End
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub Status
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    userLists?.data?.filter((data: any) => data?.role !== 'admin')?.map(
                                        (datas: any, index: any) => (
                                            <tr className="bg-white  ">

                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {datas?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.phone_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.sub_start}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.sub_end}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.sub_status}
                                                </td>

                                                <td className="px-6 py-4 flex space-x-3 mt-1">
                                                    <NavLink to={`/user-details/${datas?.id}`}>
                                                        <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                                    </NavLink>

                                                    <a href="#" className="font-medium text-blue-600 hover:underline">Delete</a>
                                                </td>


                                            </tr>
                                        )
                                    )
                                }

                            </tbody>

                        </table>
                    </div>
                    <div className='m-4'>
                        {
                            userLists?.links?.filter(((item: any, idx: any) => idx < 1000)).map(
                                (datas: any, index: any) => (
                                    <button onClick={() => paginator(datas?.label == 'Next &raquo;' ? datas?.url.charAt(datas?.url.length - 1) : (datas?.label === '&laquo; Previous') ? datas?.url.charAt(datas?.url.length - 1) : datas?.label)} disabled={datas?.active} className={'mx-1 py-1 px-2 ' + (datas?.active == false ? 'bg-gray-300 text-black ' : 'bg-[#0071BC] text-white')}>
                                        {datas?.label == '&laquo; Previous' ? '< Previous' : (datas?.label === 'Next &raquo;') ? 'Next  >' : datas?.label}
                                    </button>
                                )
                            )
                        }

                    </div>




                </div>

            </div>
        </>
    )
}

export default UsersList