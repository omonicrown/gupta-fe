import React from 'react'
import configs from '../../../configs';
import Categories from '../Categories';
import { FaWhatsapp, FaEye } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { PaymentApis } from '../../../apis/paymentApis';
import { ToastContainer, toast } from 'react-toastify';


//@ts-ignore
import { PhoneInput } from "react-contact-number-input";

import { Oval } from 'react-loader-spinner'
import { SvgElement, icontypesEnum } from '../../assets/svgElement';
import Modal from 'react-responsive-modal';

interface FullName { data: [], loading: any, title: any }

function MostViewed(props: FullName) {

    // var currencyFormatter = require('currency-formatter');
    const [products, setProducts] = React.useState<any>(props?.data);
    const [loader, setLoader] = React.useState<boolean>(true);

    let [visible, setVisible] = React.useState(false);
    let [value, setvalue] = React.useState<any>('');
    let [fullName, setFullName] = React.useState('');
    let [email, setEmail] = React.useState('');
    let [phoneNumber, setPhoneNumber] = React.useState<any>('');
    let [productQty, setProductQty] = React.useState<any>('');

    let [marketInfo, setMarketInfo] = React.useState('');

    const params = useParams();

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()

    function togglePaymentModal(value2: any) {
        setvalue(value2)
        setVisible(true)
    }

    if (searchParams.get('status') == 'cancelled') {
        navigate(`/store/${params?.storeId}`);
    }


    if (searchParams.get('tx_ref')) {
        PaymentApis.getProdutCallback(searchParams.get('tx_ref')).then(
            (response: any) => {
                if (response?.data) {
                    // navigate('/wallet');
                    if (response?.data?.success === true) {
                        if (response?.data?.data?.status == 'successful') {
                            navigate(`/store/${params?.storeId}`);
                            toast.success(response?.data?.data?.status);
                        } else {
                            // navigate('/mylinks');
                            toast.error(response?.data?.data?.status);
                            console?.log(response?.data)
                        }

                    }
                } else {
                    // toast.warn('Invalid Login Credentials');
                }
            }
        ).catch(function (error) {
            // handle error
            console.log(error.response.data);
        }).finally(() => {
            // toast.error("No Internet Connection");

        });
    }



    const handlePayment = React.useCallback(
        (e: any) => {
            console?.log('hello')
            e.preventDefault();
            console?.log('hello2')
            let data = {
                'user_id': value?.user_id,
                'amount': ((value?.no_of_items) * productQty),
                'customer_full_name': fullName,
                'product_qty': productQty,
                'pay_for': value?.product_name,
                'store_id': params?.storeId,
                'customer_email': email,
                'customer_phone_number': phoneNumber?.countryCode + phoneNumber?.phoneNumber
            }
            PaymentApis.payForProduct(data).then(
                (response: any) => {
                    if (response?.data?.success) {
                        console.log(response?.data)
                        window.location.replace(response?.data?.data?.data?.link);
                        setVisible(false)
                        // toast.success(response?.data?.message);
                    }
                }
            ).catch(function (error) {
                // handle error
                console.log(error.response.data);
                toast.error("Offfline");
            }).finally(() => {
                //toast.error("No Internet Connection");

            });
        },
        [value, fullName, email, phoneNumber, params, productQty]
    );




    React.useEffect(() => {
        setLoader(props?.loading)
        setProducts(props?.data)
    }, [props?.data, loader]);

    console?.log(products.data?.data)


    return (
        <>
            <div className='pt-5'>
                {props?.title == '' ?
                    <h3 className='text-[#2196F3] font-medium'> Most Viewed Item</h3>
                    :
                    <h3 className='text-[#2196F3] font-medium'> Search results for  <span className=' text-gray-400'>{props?.title} </span></h3>
                }

                <hr className="h-px my-2 bg-gray-200 border-0 w-full" />
            </div>
            <div className=' mx-auto md:grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 md:gap-4  lg:space-y-0 py-8'>

                {!loader ? (
                    products.data?.data?.length >= 1 ?
                        products?.data?.data?.map(
                            (data: any, index: number) => (
                                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">

                                    <NavLink to={`/storedetails/${(data?.id)}`} className={'cursor-pointer'}>
                                        <p className="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] h-44" style={{ fontSize: '16px', color: '#595959', backgroundImage: `url(${data?.product_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}>{data?.link_info?.message}</p>
                                    </NavLink>
                                    <hr />

                                    <div className="flex flex-col pt-[16px] px-[16px]">
                                        <div className="flex justify-start">
                                            <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span>
                                        </div>
                                        <div className="flex justify-start mt-2">
                                            {/* <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span> */}
                                            <span className="flex gap-2">
                                                <span style={{ color: '#0071BC', textDecorationLine: 'line-through' }} className={`text-[15px] font-[700]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.product_price)} </span>
                                                <span style={{ color: '#0071BC' }} className={`text-[15px] font-[400]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)} </span>

                                            </span>
                                            {/* <span className="text-[#149E49] text-[14px] font-[600]"> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)}</span> */}

                                        </div>



                                        <span className="text-[14px] font-[400] mt-3 text-[#808191] h-10 overflow-auto">{data?.product_description}</span>

                                        <div className="flex justify-between py-3">

                                            <NavLink to={`/storedetails/${data?.id}`}
                                                style={{ backgroundColor: '#0071BC' }}
                                                className={"text-[10px] text-white py-1  flex cursor-pointer rounded-full px-2"}
                                            >
                                                <FaEye className="mt-[2px] mr-1" />  View Product
                                            </NavLink>

                                            <a target='_blank' href={`https://gupta-tkwuj.ondigitalocean.app/${data?.phone_number}`}
                                                style={{ backgroundColor: '#0071BC' }}
                                                className={"text-[10px] text-white pt-1 pb-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"}
                                            >
                                                <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
                                            </a>

                                            <span onClick={() => togglePaymentModal(data)}
                                                style={{ backgroundColor: '#0071BC' }}
                                                className={"text-[10px] text-white pt-1 pb-1 flex cursor-pointer bg-[#0071BC] rounded-full px-3"}
                                            >
                                                Pay with gupta
                                            </span>
                                        </div>

                                    </div>


                                    {/* <span className="flex justify-between gap-1 pt-4 m-2">
                                         
          
                                         
                                        </span> */}
                                </div>
                            )
                        )
                        :

                        <div className="md:p-6 min-w-[70vw]">
                            <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">

                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className=" bg-gray-400 rounded-full text-center text-white mb-2.5"> No Product Availabe</div>

                            <div className="flex items-center mt-4 space-x-3">

                            </div>

                        </div>

                )
                    :
                    <div className="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '70vh', width: '92vw' }}>
                        <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-400">

                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        <div className="flex items-center mt-4 space-x-3">

                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                }


            </div>


            <section>
                <Modal
                    open={visible}
                
                    onClose={() => setVisible(false)}
                >
                    <div className=" " style={{ height: '100%', overflow: 'auto' }}>
                        <span className="flex justify-end pr-2 pt-2">
                            <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
                        </span>
                        <div className=" bg-[#fff]  items-center rounded-lg p-1 px-4">

                            <div className="">


                                <label
                                    className="flex justify-start  mb-2 pt-1 text-md font-bold text-black"
                                >
                                    You are about to pay for <br />{value?.product_name}
                                </label>
                             

                                <form onSubmit={handlePayment} className="pb-4 rounded-lg">

                                    <label className="block mb-2 mt-3 text-sm  text-gray-900 dark:text-gray-600">Full Name</label>
                                    <input required type="text" name="full_name" onChange={(e) => setFullName(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Full Name" />

                                    <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Email</label>
                                    <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Email" />


                                    <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Quantity</label>
                                    <input required type="number" name="productQty" onChange={(e) => setProductQty(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Paying for how many?" />

                                    <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Phone Number</label>
                                    <PhoneInput
                                        style={{ backgroundColor: '#F4FBFF' }}
                                        disabled={false}
                                        name="phone"
                                        required
                                        // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                                        countryCode={'ng'}
                                        onChange={setPhoneNumber}
                                        placeholder={'Enter Mobile Number'}
                                    />

                                    <span className=" text-red-500 text-[10px]">{phoneNumber?.message}</span>

                                    {/* <input required type="text"  id="customer_full_name" onChange={(e)=>setPhoneNumber(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your phone number" /> */}



                                    <span className="flex justify-center pt-4">
                                        <button
                                            type="submit"
                                            style={{ backgroundColor: `${'#0071BC'}`, borderRadius: '50px' }}
                                            className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                                        >
                                            Proceed to payment
                                        </button>
                                    </span>

                                    <span className="flex justify-center pt-4">
                                        <button
                                            type="button"
                                            onClick={(e) => setVisible(false)}
                                            style={{ borderRadius: '50px' }}
                                            className=" text-black bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                                        >
                                            Cancel
                                        </button>
                                    </span>

                                </form>



                            </div>

                        </div>

                    </div>
                </Modal>
            </section>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    );
}

export default MostViewed;