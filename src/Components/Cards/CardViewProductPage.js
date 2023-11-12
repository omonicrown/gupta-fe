
import React, { useState } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';
import { useParams } from 'react-router-dom';
import configs from "../../configs";
import { FaWhatsapp, FaEye } from "react-icons/fa";

import { Image } from '../../Components/assets/img/image.png'
// components

export default function CardViewProductPage() {

  const [images, setImages] = React.useState('');
  const maxNumber = 69;

  const params = useParams();



  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const [data, setData] = React.useState([]);



  React.useEffect(() => {
    AdminApis.getProductByLinkName(params?.storeId).then(
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

          // response?.data?.data?.attachLinks?.map(
          //   (data, index) => (
          //     permissionDropdownChange2(data?.attach_links)
          //   ))
        }
      }).catch(function (error) {
        console?.log(error)

        // toast.error("Offfline");
      })

      ;

  }, []);

  console?.log(data)


  return (
    <>

      <div className="flex justify-between md:px-20">
        <span><img src="/images/image.png" /> </span>
        {/* <span>djdjks</span> */}
        <span><img src="/images/los.png" style={{ height: '30px' }} /></span>
      </div>

      <div className="border border-[#D9D9D9] rounded md:mx-20 py-8 mt-5 px-10 flex gap-6">
        <span><img src="/images/los.png" /></span>
        <div className="flex flex-col ">
          <span className="text-[20px] font-[600]">Samodex Store</span>
          <div className="flex justify-start my-1">
            <span><img src="/images/locate.png" /></span>
            <span className="text-[#A9A9A9] text-[14px]">Abuja,Nigeria.</span>
          </div>
          <span className="text-[#A9A9A9] text-[14px]">A few descriptions of the product appears her just say anything but you know just say yada yada A few descriptions of the product appears her just say anything but you know just say yada yada .......</span>
        </div>
      </div>

      <div className=" mt-10 md:px-16">


        {data?.length >= 1
          ?
          <div class="px-4 bg-white rounded-lg">


            <div className=" flex-col md:flex-row md:justify-start mt-1 pt-1 grid lg:grid-cols-4 md:grid-cols-2   gap-3">
              {data?.map(
                (data, index) => (

                  <>
                    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">

                      <NavLink to={`/storedetails/${data?.id}`} className={'cursor-pointer'}>
                        <p class="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] h-44" style={{ fontSize: '16px', color: '#595959', backgroundImage: `url(${data?.product_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}>{data?.link_info?.message}</p>
                      </NavLink>
                      <hr />

                      <div className="flex flex-col pt-[16px] px-[16px]">
                        <div className="flex justify-between">
                          <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span>
                          <span className="text-[#0071BC] text-[20px] font-[700]">NGN {data?.product_price}</span>
                        </div>


                        <span className="text-[14px] font-[400] text-[#808191] h-10 overflow-auto">{data?.product_description}</span>

                        <div className="flex justify-start gap-3 py-3">

                          <NavLink to={`/storedetails/${data?.id}`}
                            className=" text-[10px] text-white py-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"
                          >
                            <FaEye className="mt-[2px] mr-1" />  View Product
                          </NavLink>

                          <a target='_blank' href={`http://localhost:8000/${data?.phone_number}`}
                            className=" text-[10px] text-white pt-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"
                          >
                            <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
                          </a>
                        </div>

                      </div>


                      {/* <span className="flex justify-between gap-1 pt-4 m-2">
                               

                               
                              </span> */}
                    </div>
                  </>


                )
              )}
            </div>



            <div className="flex justify-center mt-3 mb-4" >
              <span style={{ fontSize: '16px', fontWeight: '300' }}>Powered By Gupta</span>
            </div>
          </div>

          :

          <div class="px-4 mt-[30vh] bg-white border shadow-lg rounded-lg ">
            <span className="p-10 flex justify-center">Link does not exist</span>


            <div className="flex justify-center mt-3 mb-4" >
              <span style={{ fontSize: '16px', fontWeight: '300' }}>Powered By Gupta</span>
            </div>

          </div>




        }



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
