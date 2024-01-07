
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

  if (searchParams.get('tx_ref')) {
    AdminApis.getCallback(searchParams.get('tx_ref')).then(
        (response) => {
            if (response?.data) {
                // navigate('/wallet');
                if (response?.data?.success === true) {
                    //navigate(response?.data?.data);
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



  const handleSubmit = (e,amount) => {
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

      <div className='bg-[#F5F5FA] sm:px-16 px-6 flex justify-center items-start py-16' >
        <div className='xl:max-w-[1200px] w-full'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center font-bold font-poppins md:text-[40px] text-[25px] text-[#231D4F] md:leading-[50px] leading-[38px]">
              Simple, transparent pricing
            </h1>
            <p className="text-[#848199] text-[20px] mt-5">No contract, no surprice fee</p>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mt-10">
            <div>

            
            <div className="bg-white py-6 px-8 md:rounded-l-[26px] rounded-[15px] mt-8">
              <h2 className="text-[33px] text-[#231D4F] font-semibold">$20 <span className="text-[14px] text-[#848199]">/ month</span></h2>
              <h3 className="mt-2 text-[#231D4F] text-[26px]">Basic</h3>
              <p className="mt-1 text-[14px] text-[#848199]">For most businesses that want to otpimize web queries</p>
              <div className="mt-3">
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">All limited links</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Own analytics platform</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Chat support</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Optimize hashtags</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Unlimited users</h3>
                </div>

                <div className="flex justify-between mt-2">
                  {/* <NavLink to='/register' className=""> */}
                  <span onClick={(e)=>handleSubmit(e,'2')} className="text-[#0071BC] hover:underline text-[10px] font-[700] cursor-pointer">Pay a month</span>
                  {/* </NavLink> */}


                
                  <span onClick={(e)=>handleSubmit(e,'20')} className="text-[#0071BC] hover:underline text-[10px] font-[700] cursor-pointer">Pay a year</span>
                  
                </div>



                </div>
              </div>
            </div>

            {/* <div className="bg-white py-6 px-8 mt-8 md:rounded-l-[26px] rounded-[15px]">
              <h2 className="text-[33px] text-[#231D4F] font-semibold">$50 <span className="text-[14px] text-[#848199]">/ month</span></h2>
              <h3 className="mt-2 text-[#231D4F] text-[26px]">Base</h3>
              <p className="mt-1 text-[14px] text-[#848199]">For most businesses that want to otpimize web queries</p>
              <div className="mt-3">
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">All limited links</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Own analytics platform</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Chat support</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Optimize hashtags</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Unlimited users</h3>
                </div>

              </div>
            </div> */}


            <div className="bg-[#0071BC] py-6 px-8 md:mb-8 mb-0 mt-8 md:mt-0 rounded-[20px] shadow-2xl shadow-[#0071BC]">
              <div className="flex justify-end">
                <h3 className="text-[10px] text-white">POPULAR</h3>
              </div>
              <h2 className="text-[33px] text-[#ffffff] font-semibold">$100 <span className="text-[14px] text-[#ffffff]">/ month</span></h2>
              <h3 className="mt-2 text-[#ffffff]  text-[26px]">Pro</h3>
              <p className="mt-1 text-[14px] text-white ">For most businesses that want to otpimize web queries</p>
              <div className="mt-3">
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="white" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="white" />
                  </svg>

                  <h3 className="text-[14px] text-[#ffffff]  font-normal">All limited links</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="white" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="white" />
                  </svg>

                  <h3 className="text-[14px] text-[#ffffff]  font-normal">Own analytics platform</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="white" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="white" />
                  </svg>

                  <h3 className="text-[14px] text-[#ffffff] font-normal">Chat support</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="white" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="white" />
                  </svg>

                  <h3 className="text-[14px] text-[#ffffff]  font-normal">Optimize hashtags</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="white" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="white" />
                  </svg>

                  <h3 className="text-[14px] text-[#ffffff]  font-normal">Unlimited users</h3>
                </div>

              </div>
            </div>


            <div className="bg-white py-6 px-8 mt-8 md:rounded-r-[26px] rounded-[15px]">
              <h2 className="text-[33px] text-[#231D4F] font-semibold">$200 <span className="text-[14px] text-[#848199]">/ month</span></h2>
              <h3 className="mt-2 text-[#231D4F] text-[26px]">Premium</h3>
              <p className="mt-1 text-[14px] text-[#848199]">For most businesses that want to otpimize web queries</p>
              <div className="mt-3">
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">All limited links</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Own analytics platform</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Chat support</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Optimize hashtags</h3>
                </div>
                <div className="flex space-x-2 mt-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#5243C2" fill-opacity="0.103693" />
                    <path d="M15.7727 6.83313L10.0685 14.574C9.93246 14.7545 9.7296 14.8727 9.50552 14.9022C9.28143 14.9316 9.0549 14.8698 8.87683 14.7306L4.8035 11.474C4.44405 11.1863 4.38585 10.6617 4.6735 10.3023C4.96115 9.94285 5.48572 9.88465 5.84516 10.1723L9.24183 12.8898L14.431 5.8473C14.6012 5.59195 14.8979 5.45078 15.2033 5.47983C15.5088 5.50887 15.7736 5.70344 15.8926 5.98627C16.0116 6.26911 15.9655 6.59445 15.7727 6.83313Z" fill="#0071BC" />
                  </svg>
                  <h3 className="text-[14px] text-[#848199] font-normal">Unlimited users</h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>












  

      <ToastContainer
        position="bottom-left"
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
