
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducer/loginSlice'
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { AuthLiveApis } from "../../apis/live/authLiveApis";
import { AuthApis } from "../../apis/authApis";
import { store } from "../../store/store";
import { History } from "history";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbars/Navbar";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


// components



export default function CardCreateLink() {
  const params = useParams();

  const linkid = params?.linkId;


  let [visible, setVisible] = React.useState(false);
  let [value, setvalue] = React.useState(false);

  function toggleModal() {
    setVisible(!visible)
  }

  function isCopied() {
    toast.success("Copied to Clipard");
  }
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');
  const [slicedLink, setSlicedLink] = useState('');
  const [data, setData] = useState('');
  const [disablePreview, setDisablePreview] = useState(true);

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state) => state.data.login.value);

  // This is used to update the store
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()

       formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber))
      // formData.append('name', name)
      formData.append('message', message)
      AdminApis.createLink(formData).then(
        (response) => {
          if (response?.data) {
            console.log(response.data)
            setData(response?.data)
            setSlicedLink((response?.data?.link?.name))
            toggleModal()
          }

          // toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error
        console.log(error.response.data);
        toast.error("Offfline");
      }).finally(() => {
        //toast.error("No Internet Connection");

      });
    },
    [phone, message,name]
  );

  // console.log((data?.url).slice(8))
  return (
    <>
   
      <div className="pb-32 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className=" ">
           

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="pb-4 rounded-lg p-8 border-gray-200 border-2">

                <div className="mb-4 ">
                  <label
                    htmlFor="name"
                    className="flex justify-start block mb-2 text-sm font-medium text-gray-400 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="name"
                    className="flex w-80 justify-center shadow-sm bg-gray-50 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                    placeholder="Name"
                    defaultValue={name}
                    onChange={(e) => setName(e?.target?.value)}
                    required={true}
                  />

                  <label
                    htmlFor="email"
                    className="flex justify-start block  text-sm font-medium pt-2 text-gray-700 "
                  >
                    uforo.link/{name}
                  </label>
                </div>
                {/* <CountryDropdown  id="UNIQUE_ID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" preferredCountries={['gb', 'us']}  value="" handleChange={e => console.log(e.target.value)}></CountryDropdown>    */}


                <div className="mb-6 ">
                  <label
                    htmlFor="number"
                    className="flex justify-start block mb-2 text-sm font-sm text-gray-500 "
                  >
                    Your whatsapp phone number
                  </label>
                  <PhoneInput
                    style={{ backgroundColor: '#F5F5F5' }}
                    disabled={false}
                    containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhone}
                    placeholder={'Enter Mobile Number'}
                  />

                </div>


                <div className="mb-6 flex justify-start gap-2">
                <label for="default-radio-1" class="ml-2 text-sm  text-gray-400 ">Link Type:</label>
                  <div class=" flex justify-center ">
                    <input type="radio" style={{color:'green'}} value="" name="default-radio" class="w-4 h-4 pt-2 text-green-600 bg-green-100 border-green-700 " />
                      <label for="default-radio-1" class="ml-2 text-sm  text-gray-400 ">Message</label>
                 
                  </div>
                  
                  <div class="flex justify-center ">
                    <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-green-300  " />
                      <label for="default-radio-2" class="ml-2 text-sm  text-gray-400 ">Catalog</label>
                  </div>

                </div>

                <div className="mb-6 ">
                  <label
                    htmlFor="number"
                    className="flex justify-start block mb-2 text-sm font-sm text-gray-500 "
                  >
                    pre-filled message
                  </label>

                  <textarea id="message" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Add a pre-filled message that users will send to you." style={{ backgroundColor: '#F5F5F5' }} onChange={(e) => setMessage(e?.target?.value)}></textarea>


                </div>




                <span className="flex justify-center">
                  <button
                    type="submit"

                    style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                    className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                  >
                    Create link
                  </button>
                </span>
               
              </form>





            </div>
          </div>
        </div>
        {/* <button
                 
                  onClick={getdata}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  getData
                </button> */}
      </div>



      <section>
        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => toggleModal}
        >


          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-4">

              <div className=" ">
                <div className=" ">


                </div>

                <div className="mt-2">
                  <form onSubmit={handleSubmit} className="pb-4 rounded-lg p-4  ">
                    <span className="flex justify-between">
                      <h1 className=" text-xs text-black font-bold" style={{ fontSize: '15px' }}>Congratulations</h1>
                      <p className="cursor-pointer font-bold" onClick={toggleModal}>X</p>
                    </span>

                    <label
                      className="flex justify-start block mb-2 pt-2 text-xs font-bold text-black"
                    >
                      You are the owner of wa.uforo.link/{slicedLink}
                    </label>

                    <label
                      className="flex justify-start block mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                     There are 2 links in your plan, you have already use 1, you can create 1 additional link
                    </label>

                    <span className="flex justify-center pt-4">
                      <button
                        type="submit"

                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                      >
                        Confirm
                      </button>
                    </span>

                    <p className="flex justify-center text-gray-500 pt-3 text-xs font-xs cursor-pointer" onClick={toggleModal}>Cancel</p>


                  </form>

                </div>
              </div>
            </div>
          
          </div>
        </Modal>
      </section>
    </>
  );
}
