import React from 'react'
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { NavLink } from 'react-router-dom';
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal'

const Hero = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  return (
    <>
      <section className='flex md:flex-row flex-col lg:py-16 py-6'>
        <div className='flex-1 flex justify-center items-start flex-col'>
          <div className="md:flex flex-row justify-between items-center w-full hidden">
            <h1 className="flex-1 font-poppins font-[900] md:text-[64px] text-[40px] text-black md:leading-[81.6px] leading-[60px]">
              <div className='flex'>
                <h1>Connect your  </h1>
                  <SvgElement type={icontypesEnum.CURSORICON} />
              </div>
               {/* <br className="sm:block hidden" /> {" "} */}
              <div className='flex'>
                <h1 className="">World <span className='bg-[#0071BC] text-white rounded-[10px] px-2'>in a click</span> </h1>
               
              </div>
            </h1>
          </div>
          <div className='flex md:hidden items-center w-full'>
            <h1 className="flex-1 font-poppins font-[900] text-[30px] text-black leading-[48px]">
            <div className='flex'>
                <h1>Connect your  </h1>
                <SvgElement type={icontypesEnum.CURSORICONSMALL} />
              </div>
              <div className='flex'>
              <h1 className="">World <span className='bg-[#0071BC] text-white rounded-[10px] px-2'>in a click</span> </h1>
                
              </div>
            </h1>
          </div>
          <p className={`font-poppins font-normal text-black md:text-[15px] text-[13px] md:leading-[23.85px] leading-[20px] max-w-[530px] mt-5 `}>Gupta empowers businesses to streamline their WhatsApp interactions with customers through a suite of powerful features designed to enhance customer engagement, simplify link sharing, and automate messaging.</p>
          <div className='flex flex-row mt-[36px]'>
            <NavLink to='/login'>
            <button type="button" className="text-white bg-[#0071BC] hover:bg-[#DBF2FF] hover:text-[#0071BC] font-medium rounded-[45px] text-[14px] md:px-[30px] md:py-3 px-4 py-2.5 md:mr-4 mr-8">Get Started</button>
            </NavLink>
            <button type="button" 
            onClick={() => onOpenModal()}
            className="text-[#0071BC] bg-[#DBF2FF]  font-medium rounded-[45px] text-[14px] md:px-[30px] md:py-3 px-3 py-2 inline-flex">
              Request Demo
              <svg className='ml-[10px]' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2.5C10.5222 2.5 8.58879 3.08649 6.9443 4.1853C5.29981 5.28412 4.01809 6.8459 3.26121 8.67317C2.50433 10.5004 2.3063 12.5111 2.69215 14.4509C3.078 16.3907 4.03041 18.1725 5.42894 19.5711C6.82746 20.9696 8.60929 21.922 10.5491 22.3079C12.4889 22.6937 14.4996 22.4957 16.3268 21.7388C18.1541 20.9819 19.7159 19.7002 20.8147 18.0557C21.9135 16.4112 22.5 14.4778 22.5 12.5C22.5 11.1868 22.2413 9.88642 21.7388 8.67317C21.2363 7.45991 20.4997 6.35752 19.5711 5.42893C18.6425 4.50035 17.5401 3.76375 16.3268 3.2612C15.1136 2.75866 13.8132 2.5 12.5 2.5ZM10.5 17V8L16.5 12.5L10.5 17Z" fill="#0071BC" />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex-1 flex justify-center items-center lg:mt-0 mt-10'>
        <img src="/images/hero1.png" alt="hero"/>
        </div>
      </section>
      
      <Modal open={openModal} onClose={onCloseModal} center>
        <div className='w-full '>
          <div className="w-full mt-8" >
            <iframe className="lg:w-[50vw] w-[80vw] h-full aspect-video " src="https://www.youtube.com/embed/siGCVexlDCY?si=xlmKB3TvICmAT8sy"></iframe>
          </div>
        </div>

      </Modal>
    </>
  )
}

export default Hero