import React from 'react'
import { SvgElement, icontypesEnum } from '../assets/svgElement';

function Categories() {
    return (
      <>
      <div className='block p-6 border-r border-b border-l border-gray-200 shadow'>
      <div className='flex space-x-2 mb-2  cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.WOMEN}/></div>
          <h3 className='text-[#696969] text-sm'>Women's Fashion</h3> 
        </div>
        <div className='flex space-x-2 mb-2 py-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.MEN}/></div>
          <h3 className='text-[#696969] text-sm'>Men's Fashion</h3> 
        </div>
        {/* <div className='flex space-x-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.SHOES}/></div>
          <h3 className='text-[#696969]'>Shoes / Accessories</h3> 
        </div> */}

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.BAGS}/></div>
          <h3 className='text-[#696969] text-sm'>Bags</h3> 
        </div>
        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.SPORT}/></div>
          <h3 className='text-[#696969] text-sm'>Sports/Outdoor</h3> 
        </div>
        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Home/Kitchen</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Clothing Accessories</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Shoes</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Watches</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Bags</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Keyboards & Mice</h3> 
        </div>

        <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
          <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN}/></div>
          <h3 className='text-[#696969] text-sm'>Laptops</h3> 
        </div>
      
     
      </div>
      </>
    );
}

export default Categories;