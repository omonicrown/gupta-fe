import React from 'react'
import { NavLink } from 'react-router-dom'

const CTA = () => {
  return (
    <>
      {/* <div className="flex flex-col items-center justify-between bg-[#070914] md:py-[40px] py-10 md:px-[140px] px-4 rounded-[16px] mb-2">
            <h1 className='md:text-[48px] text-[30px] text-white font-semibold text-center md:leading-[58px] leading-[35px]'>
              Starting with gupta is<br/> easy and fast
            </h1>
            <p className='my-6 text-white md:text-[20px] text-base text-center'>It only takes a few clicks to get started</p>
            <div>
            <NavLink to='/login'>
            <button type="button" className="text-white bg-[#0071BC] hover:bg-[#DBF2FF] hover:text-[#0071BC] font-medium rounded-[5px] text-[15px] md:px-[40px] md:py-4 px-6  py-2.5 md:mr-4 mr-8">Get Started - It's Free</button>
            </NavLink>
            </div>
          </div> */}

      <div className='flex md:flex-row flex-col'>
      <div className='flex-1 lg:pt-[125px] pt-10'>
        <h1 className='lg:text-[48px] text-[30px] text-white font-bold md:leading-[58px] leading-[45px]'>Starting with Gupta is Easy and Fast.</h1>
       
     <div className='my-[35px]'>
      <button className='bg-white text-[#0071BC] py-[13px] px-[30px] rounded-[29px] font-medium'>Get Started - It's free</button>
     </div>
      </div>
      <div className='flex-1 lg:mt-0 mt-[20px]'>
        <img src="/images/cta.png" alt="hero"/>
        </div>
      </div>
    </>
  )
}

export default CTA