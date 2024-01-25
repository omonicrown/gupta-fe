import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuperAdminApis } from '../../apis/superAdminApi';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { SvgElement, icontypesEnum } from '../assets/svgElement';
import { AdminApis } from '../../apis/adminApi';
import { SuperAdminLiveApi } from '../../apis/live/superAdminLiveApi';

function WitdrawalRequest() {

    const navigate = useNavigate();
    const [userLists, setUserList] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');

    let [visible, setVisible] = React.useState<boolean>(false);
    let [witdrawalData, setWitdrawalData] = React.useState<any>([]);

    function proceed(data: any) {
        setWitdrawalData(data)
        setVisible(true)
    }

    console?.log(witdrawalData)


    const witdrawFund = React.useCallback(
        () => {
            const formData = new FormData()
            formData.append('account_bank', witdrawalData?.account_bank)
            formData.append('account_number', witdrawalData?.account_number)
            formData.append('amount', witdrawalData?.amount)
            formData.append('beneficiary_country', witdrawalData?.beneficiary_country)
            formData.append('email', witdrawalData?.email)
            formData.append('first_name', witdrawalData?.first_name)
            formData.append('id', witdrawalData?.id)
            formData.append('last_name', witdrawalData?.last_name)
            formData.append('merchant_name', witdrawalData?.merchant_name)
            formData.append('mobile_number', witdrawalData?.mobile_number)
            formData.append('narration', witdrawalData?.narration)
            formData.append('reference', witdrawalData?.reference)
            formData.append('status', witdrawalData?.status)

        

            SuperAdminApis.payOutCustomers(formData).then(
                (response: any) => {
                    if (response?.data) {
                        console?.log(response?.data?.data)
                        toast.success(response?.data?.message);
                        setVisible(false)
                    } else {
                        setVisible(false)
                        toast.error(response?.response?.data?.message);

                    }

                    // toast.success(response?.data?.message);
                }
            ).catch(function (error: any) {
                // handle error
                // console.log(error.response);
                setVisible(false)
                toast.error(error.response.data.message);
            })
        },
        [witdrawalData]
    );



    React.useEffect(() => {
        const query: any = {
            search: searchText,
        };
        SuperAdminApis.getAllWitdrawals('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setUserList(response?.data?.data)
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

            SuperAdminApis.getAllWitdrawals(value2, query).then(
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
                                        S/N
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bank name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Account Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Refrence
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
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
                                                    {datas?.account_bank}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.account_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.amount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.reference}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {datas?.status}
                                                </td>

                                                <td className="px-6 py-4 flex space-x-3 mt-1">
                                                    <div onClick={() => proceed(datas)}>
                                                        <a href="#" className="font-medium text-blue-600 hover:underline">Prodeed</a>
                                                    </div>

                                                    {/* <a href="#" className="font-medium text-blue-600 hover:underline">Delete</a> */}
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




            <section>
                <Modal
                    visible={visible}
                    width="400"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => setVisible(false)}
                >
                    <div className=" " style={{ height: '100%', overflow: 'auto' }}>
                        <span className="flex justify-end pr-2 pt-2">
                            <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
                        </span>
                        <div className=" bg-[#fff]  items-center rounded-lg p-1 px-4">

                            <div className="">

                                <span className="flex justify-around">
                                    {/* <h1 className=" text-xs text-red-600" style={{ fontSize: '10px' }}>Link can’t be edited in free plan. <span style={{ color: '#61A24F' }} className="font-bold text-xs">Upgrade to Pro</span></h1> */}

                                </span>

                                <label
                                    className="flex justify-start  mb-2 pt-2 text-md font-bold text-black"
                                >
                                    Are you sure you want to proceed with the Transfer?
                                </label>






                                <span className="flex justify-center pt-8">
                                    <button
                                        type="button"
                                        onClick={()=>witdrawFund()}
                                        style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                                        className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                                    >
                                        Proceed to witdrawal
                                    </button>
                                </span>
                            </div>

                        </div>

                    </div>
                </Modal>
            </section>
        </>
    )
}

export default WitdrawalRequest