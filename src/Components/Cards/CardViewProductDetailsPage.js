
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'
import { ThreeDots } from 'react-loader-spinner'
import { TailSpin } from 'react-loader-spinner'
import { Oval } from 'react-loader-spinner'
import { Swiper, SwiperSlide } from "swiper/react";
import { FaWhatsapp, FaEye } from "react-icons/fa";
import configs from "../../configs";



// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";

// components



export default function CardEditProduct() {
  const navigate = useNavigate();
  const params = useParams();


  const [pro1, setPro1] = React.useState([]);
  const [pro2, setPro2] = React.useState([]);
  const [pro3, setPro3] = React.useState([]);
  const [data, setData] = React.useState([]);
  const delay = 2500;
  

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  console?.log(data)

  React.useEffect(() => {
    AdminApis.getSingleProductOutside(params?.storeId).then(
      (response) => {
        if (response?.data) {
          setPro1(response?.data?.data?.product_image_1)
          setPro2(response?.data?.data?.product_image_2)
          setPro3(response?.data?.data?.product_image_3)
          // setData(response?.data?.data)
          setData(response?.data?.data)
        }
      }
    );

  }, []);

  let colors = [pro1, pro2, pro3];

  console?.log(colors)


  return (
    <>

      <div className="flex justify-between md:px-20">
        <span onClick={() => navigate(-1)} className="cursor-pointer"><img src="/images/image.png" /> </span>
        {/* <span>djdjks</span> */}
        <span><img src="/images/los.png" style={{ height: '30px' }} /></span>
      </div>


      <div className="flex md:pl-24 md:pr-24 pt-10">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          pagination={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          className="mySwiper"
        // style={{maxHeight:'400px'}}
        >
          <SwiperSlide >
            <img className="object-fill w-full h-[500px] md:min-h-[500px] min-h-[300px] max-h-[300px] md:max-h-[500px]" src={pro1} alt="" />
            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              gupta</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-fill w-full h-[500px] md:min-h-[500px] min-h-[300px] max-h-[300px] md:max-h-[500px]" src={pro2} alt="" />
            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              gupta</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-fill w-full h-[500px] md:min-h-[500px] min-h-[300px] max-h-[300px] md:max-h-[500px]" src={pro3} alt="" />
            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              gupta</h3>
          </SwiperSlide>

        </Swiper>
      </div>

      <div className="md:pl-24 md:pr-24 mt-10">
        <div className="flex flex-col">
          <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span>
          <span className="text-[#0071BC] text-[20px] font-[700]">NGN {data?.product_price}</span>
        </div>

        <div className="flex justify-start gap-3 py-3">

          <NavLink to={`/storedetails/${data?.id}`}
            className=" text-[10px] text-[#0071BC] py-1  flex cursor-pointer bg-[#DBF2FF] rounded-full px-2"
          >
            {data?.no_of_items} Items in stock
          </NavLink>

          <a target='_blank' href={`${configs?.baseRedirect}/${data?.phone_number}`}
            className=" text-[10px] text-white pt-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"
          >
            <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
          </a>
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
