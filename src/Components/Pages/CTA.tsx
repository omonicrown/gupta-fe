import React from 'react'
import { NavLink } from 'react-router-dom'

const CTA = () => {
  return (
    <>
<div className="flex flex-col items-center justify-between bg-[#070914] md:py-[40px] py-10 md:px-[140px] px-4 rounded-[16px] mb-2">
            <h1 className='md:text-[48px] text-[30px] text-white font-semibold text-center md:leading-[58px] leading-[35px]'>
              Starting with gupta is<br/> easy and fast
            </h1>
            <p className='my-6 text-white md:text-[20px] text-base text-center'>It only takes a few clicks to get started</p>
            <div>
            <NavLink to='/register'>
            <button type="button" className="text-white bg-[#0071BC] hover:bg-[#DBF2FF] hover:text-[#0071BC] font-medium rounded-[5px] text-[15px] md:px-[40px] md:py-4 px-6  py-2.5 md:mr-4 mr-8">Get Started - It's Free</button>
            </NavLink>
            </div>

          </div>
    </>
  )
}

export default CTA