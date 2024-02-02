
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import { AuthApis } from "../../apis/authApis";


// components



export default function CardSubscription() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const [subValue, setSubValue] = React.useState(1);

  if (searchParams.get('tx_ref')) {
    AdminApis.getCallback(searchParams.get('tx_ref')).then(
      (response) => {
        if (response?.data) {
          // navigate('/wallet');
          if (response?.data?.success === true) {
            navigate('/mylinks');
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



  const handleSubmit = (e, amount) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('amount', amount)

    AdminApis.makePayment(formData).then(
      (response) => {
        console?.log(response)
        if (response?.data) {
          console?.log(response?.data)
          if (response?.data?.success === true) {
            window.location.replace(response?.data?.data?.data?.link);
          }
        } else {
          // toast.warn('Invalid Login Credentials');
        }
      }
    ).catch(function (error) {
      // handle error
    }).finally(() => {
      // toast.error("No Internet Connection");

    });
  }

  return (
    <>

      <div className='bg-[#F5F5FA] sm:px-8 px-6 flex justify-center items-start py-16' >
        <div className='xl:max-w-[1200px] w-full'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center font-bold font-poppins md:text-[40px] text-[25px] text-[#231D4F] md:leading-[50px] leading-[38px]">
              Simple, transparent pricing
            </h1>
            <p className="text-[#848199] text-[20px] mt-5">Save up to 5% when you pay annually</p>
            <div className="flex justify-center">
              <button onClick={() => setSubValue(1)} className={`w-auto py-[5px] px-[10px] bg-[${subValue == 1 ? '#0071BC' : '#EDF2FE'}] text-[${subValue == 1 ? '#EDF2FE' : '#0071BC'}] text-[15px] border`}>Monthly</button>
              <button onClick={() => setSubValue(3)} className={`w-auto py-[5px] px-[10px] bg-[${subValue == 3 ? '#0071BC' : '#EDF2FE'}] text-[${subValue == 3 ? '#EDF2FE' : '#0071BC'}] text-[15px] border`}>3 Months</button>
              <button onClick={() => setSubValue(6)} className={`w-auto py-[5px] px-[10px] bg-[${subValue == 6 ? '#0071BC' : '#EDF2FE'}] text-[${subValue == 6 ? '#EDF2FE' : '#0071BC'}] text-[15px] border`}>6 Months</button>
              <button onClick={() => setSubValue(12)} className={`w-auto py-[5px] px-[10px] bg-[${subValue == 12 ? '#0071BC' : '#EDF2FE'}] text-[${subValue == 12 ? '#EDF2FE' : '#0071BC'}] text-[15px] border`}>12 Months</button>

            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mt-10">



            {/* <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mt-10"> */}

            <div>
              <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
                <h3 className="text-center text-[#56575B] uppercase text-[14px]">FREE</h3>
                <h1 className="text-center mt-5 text-[34px] text-[#56575B]">₦ 0<sup className="text-[16px]">(First three weeks)</sup> </h1>
                <div className="flex-col justify-center mt-5">
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">Free for 3 weeks</h3>
    <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
    <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">

                    <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>

                  </div>
                  <div className="mt-4">
                    <h3 className="text-[#56575B] text-[15px]">Includes:</h3>
                    <div className=" flex space-x-3 mt-4">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">5 Personalized Whatsapp Links</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">5 Personalized Redirect Links</h3></div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">3 Multi Links</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">1 Market Links(Shop)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">10 Product Listing</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uppercase text-center bg-[#0071BC] py-2 rounded-t-[8px] text-white ">Most popular</div>
              <div className="border-2 border-[#0071BC] rounded-b-[8px] p-4 bg-white pt-4 pb-8">
                <h3 className="text-center text-[#56575B] uppercase text-[14px]">Basic</h3>
                <h1 className="text-center mt-5 text-[20px] text-[#56575B] font-bold"> {(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((3500 * subValue) - (subValue == 1 ? 0 : ((3500 * subValue) * 0.05))))}<span className="text-[16px]">/month</span> </h1>
                {subValue !== 1 ? <span className="flex justify-center text-[12px] text-[#56575B] font-bold italic">Save up to 5% 0ff</span> : ''}
                <div className="flex-col justify-center mt-5">
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                    <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                    <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">
                    <div onClick={(e) => handleSubmit(e, (3500 * subValue) - (subValue == 1 ? 0 : ((3500 * subValue) * 0.05)))}>
                      <button className=" w-full py-[14px] bg-[#0071BC] text-[#ffffff] text-[15px] rounded-[6px]">Get Started</button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className=" flex space-x-3 mt-4">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">10 Personalized Whatsapp Links</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">10 Personalized Redirect Links</h3></div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">10 Multi Links</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">5 Market Links (Shops)</h3>
                    </div> 

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Online transaction charge (1.5%)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited invoicing & receipts</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited sales records</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Single Staff Account</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">100 Product Listing</h3>
                    </div>
                    {/* <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Can edit Product Details</h3>
                    </div> */}

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Multi Links Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Whatsapp Message Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Redirect Info Editing</h3>
                    </div>

                  </div>
                </div>
              </div>
            </div>


            <div>
              <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
                <h3 className="text-center text-[#56575B] uppercase text-[14px]">POPULAR</h3>
                <h1 className="text-center mt-5 text-[20px] text-[#56575B] font-bold"> {(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((7500 * subValue) - (subValue == 1 ? 0 : ((7500 * subValue) * 0.05))))}<span className="text-[16px]">/month</span> </h1>
                {subValue !== 1 ? <span className="flex justify-center text-[12px] text-[#56575B] font-bold italic">Save up to 5% 0ff</span> : ''}
                <span className="flex justify-center text-center w-full py-[4px] font-bold  text-[#0071BC] text-[15px] rounded-[6px]"> Recommended
                      </span>
                <div className="flex-col justify-center mt-5">
                
                
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
      <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
      <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">
                    <div onClick={(e) => handleSubmit(e, (7500 * subValue) - (subValue == 1 ? 0 : ((7500 * subValue) * 0.05)))}>
                      <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className=" flex space-x-3 mt-4">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">25 Personalized Whatsapp Links</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">25 Personalized Redirect Links</h3></div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">25 Multi Links</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">10 Market Links(Shops)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Online transaction charge (1.5%)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited invoicing & receipts</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited sales records</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited Staff Account</h3>
                    </div>


                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Free QR Code</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">500 Product Listing</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Product Details Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Multi Links Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Whatsapp Message Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Redirect Info Editing</h3>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
              <h3 className="text-center text-[#56575B] uppercase text-[14px]">PREMIUM</h3>
              <h1 className="text-center mt-5 text-[20px] text-[#56575B] font-bold"> {(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((16500 * subValue) - (subValue == 1 ? 0 : ((16500 * subValue) * 0.05))))}<span className="text-[16px]">/month</span> </h1>

              {subValue !== 1 ? <span className="flex justify-center text-[12px] text-[#56575B] font-bold italic">Save up to 5% 0ff</span> : ''}
              <div className="flex-col justify-center mt-5">

                {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
    <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
    <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                <div className="mt-4">
                  <div onClick={(e) => handleSubmit(e, (16500 * subValue) - (subValue == 1 ? 0 : ((16500 * subValue) * 0.05)))}>
                    <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                  </div>
                </div>
                <div className="mt-4">
                    <div className=" flex space-x-3 mt-4">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Unlimited Personalized Whatsapp Links</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">unlimited Personalized Redirect Links</h3></div>
                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Unlimited Multi Links</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Unlimited Market Links(Shops)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Online transaction charge (1.5%)</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited invoicing & receipts</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited sales records</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Unlimited Staff Account</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Free QR Code</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Unlimited Product Listing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Product page customization</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Brand Logo included</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Social media links Addition</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]"> Market links Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Product Details Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Multi Links Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Whatsapp Message Editing</h3>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      <SvgElement type={icontypesEnum.PLANS} />
                      <h3 className="text-[13px] text-[#56575B]">Redirect Info Editing</h3>
                    </div>
                  </div>
                {/* </div> */}
              </div>

            </div>

          </div>
        </div>
      </div>

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
