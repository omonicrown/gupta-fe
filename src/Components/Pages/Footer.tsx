import React from 'react'
import { NavLink } from 'react-router-dom'
import { SvgElement, icontypesEnum } from "../assets/svgElement";

function Footer() {
  return (
    <>
    <section className='pt-10 md:pt-10 pb-14 bg-gradient-to-b from-[#FFFFFF] to-[#EDF8FF]'>
                <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-12 px-8 lg:px-16'>
                    <div className='col-span-3 mb-6'>
                        {/* <h1 className='md:text-[50px] text-[30px] font-medium text-[#209D5A]'>AfriPay</h1> */}
                        <SvgElement type={icontypesEnum.BARS} />
                        <p className='text-[#A6A6A6] mt-3'>© 2024 Gupta. All rights reserved</p>
                        
                    </div>
                    <div className=' col-span-1 hidden md:block'></div>
                    <div className=' col-span-2 mt-3'>
                        <h4 className='text-[#0071BC] text-[16px] md:text-[18px] font-medium mb-3'>Product</h4>
                        <NavLink to="/faq">
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Overview</h3>
                        </NavLink>
                        <NavLink to="#">
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Features</h3>
                        </NavLink>
                       <NavLink to="/pricing">
                       <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Pricing</h3>
                       </NavLink>
                    </div>
                    <div className=' col-span-2 mt-3'>
                        <h4 className='text-[#0071BC] text-[16px] md:text-[18px] font-medium mb-3'>Company</h4>
                        <NavLink to="/faq">
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>FAQs</h3>
                        </NavLink>
                        <NavLink to="#">
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Blog</h3>
                        </NavLink>
                        <NavLink to="/">
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>About Us</h3>
                        </NavLink>
                       <NavLink to="#">
                       <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Contact Us</h3>
                       </NavLink>
                        {/* <NavLink to="/">
                        <h3 className='mb-2 text-[16px] md:text-[18px] font-medium text-[#A6A6A6]'>Blog</h3>
                        </NavLink> */}
                        
                    </div>
                    <div className=' col-span-2 mt-3'>
                        <h4 className='text-[#0071BC] text-[16px] md:text-[18px] font-medium mb-3'>Support</h4>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Help Center</h3>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Terms of service</h3>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Privacy Policy</h3>
                    </div>
                    <div className=' col-span-2 mt-3'>
                        <h4 className='text-[#0071BC] text-[16px] md:text-[18px] font-medium mb-3'>Follow Us</h4>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Facebook</h3>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Instagram</h3>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Twitter</h3>
                        <h3 className='mb-2 text-[14px] font-medium text-[#999999]'>Tik Tok</h3>
                       
                        
                    </div>
                </div>
                {/* <div className='flex flex-col lg:flex-row lg:justify-between mt-16 px-8 lg:px-16' >
                    <div>
                        <p className='text-white text-[16px] md:text-[18px]'>©2024 Afripay. Copyright and rights reserved</p>
                    </div>
                    <div className='flex space-x-2 mt-3'>
                    <NavLink to="/terms-of-use">
                    <p className='text-white text-[16px] md:text-[18px]'>Terms of Use</p>
                        </NavLink>
                       
                        <p className='text-white text-[16px] md:text-[18px]'>.</p>
                        <NavLink to="/terms-of-use">
                        <p className='text-white text-[16px] md:text-[18px]'>Privacy Policy</p>
                        </NavLink>
                       
                    </div>
                </div> */}
            </section>
    </>
  )
}

export default Footer