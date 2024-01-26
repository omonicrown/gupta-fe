
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
import { PaymentApis } from "../../apis/paymentApis";

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
  let [marketInfo, setMarketInfo] = React.useState('');

  React.useEffect(() => {
    AdminApis.getSingleProductOutside(params?.storeId).then(
      (response) => {
        if (response?.data) {
          setPro1(response?.data?.data?.product?.product_image_1)
          setPro2(response?.data?.data?.product?.product_image_2)
          setPro3(response?.data?.data?.product?.product_image_3)
          // setData(response?.data?.data)
          setData(response?.data?.data?.product)
          setMarketInfo(response?.data?.data?.market_info)
        }
      }
    );

  }, []);

  let colors = [pro1, pro2, pro3];

  let [visible, setVisible] = React.useState(false);
  let [value, setvalue] = React.useState('');
  let [fullName, setFullName] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [phoneNumber, setPhoneNumber] = React.useState('');
  let [productQty, setProductQty] = React.useState('');


  function togglePaymentModal(value2) {
    setvalue(value2)
    setVisible(true)
  }

  const handlePayment = React.useCallback(
    (e) => {
      console?.log('hello')
      e.preventDefault();
      console?.log('hello2')
      let data = {
        'user_id': value?.user_id,
        'amount': ((value?.product_price) * productQty),
        'customer_full_name': fullName,
        'product_qty': productQty,
        'pay_for': value?.product_name,
        'store_id': value?.link_name,
        'customer_email': email,
        'customer_phone_number': phoneNumber?.countryCode + phoneNumber?.phoneNumber
      }
      PaymentApis.payForProduct(data).then(
        (response) => {
          if (response?.data?.success) {
            console.log(response?.data)
            window.location.replace(response?.data?.data?.data?.link);
            setVisible(false)
            // toast.success(response?.data?.message);
          }
        }
      ).catch(function (error) {
        // handle error
        console.log(error.response.data);
        toast.error("Offfline");
      }).finally(() => {
        //toast.error("No Internet Connection");

      });
    },
    [value, fullName, email, phoneNumber, params, productQty]
  );





  return (
    <>
     
      <div className="flex justify-between md:px-20">

      {marketInfo?.brand_logo == 'no image' || marketInfo?.brand_logo == null ?
          <span><img src="/images/image.png" /> </span>
          :
          <span><img src={marketInfo?.brand_logo} style={{ height: '30px', width: '70px' }} /></span>
        }
        {/* <span  className=""><img src="/images/image.png" /> </span> */}
        {/* <span>djdjks</span> */}
        {/* <span><img src="/images/los.png" style={{ height: '30px' }} /></span> */}
      </div>

      <div className="md:pl-20 mt-4 cursor-pointer">
      <span onClick={() => navigate(-1)}><img src="/images/backarrow.png" style={{ height: '30px' }} /></span>
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
          <SwiperSlide style={{color:'red'}}>
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
        <a target='_blank' href={`${configs?.baseRedirect}/${data?.phone_number}`}
          style={{ backgroundColor: marketInfo?.brand_primary_color }}
            className=" text-[10px] text-white pt-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"
          >
            <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
          </a>

          <span onClick={() => togglePaymentModal(data)}
           style={{ backgroundColor: marketInfo?.brand_primary_color }}
            className=" text-[10px] text-[white] py-1  flex cursor-pointer bg-[#DBF2FF] rounded-full px-2"
          >
             Pay with gupta
          </span>

         
        </div>

        <span>{data?.product_description}</span>
      </div>







      <section>
        <Modal
          visible={visible}
          width="340"
          height="550"
          effect="fadeInUp"
          onClickAway={() => setVisible(false)}
        >
          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <span className="flex justify-end pr-2 pt-2">
              <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>
            <div className=" bg-[#fff]  items-center rounded-lg p-1 px-4">

              <div className="">

                <span className="flex justify-around">
                  {/* <h1 className=" text-xs text-red-600" style={{ fontSize: '10px' }}>Link can’t be edited in free plan. <span style={{ color: '#61A24F' }} className="font-bold text-xs">Upgrade to Pro</span></h1> */}

                </span>

                <label
                  className="flex justify-start  mb-2 pt-1 text-md font-bold text-black"
                >
                  You are about to pay for {value?.product_name}
                </label>
                {/* <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >
                  You are about to delete the Product you created.


                </label> */}




                <form onSubmit={handlePayment} className="pb-4 rounded-lg">

                  <label class="block mb-2 mt-3 text-sm  text-gray-900 dark:text-gray-600">Full Name</label>
                  <input required type="text" name="full_name" onChange={(e) => setFullName(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Full Name" />

                  <label class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Email</label>
                  <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Email" />


                  <label class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Quantity</label>
                  <input required type="number" name="productQty" onChange={(e) => setProductQty(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Paying for how many?" />

                  <label class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Phone Number</label>
                  <PhoneInput
                    style={{ backgroundColor: '#F4FBFF' }}
                    disabled={false}
                    name="phone"
                    required
                    // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhoneNumber}
                    placeholder={'Enter Mobile Number'}
                  />

                  <span className=" text-red-500 text-[10px]">{phoneNumber?.message}</span>

                  {/* <input required type="text"  id="customer_full_name" onChange={(e)=>setPhoneNumber(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your phone number" /> */}



                  <span className="flex justify-center pt-4">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                      className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Proceed to payment
                    </button>
                  </span>

                  <span className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={(e) => setVisible(false)}
                      style={{ borderRadius: '50px' }}
                      className=" text-black bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Cancel
                    </button>
                  </span>

                </form>



              </div>

            </div>

          </div>
        </Modal>
      </section>









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
