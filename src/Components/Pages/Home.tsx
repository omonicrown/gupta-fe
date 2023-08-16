import React from 'react'
import Navbar from '../Navbars/Navbar'
import Hero from './Hero'
import CTA from './CTA'
import { SvgElement, icontypesEnum } from "../assets/svgElement";

function Home() {
  return (
    <>
      <Navbar />
      {/* Start Section */}
      <div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start relative' >
        <div className='xl:max-w-[1280px] w-full'>
          <Hero />
        </div>
      </div>
      {/* End Section */}

      {/* Start Section */}
      <div className='bg-[#F4FBFF] sm:px-16 px-6 md:flex md:justify-center hidden items-start ' >
        <div className='xl:max-w-[1000px] w-full mx-auto absolute md:bottom-[-130px]'>
          <div className="flex flex-row flex-wrap items-center justify-between md:py-[40px] md:px-[140px] px-4 rounded-[30px] shadow-[4px_35px_60px_-7px_rgba(0,0,0,0.3)] mb-2">
            <div className='flex space-x-2'>
            <h3>😁</h3>
              <span className='md:text-[16px] font-normal'>Create a free gypta.link</span>
              <div className='mt-1'><SvgElement type={icontypesEnum.ARROWDOWN}/></div>
            </div>
            <div className='flex space-x-2'>
              <h3>👑</h3>
              <span>Get a branded wa.link</span>
              <div className='mt-1'><SvgElement type={icontypesEnum.ARROWDOWN}/></div>
            </div>
            <div className='flex space-x-2'>
              <h3>💬</h3>
              <span>Open Whatsapp Chats</span>
              <div className='mt-1'><SvgElement type={icontypesEnum.COPYLINK}/></div>
            </div>

          </div>
        </div>
      </div>
      {/* End Section */}

      {/* Start Section */}
      <div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start md:pt-10' >
        <div className='xl:max-w-[1280px] w-full'>
          <section className='flex md:flex-row flex-col sm:py-16 py-6'>
            <div className='flex-1 flex-col justify-center items-start  '>
              <img src="/images/image1.png" alt="hero" />
            </div>

            <div className='flex-1 flex   flex-col md:ml-[120px] ml-0 md:mt-[110px] mt-20 relative'>
              <div className="md:flex flex-row   w-full">
                <h1 className="flex-1 font-poppins font-[900] md:text-[40px] text-[27px] text-black md:leading-[48px] leading-[38px]">
                  Take your WhatsApp  <br className="sm:block hidden" /> {" "}
                  <div className='flex'>
                    <h1 className="">business communication </h1>
                  </div>
                  to the next level.
                </h1>
              </div>
              <div>
                <ul className="max-w-md space-y-3 text-[#6C757D] list-disc list-inside mt-[24px]">
                  <li>
                    Utilize descriptive labels for links to maintain an organized link library.
                  </li>
                  <li>
                    Tailor automated messages to be concise, relevant, and personalized.
                  </li>
                  <li>
                    Regularly review and update your multilinks to reflect changing business needs.
                  </li>
                  <li>
                    Analyze link engagement and message responses to refine your communication strategy.
                  </li>
                </ul>
              </div>


            </div>

          </section>
        </div>
      </div>
      {/* End Section */}

      {/* Start Section */}
      <div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start' >
        <div className='xl:max-w-[1280px] w-full'>

          <section className='flex md:flex-row flex-col sm:py-16 py-6'>
            <div className='flex-1 flex justify-center items-start flex-col'>
              <div className="md:flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-[900] md:text-[40px] text-[27px] text-black md:leading-[50px] leading-[38px]">
                  The Ultimate <br className="sm:block hidden" /> {" "}
                  <div className='flex'>
                    <h1 className="">SaaS platform </h1>

                  </div>
                </h1>
              </div>

              <p className={`font-poppins font-normal text-[#6C757D] md:text-[15px] text-[13px] md:leading-[23.85px] leading-[20px] max-w-[530px] mt-[30px] `}>
                Your ultimate SaaS platform for optimizing your WhatsApp business's  communication! Gupta empowers businesses to streamline their WhatsApp interactions with customers through a suite of powerful features designed to enhance customer engagement, simplify link sharing, and automate messaging.
              </p>
            </div>
            <div className='flex-1 flex justify-center items-center'>
              <img src="/images/image2.png" alt="hero" />
            </div>
          </section>

        </div>
      </div>
      {/* End Section */}

      {/* Start Section */}
      <div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start' >
        <div className='xl:max-w-[1280px] w-full'>
          <div className='flex justify-center items-center'>
            <h1 className="text-center font-bold font-poppins md:text-[40px] text-[27px] text-black md:leading-[50px] leading-[38px]">
              Unique Features Tailored <br/>for you 
              </h1>
            </div>
            <div className='flex md:flex-row flex-col sm:py-16 py-6'>
              <div className='flex-1 flex space-x-2 justify-center items-start'>
                <div className='bg-black text-white text-sm font-medium mr-2 mt-1 px-3 py-1.5 rounded'>1</div>
                <div>
                  <h3 className='font-semibold text-[20px] leading-[25px]'>Customized <br/>WhatsApp Links</h3>
                  <p className='mt-3 text-[#6C757D] max-w-[280px]'>Easily generate links with the 'Click-to-WhatsApp' functionality. Customize the link text, appearance, and assign labels for better organization.</p>
                </div>
              </div>
              <div className='flex-1 flex space-x-2 justify-center items-start md:mt-0 mt-5'>
              <div className='bg-black text-white text-sm font-medium mr-2 mt-1 px-3 py-1.5 rounded'>2</div>
                <div>
                  <h3 className='font-semibold text-[20px] leading-[25px]'>Customized Message<br/> and Catalog Links</h3>
                  <p className='mt-3 text-[#6C757D] max-w-[280px]'>Easily generate links with the 'Click-to-WhatsApp' functionality. Customize the link text, appearance, and assign labels for better organization.</p>
                </div>
              </div>
              <div className='flex-1 flex space-x-2 justify-center items-start md:mt-0 mt-5'>
              <div className='bg-black text-white text-sm font-medium mr-2 mt-1 px-3 py-1.5 rounded'>3</div>
                <div>
                  <h3 className='font-semibold text-[20px] leading-[25px]'>Multilinks<br/> Creation</h3>
                  <p className='mt-3 text-[#6C757D] max-w-[280px]'>Easily generate links with the 'Click-to-WhatsApp' functionality. Customize the link text, appearance, and assign labels for better organization.</p>
                </div>
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:py-[16px] py-5'>
            <div className='flex-1 flex space-x-2 justify-center items-start md:mt-0'>
              <div className='bg-black text-white text-sm font-medium mr-2 mt-1 px-3 py-1.5 rounded'>4</div>
                <div>
                  <h3 className='font-semibold text-[20px] leading-[25px]'>Redirect Links <br/> Setup</h3>
                  <p className='mt-3 text-[#6C757D] max-w-[280px]'>Create redirect links to guide users to specific URLs. Enhance user experience by directing them to relevant destinations beyond WhatsApp.</p>
                </div>
              </div>
              <div className='flex-1 flex space-x-2 justify-center items-start md:mt-0 mt-5'>
              <div className='bg-black text-white text-sm font-medium mr-2 mt-1 px-3 py-1.5 rounded'>5</div>
                <div>
                  <h3 className='font-semibold text-[20px] leading-[25px]'>Automated Messages <br/>Configuration</h3>
                  <p className='mt-3 text-[#6C757D] max-w-[280px]'>Set up automated messages to be sent to specific groups of people. Provide instant responses and maintain engagement without manual intervention.</p>
                </div>
              </div>
            </div>
          
          
        </div>
      </div>
      {/* End Section */}
{/* Start Section */}
<div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start' >
        <div className='xl:max-w-[1280px] w-full'>

          <section className='flex md:flex-row flex-col sm:py-16 py-6'>
            <div className='flex-1 flex justify-center items-start flex-col'>
            <img src="/images/sample.png" alt="hero" className='md:w-[60%]'/>

              
            </div>
            <div className='flex-1 flex justify-center items-center md:mt-0 mt-5'>
              <img src="/images/phone.png" alt="hero"/>
            </div>
          </section>

        </div>
      </div>
      {/* End Section */}

{/* Start Section */}
<div className='bg-[#F4FBFF] sm:px-16 px-6 flex justify-center items-start' >
        <div className='xl:max-w-[1200px] w-full'>
        <CTA/>
        </div>
      </div>
      {/* End Section */}
     
      Footer
    </>
  )
}

export default Home