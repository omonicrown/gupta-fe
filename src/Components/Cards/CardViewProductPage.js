
import React, { useState } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';
import { useParams } from 'react-router-dom';
import configs from "../../configs";
import Modal from 'react-awesome-modal';
import { FaWhatsapp, FaEye } from "react-icons/fa";
import { Image } from '../../Components/assets/img/image.png'
import { PaymentApis } from "../../apis/paymentApis";

//@ts-ignore
import { PhoneInput } from "react-contact-number-input";
import { Oval } from 'react-loader-spinner'
// components

export default function CardViewProductPage() {

  const [images, setImages] = React.useState('');
  const maxNumber = 69;

  const params = useParams();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

  let [visible, setVisible] = React.useState(false);
  let [loader, setLoader] = React.useState(false);
  let [value, setvalue] = React.useState('');
  let [fullName, setFullName] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [phoneNumber, setPhoneNumber] = React.useState('');
  let [productQty, setProductQty] = React.useState('');

  let [marketInfo, setMarketInfo] = React.useState('');

  function togglePaymentModal(value2) {
    setvalue(value2)
    setVisible(true)
  }

  if (searchParams.get('status') == 'cancelled') {
    navigate(`/store/${params?.storeId}`);
  }


  if (searchParams.get('tx_ref')) {
    PaymentApis.getProdutCallback(searchParams.get('tx_ref')).then(
      (response) => {
        if (response?.data) {
          // navigate('/wallet');
          if (response?.data?.success === true) {
            if (response?.data?.data?.status == 'successful') {
              navigate(`/store/${params?.storeId}`);
              toast.success(response?.data?.data?.status);
            } else {
              // navigate('/mylinks');
              toast.error(response?.data?.data?.status);
              console?.log(response?.data)
            }

          }
        } else {
          // toast.warn('Invalid Login Credentials');
        }
      }
    ).catch(function (error) {
      // handle error
      console.log(error.response.data);
    }).finally(() => {
      // toast.error("No Internet Connection");

    });
  }



  const handlePayment = React.useCallback(
    (e) => {
      console?.log('hello')
      e.preventDefault();
      console?.log('hello2')
      let data = {
        'user_id': value?.user_id,
        'amount': ((value?.no_of_items) * productQty),
        'customer_full_name': fullName,
        'product_qty': productQty,
        'pay_for': value?.product_name,
        'store_id': params?.storeId,
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






  //   var CryptoJS = require("crypto-js");

  //   var ciphertext = CryptoJS.AES.encrypt('my message','secret key 123').toString();
  // var test = CryptoJS.SHA256("Message");

  // var str = window.btoa('002');
  //  console.log('Encrypted:', str);

  //  var str2 = window.atob(str);
  //  console.log('Decrypted:', str2);

  // console?.log(ciphertext);



  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const [data, setData] = React.useState([]);



  React.useEffect(() => {
    setLoader(true)
    AdminApis.getProductByLinkName(params?.storeId, '').then(
      (response) => {
        if (response?.data) {
          // console?.log('ssss')
          // setMultiLinks(response?.data?.data);
          // setName(response?.data?.data?.multiLinks?.name);
          // setTitle(response?.data?.data?.multiLinks?.title)
          // SetBio(response?.data?.data?.multiLinks?.bio)
          // setBusinessSite(response?.data?.data?.multiLinks?.business_website)
          // // console?.log(response?.data?.data?.attachLinks)
          // setPermissionList(response?.data?.data?.attachLinks)
          // setBusinessPolicy(response?.data?.data?.multiLinks?.business_policy)
          setData(response?.data?.data)
          setMarketInfo(response?.data?.data?.market_info)
          setLoader(false)

          // response?.data?.data?.attachLinks?.map(
          //   (data, index) => (
          //     permissionDropdownChange2(data?.attach_links)
          //   ))
        }
      }).catch(function (error) {
        console?.log(error)
        setLoader(false)

        // toast.error("Offfline");
      })

      ;

  }, []);



  const paginator = React.useCallback(
    (value) => {
      //   setLoader(true);
      let value2 = '';
      if (value !== null) {
        value2 = value;
      } else {
        value2 = ''
      }
      setLoader(true)
      AdminApis.getProductByLinkName(params?.storeId, value2).then(
        (response) => {
          if (response?.data) {
            setData(response?.data?.data)
            setMarketInfo(response?.data?.data?.market_info)
            setLoader(false);
          }
        }
      ).catch(function (error) {
        console.log(error.response.data);
      })

    }, [data, loader, params]);



  return (
    <>

      <div className="flex justify-between md:px-20">
        {/* <span><img src="/images/image.png" /> </span> */}

        {marketInfo?.brand_logo == 'no image' || marketInfo?.brand_logo == null ?
          <span><img src="/images/image.png" /> </span>
          :
          <span><img src={marketInfo?.brand_logo} style={{ height: '50px', width: '70px' }} /></span>
        }

        {loader ?
          ''
          :
          <span style={{ borderColor: marketInfo?.brand_primary_color }} className={` font-bold text-[20px] capitalize mt-2 border-[${marketInfo?.brand_primary_color}] rounded-lg pt-1 px-2 border-[1px]`}>
            {(params?.storeId).replace("-", ' ')}
          </span>
        }





        {/* <span>djdjks</span> */}
        {/* <span><img src="/images/los.png" style={{ height: '30px' }} /></span> */}
      </div>
      <hr className=" mt-4 h-4" />

      {/* <div className="border border-[#D9D9D9] rounded md:mx-20 py-8 mt-5 px-10 flex gap-6">
        <span><img src="/images/los.png" /></span>
        <div className="flex flex-col ">
          <span className="text-[20px] font-[600]">Samodex Store</span>
          <div className="flex justify-start my-1">
            <span><img src="/images/locate.png" /></span>
            <span className="text-[#A9A9A9] text-[14px]">Abuja,Nigeria.</span>
          </div>
          <span className="text-[#A9A9A9] text-[14px]">A few descriptions of the product appears her just say anything but you know just say yada yada A few descriptions of the product appears her just say anything but you know just say yada yada .......</span>
        </div>
      </div> */}

      <div className=" mt-10 mb-4 md:px-16 ">


        {data?.products?.data?.length >= 0
          ?
          <div class="px-4 bg-white rounded-lg">


            <div className="  flex-col md:flex-row md:justify-start mt-1 pt-1 grid lg:grid-cols-3 md:grid-cols-2   gap-3">
              {data?.products?.data?.map(
                (data, index) => (

                  <>
                    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">

                      <NavLink to={`/storedetails/${(data?.id)}`} className={'cursor-pointer'}>
                        <p class="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] h-44" style={{ fontSize: '16px', color: '#595959', backgroundImage: `url(${data?.product_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}>{data?.link_info?.message}</p>
                      </NavLink>
                      <hr />

                      <div className="flex flex-col pt-[16px] px-[16px]">
                        <div className="flex justify-start">
                          <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span>
                        </div>
                        <div className="flex justify-start mt-2">
                          {/* <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span> */}
                          <span className="flex gap-2">
                            <span style={{ color: marketInfo?.brand_primary_color !== '' ? marketInfo?.brand_primary_color : '#0071BC', textDecorationLine: 'line-through' }} className={`text-[15px] font-[700]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.product_price)} </span>
                            <span style={{ color: marketInfo?.brand_primary_color !== '' ? marketInfo?.brand_primary_color : '#0071BC' }} className={`text-[15px] font-[400]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)} </span>

                          </span>
                          {/* <span className="text-[#149E49] text-[14px] font-[600]"> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)}</span> */}

                        </div>



                        <span className="text-[14px] font-[400] mt-3 text-[#808191] h-10 overflow-auto">{data?.product_description}</span>

                        <div className="flex justify-between py-3">

                          <NavLink to={`/storedetails/${data?.id}`}
                            style={{ backgroundColor: marketInfo?.brand_primary_color }}
                            className={"text-[10px] text-white py-1  flex cursor-pointer rounded-full px-2"}
                          >
                            <FaEye className="mt-[2px] mr-1" />  View Product
                          </NavLink>

                          <a target='_blank' href={`https://gupta-tkwuj.ondigitalocean.app/${data?.phone_number}`}
                            style={{ backgroundColor: marketInfo?.brand_primary_color }}
                            className={"text-[10px] text-white pt-1 pb-1  flex cursor-pointer bg-[" + (marketInfo?.brand_primary_color) + "] rounded-full px-2"}
                          >
                            <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
                          </a>

                          <span onClick={() => togglePaymentModal(data)}
                            style={{ backgroundColor: marketInfo?.brand_primary_color }}
                            className={"text-[10px] text-white pt-1 pb-1 flex cursor-pointer bg-[" + (marketInfo?.brand_primary_color) + "] rounded-full px-3"}
                          >
                            Pay with gupta
                          </span>
                        </div>

                      </div>


                      {/* <span className="flex justify-between gap-1 pt-4 m-2">
                               

                               
                              </span> */}
                    </div>
                  </>


                )
              )}





            </div>


            <div className=' m-4 mt-10 flex justify-end'>
              {
                data?.products?.links?.filter(((item, idx) => idx < 1000)).map(
                  (datas, index) => (
                    <button onClick={() => paginator(datas?.label == 'Next &raquo;' ? datas?.url.charAt(datas?.url.length - 1) : (datas?.label === '&laquo; Previous') ? datas?.url.charAt(datas?.url.length - 1) : datas?.label)} disabled={datas?.active} className={'mx-1 py-1 px-2 ' + (datas?.active == false ? 'bg-gray-300 text-black ' : `bg-[${marketInfo?.brand_primary_color !== '' ? (marketInfo?.brand_primary_color) : '#0071BC'}] text-white`)} style={{ backgroundColor: `${datas?.active == false ? 'rgb(209 213 219' : (marketInfo?.brand_primary_color !== '' ? (marketInfo?.brand_primary_color) : '#0071BC')}` }}>
                      {datas?.label == '&laquo; Previous' ? '< Previous' : (datas?.label === 'Next &raquo;') ? 'Next  >' : datas?.label}
                    </button>
                  )
                )
              }

            </div>


            <div className="  md:bottom-[0px] w-full  bottom-[-150px]">
              <div className="flex justify-center mt-4 w-full text-center lg:pb-2 pb-4">
                <div className="flex justify-center flex-col mt-3 mb-4  w-full text-center lg:pb-2 pb-4" >
                  {(marketInfo?.facebook_url || marketInfo?.instagram_url | marketInfo?.tiktok_url) ?
                    <span className="flex justify-center gap-4">
                      <a href={marketInfo?.facebook_url} target="_blank" className={'cursor-pointer'}>
                        <SvgElement type={icontypesEnum.FACEBOOK} />
                      </a>

                      <a href={marketInfo?.instagram_url} target="_blank" className={'cursor-pointer'}>
                        <SvgElement type={icontypesEnum.INSTAGRAM} />
                      </a>


                      <a href={marketInfo?.tiktok_url} target="_blank" className={'cursor-pointer'}>
                        <SvgElement type={icontypesEnum.TWITTER} />
                      </a>

                      {/* <SvgElement type={icontypesEnum.INSTAGRAM} />
                    <SvgElement type={icontypesEnum.TWITTER} /> */}
                    </span>
                    :
                    ''
                  }

                  <span style={{ fontSize: '16px', fontWeight: '300' }}>Powered By Gupta</span>
                </div>
              </div>
            </div>


          </div>


          :

          (loader ?
            <div className="px-4 flex justify-center mt-[30vh] ">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#0071BC"
                secondaryColor="#0071BC"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
            :
            <div className="px-4 flex justify-center mt-[30vh] bg-white border shadow-lg rounded-lg ">

              <span className="p-10 flex justify-center">Link does not exist</span>


              <div className="flex justify-center mt-3 mb-4" >
                <span style={{ fontSize: '16px', fontWeight: '300' }}>Powered By Gupta</span>
              </div>

            </div>

          )






        }



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


                <label
                  className="flex justify-start  mb-2 pt-1 text-md font-bold text-black"
                >
                  You are about to pay for <br />{value?.product_name}
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
                      style={{ backgroundColor: `${marketInfo?.brand_primary_color !== '' ? (marketInfo?.brand_primary_color) : '#0071BC'}`, borderRadius: '50px' }}
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
        position="top-right"
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
