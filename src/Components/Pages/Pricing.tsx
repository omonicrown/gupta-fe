import React from 'react'
import Navbar from '../Navbars/Navbar'
import CTA from './CTA'
function Pricing() {
  return (
    <>
    <Navbar/>
    <div className='bg-[#FFFFFF] sm:px-16 px-6 flex justify-center items-start py-16' >
        <div className='xl:max-w-[1200px] w-full'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center font-bold font-poppins lg:text-[40px] text-[25px] text-[#231D4F] md:leading-[50px] leading-[38px]">
              Pricing for brands and businesses of all sizes
            </h1>
            <p className="text-[#56575B] text-[20px] mt-5">Connect to your audience with branded links, QR Codes, and a Link-in-bio that will get their attention.</p>
          </div>

          <div className=" flex justify-center mt-6">
            <h3>Save up to 34% when you pay annually</h3>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mt-10 pb-20 ">

            <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
              <h3 className="text-center text-[#56575B] uppercase text-[14px]">FREE</h3>
              <h1 className="text-center mt-5 text-[34px] text-[#56575B]">N0<sup className="text-[16px]">/month</sup> </h1>
              <div className="flex-col justify-center mt-5">
                <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3>
                <div className="mt-4">
                  <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                </div>
                <div className="mt-4">
                  <h3 className="text-[#56575B] text-[15px]">Includes:</h3>
                  <div className=" flex space-x-3 mt-4">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">5 custom back-halves</h3>
                  </div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">PNG & JPEG QR Code download formats</h3></div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">QR Code customizations</h3></div>
                </div>
              </div>
            </div>

            <div>
              <div className="uppercase text-center bg-[#0071BC] py-2 rounded-t-[8px] text-white ">Most popular</div>
              <div className="border-2 border-[#0071BC] rounded-b-[8px] p-4 bg-white pt-4 pb-8">
                <h3 className="text-center text-[#56575B] uppercase text-[14px]">Basic</h3>
                <h1 className="text-center mt-5 text-[34px] text-[#56575B]">N3,500<sup className="text-[16px]">/month</sup> </h1>
                <div className="flex-col justify-center mt-5">
                  <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3>
                  <div className="mt-4">
                    <button className=" w-full py-[14px] bg-[#0071BC] text-[#ffffff] text-[15px] rounded-[6px]">Get Started</button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-[#56575B] text-[15px]">Everything in Free, plus:</h3>
                    <div className=" flex space-x-3 mt-4">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <h3 className="text-[13px] text-[#56575B]">30 days of click & scan data</h3>
                    </div>
                    <div className="flex space-x-3 mt-2">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <h3 className="text-[13px] text-[#56575B]">UTM Builder</h3></div>
                    <div className="flex space-x-3 mt-2">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <h3 className="text-[13px] text-[#56575B]">Advanced QR Code customizations</h3></div>
                    <div className="flex space-x-3 mt-3">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <h3 className="text-[13px] text-[#56575B]">Link & QR Code redirects</h3></div>
                  </div>
                </div>
              </div>
            </div>


            <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
              <h3 className="text-center text-[#56575B] uppercase text-[14px]">POPULAR</h3>
              <h1 className="text-center mt-5 text-[34px] text-[#56575B]">N7,500<sup className="text-[16px]">/month</sup> </h1>
              <div className="flex-col justify-center mt-5">
                <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3>
                <div className="mt-4">
                  <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                </div>
                <div className="mt-4">
                  <h3 className="text-[#56575B] text-[15px]">Includes:</h3>
                  <div className=" flex space-x-3 mt-4">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">5 custom back-halves</h3>
                  </div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">PNG & JPEG QR Code download formats</h3></div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">QR Code customizations</h3></div>
                </div>
              </div>
            </div>

            <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
              <h3 className="text-center text-[#56575B] uppercase text-[14px]">PREMIUM</h3>
              <h1 className="text-center mt-5 text-[34px] text-[#56575B]">N16,500<sup className="text-[16px]">/month</sup> </h1>
              <div className="flex-col justify-center mt-5">
                <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3>
                <div className="mt-4">
                  <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                </div>
                <div className="mt-4">
                  <h3 className="text-[#56575B] text-[15px]">Includes:</h3>
                  <div className=" flex space-x-3 mt-4">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">5 custom back-halves</h3>
                  </div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">PNG & JPEG QR Code download formats</h3></div>
                  <div className="flex space-x-3 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1283 6.80001V2.8C13.1283 2.35817 12.7405 2 12.262 2H1.86631C1.38786 2 1 2.35817 1 2.8V11.6C1 12.0419 1.38786 12.4 1.86631 12.4H5.33155" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 4.40002H13.1283" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9381 7.8299L11.8264 10H13.559C13.738 9.99391 13.9019 10.0921 13.969 10.2454C14.036 10.3988 13.9917 10.5746 13.8582 10.6848L12.3566 11.6528L13.1888 13.4198C13.2639 13.5856 13.216 13.7773 13.0698 13.8959C12.9235 14.0145 12.7115 14.0337 12.5431 13.9435L10.5327 12.8982L8.52288 13.9435C8.35447 14.0337 8.14251 14.0145 7.99625 13.8959C7.84998 13.7773 7.80206 13.5856 7.87719 13.4198L8.70423 11.6528L7.20262 10.6848C7.06882 10.5751 7.02396 10.3996 7.09048 10.2461C7.157 10.0927 7.3206 9.99423 7.49948 10H9.2321L10.1221 7.8299C10.2023 7.69052 10.3592 7.60339 10.5301 7.60339C10.701 7.60339 10.858 7.69052 10.9381 7.8299Z" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.46924 10.2796L7.06417 6.68469" stroke="#0071BC" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-[13px] text-[#56575B]">QR Code customizations</h3></div>
                </div>
              </div>
            </div>

          </div>

          <div>
                        <CTA/>
                    </div> 

        </div>
      </div>
    </>
  )
}

export default Pricing