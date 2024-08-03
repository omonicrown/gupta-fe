import React from 'react'
import Navbar from '../Navbars/Navbar'
import CTA from './CTA'
import { NavLink } from 'react-router-dom'
import { SvgElement, icontypesEnum } from '../assets/svgElement'
import Footer from './Footer'
function Pricing() {
  return (
    <>
      <Navbar />
      <div className='bg-[#F5F5FA] sm:px-16 px-6 flex justify-center items-start py-28' >
        <div className='xl:max-w-[1200px] w-full'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center font-bold font-poppins lg:text-[40px] text-[25px] text-[#231D4F] md:leading-[50px] leading-[38px]">
              Pricing for brands and businesses of all sizes
            </h1>
            <p className="text-[#56575B] text-[20px] mt-5">Engage your audience with branded links, QR codes, and a Link-in-bio to capture their attention.</p>
          </div>

          <div className=" flex justify-center mt-6">
            <h3>Save up to 5% when you pay annually</h3>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mt-10">

            <div>
              <div className="border border-[#0071BC] rounded-[8px] p-4 bg-white pt-4 pb-8">
                <h3 className="text-center text-[#56575B] uppercase text-[14px]">FREE</h3>
                <h1 className="text-center mt-5 text-[34px] text-[#56575B]">₦ 0<sup className="text-[16px]">(First three weeks)</sup> </h1>
                <div className="flex-col justify-center mt-5">
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">Free for 3 weeks</h3>
                <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">
                  <NavLink to="/login">
                    <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                    </NavLink>
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
                <h1 className="text-center mt-5 text-[34px] text-[#56575B]">₦3,500<sup className="text-[16px]">/month</sup> </h1>
                <div className="flex-col justify-center mt-5">
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">
                  <NavLink to="/login">
                    <button className=" w-full py-[14px] bg-[#0071BC] text-[#ffffff] text-[15px] rounded-[6px]">Get Started</button>
                    </NavLink>
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
                <h1 className="text-center mt-5 text-[34px] text-[#56575B]">₦7,500<sup className="text-[16px]">/month</sup> </h1>
                <span className="flex justify-center text-center w-full py-[4px] font-bold  text-[#0071BC] text-[15px] rounded-[6px]"> Recommended
                      </span>
                <div className="flex-col justify-center mt-5">
                  {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                  <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                  <div className="mt-4">
                    <NavLink to="/login">
                      <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started
                      </button>
                    </NavLink>
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
                      <h3 className="text-[13px] text-[#56575B]"> Monthly Sales Analysis Report</h3>
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
              <h1 className="text-center mt-5 text-[34px] text-[#56575B]">₦16,500<sup className="text-[16px]">/month</sup> </h1>
              <div className="flex-col justify-center mt-5">
                {/* <h3 className="text-center text-[#56575B] text-[14px]">2 QR Codes/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px] ">10 links/month</h3>
                <h3 className="text-center text-[#56575B] text-[14px]">1 Link-in-bio page</h3> */}
                <div className="mt-4">
                  <NavLink to="/login">
                    <button className=" w-full py-[14px] bg-[#EDF2FE] text-[#0071BC] text-[15px] rounded-[6px]">Get Started</button>
                  </NavLink>
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
                      <h3 className="text-[13px] text-[#56575B]"> Monthly Sales Analysis Report</h3>
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
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer/>
    </>
  )
}

export default Pricing