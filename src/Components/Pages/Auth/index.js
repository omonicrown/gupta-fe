import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../reducer/loginSlice'
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { AuthLiveApis } from "../../../apis/live/authLiveApis";
import { AuthApis } from "../../../apis/authApis";
import { store } from "../../../store/store";
import { History } from "history";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Navbars/Navbar";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../../assets/svgElement";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import EmojiPicker from 'emoji-picker-react';


function Login() {


  let [visible, setVisible] = React.useState(false);
  let [visible2, setVisible2] = React.useState(false);
  let [clipad, setClipad] = React.useState('');

  const handleCaptureClick = React.useCallback(async () => {
    const pricingTableElmt =
      document.querySelector('#container');
    // if (!pricingTableElmt) return;
    const canvas = await html2canvas(pricingTableElmt);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  }, []);


  function toggleModal() {
    setVisible(!visible)
  }

  function toggleModal2() {
    setVisible2(!visible2)
  }
  // let [show2, setShow2] = React.useState('hhhhh');
  function isCopied() {
    toast.success("Copied to Clipboard");
  }
  const [emoji, setEmoji] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [disablePreview, setDisablePreview] = useState(true);

  const selectEmoji = React.useCallback(
    (e) => {
      setMessage(message + (e.emoji))
      setVisible2(false)
    },
    [message]
  );

 // console.log(message)

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state) => state.data.login.value);

  // This is used to update the store
  const dispatch = useDispatch();

  function preview() {
    const formData = new FormData()
    formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber).replace(/ /g, ''))
    formData.append('message', message)
    console.log((phone?.phoneNumber).replace(/ /g, ''))
    AuthApis.createRandomLink(formData).then(
      (response) => {
        if (response?.data) {
          //setData(response?.data)
          // history.push("/home");
          window.open(response?.data?.url, '_blank', 'noopener,noreferrer');

          //console.log((response?.data?.url).slice(8))
          //navigate.push(response?.data?.url);
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
  }

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()

      formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber).replace(/ /g, ''))
      formData.append('message', message)
      AuthApis.createRandomLink(formData).then(
        (response) => {
          if (response?.data) {

            setData(response?.data)
            setClipad((response?.data?.url).slice(8))
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
    [phone, message, clipad]
  );




  return (
    <>
      <Navbar />
      <div className="pt-2 md:pt-3 pb-32 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className=" ">
            {/* <div className=" ">
              <h1 className=" my-2 flex justify-center text-xl font-semibold text-gray-900">Create a one-time random link</h1>
              <p className=" my-1 flex text-sm justify-center text-gray-900">No sign up is required</p>
              <p className=" my-1 flex text-sm justify-center text-gray-500">Example: https://uforo.link/V9kO4</p>

            </div> */}

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="pb-4 rounded-lg p-8 border-gray-200 border-2">
                <div className="mb-3 ">
                  <label
                    htmlFor="number"
                    style={{ color: '#616161' }}
                    className="flex justify-start mb-2 text-sm font-sm"
                  >
                    Your Whatsapp phone number
                  </label>
                  <PhoneInput
                    // style={{ backgroundColor: '#F5F5F5' }}
                    disabled={false}
                    // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhone}
                    // defaultValue={ phone?.length > 1 ? (phone?.countryCode + phone?.phoneNumber).replace(/[^\d\+]/g,'') : ''}
                    placeholder={'Enter Mobile Number'}
                  />

                </div>

                <div className="mb-6">
                  <label
                    htmlFor="number"
                    style={{ color: '#616161' }}
                    className="flex justify-start mb-2 text-sm font-sm"
                  >
                    Pre-filled message
                  </label>

                  <label
                    htmlFor="number"
                    className="flex justify-start mb-2 text-sm font-sm text-black cursor-pointer"
                    onClick={toggleModal2}
                  >
                    😊 Add emoji
                  </label>

                  <textarea id="message" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Add a pre-filled message that users will send to you." style={{ backgroundColor: '#F5F5F5' }} onChange={(e) => setMessage(e?.target?.value)} value={message}></textarea>

                  <label
                    htmlFor="number"
                    className="flex justify-start mb-2 pt-2 text-xs text-gray-400 "
                  >
                    Example: “Hi. Kindly send me the ebook”
                  </label>
                </div>

                < span className="flex justify-center">

                  <button
                    type="button"
                    onClick={preview}
                    style={{ backgroundColor: (disablePreview ? '#DFDFDF' : '#61A24F'), borderRadius: '50px' }}
                    className="text-black disabled:text-gray-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                  >
                    Preview
                  </button>
                </span>

                <div className=" py-3 flex justify-center">
                  <label
                    htmlFor="password"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400"
                  >
                    Or
                  </label>
                </div>

                <span className="flex justify-center">
                  <button
                    type="submit"
                    onClick={null}
                    style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                    className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                  >
                    Generate my wa.uforo.link
                  </button>
                </span>
                <NavLink to='/register' className="flex justify-center">
                  <p className="ml-2 mt-3 text-sm font-medium text-gray-400 ">Don't have an account? <a href="#" className="text-green-600 hover:underline ">Create one</a></p>
                </NavLink>
              </form>

              <form onSubmit={handleSubmit} className=" mt-8 pt-4 rounded-lg p-8 border-gray-200 border-2">
                <div className="mb-6 ">
                  <label
                    htmlFor="number"
                    style={{ color: '#616161' }}
                    className="flex justify-start mb-2 text-sm "
                  >
                    Your brand name
                  </label>
                  <input
                    type="text"
                    id="email"
                    className=" shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                    placeholder="Your brand name"
                    // defaultValue={phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    required={true}
                  />
                </div>

                <NavLink to='/register' >
                  <span className="flex justify-center">
                    <button
                      type="button"
                      style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                      className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Sign up
                    </button>
                  </span>
                </NavLink>

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
          height="700"
          effect="fadeInUp"
        // onClickAway={() => toggleModal}
        >


          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

              <div className="mt-1">
                <div className="pb-4 rounded-lg p-1">
                  <span className="flex justify-between">
                    <h1 className=" text-xs text-gray-600 font-xs" style={{ fontSize: '14px' }}>Your WhatsApp Click-To-Chat link</h1>
                    <p className="cursor-pointer font-bold" onClick={toggleModal}>X</p>
                  </span>


                  <label
                    className="flex justify-center mb-4 pt-2 text-sm font-bold text-gray-600"
                    style={{fontSize:'18px'}}
                  >
                    {data?.url?.slice(8)}
                  </label>

                  <span className="flex justify-center pb-2">
                    <button
                      type="submit"
                      onClick={null}
                      style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                      className=" text-white shadow-xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >


                      <CopyToClipboard text={clipad}
                        onCopy={() => isCopied()}>
                        <span className="flex justify-center"><SvgElement type={icontypesEnum.NEXT} /> <span className="pl-2"> Copy to clipboard</span></span>
                      </CopyToClipboard>


                    </button>
                  </span>

                  {/* <a href={data?.url}>
                    <span className="flex justify-center">
                      <span

                        style={{ backgroundColor: '#FFFFFF', borderRadius: '50px' }}
                        className="text-black hover:bg-green-800 ring-1 focus:outline-none ring-black font-medium border-black rounded-lg text-sm w-full px-2 py-2.5 text-center "
                      >
                        <span className="flex justify-center">
                          <SvgElement type={icontypesEnum.WHATSAPP} /> <span className="pl-2"> Open on WhasApp</span>
                        </span>
                      </span>
                    </span>
                  </a> */}


                  <span id="container">
                    <label
                      className="flex justify-start mb-4 pt-4 text-xs font-xs text-gray-600"
                      style={{ fontSize: '14px' }}
                    >
                      Your WhatsApp QR Code
                    </label>

                    <QRCode
                      size={256}
                      style={{ height: "200px", maxWidth: "100%", width: "100%" }}
                      value={(data?.url) ? (data?.url).slice(8) : "empty"}
                      viewBox={`0 0 256 256`}
                    />

                    {/* <span className=" text-white"> _</span> */}
                  </span>

                  <span className="flex justify-center mt-4">
                    <button
                      type="submit"
                      onClick={handleCaptureClick}
                      style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                      className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Download QR Code
                    </button>
                  </span>

                  <p className="mt-3 text-xs font-bold text-black pt-3 pb-1" style={{fontSize:'14px'}}> Want the link to have your brand/business name? Sign up for a free named link.<br/></p>
                  <span className="flex justify-start">
                    <SvgElement type={icontypesEnum.MARK} /> <p className="pl-2 text-xs text-gray-400" style={{fontSize:'14px'}}>Create named links</p>
                  </span>

                  <span className="flex justify-start">
                    <SvgElement type={icontypesEnum.MARK} /> <p className="pl-2 text-xs text-gray-400" style={{fontSize:'14px'}}>Save and view all created links</p>
                  </span>

                  <span className="flex justify-start">
                    <SvgElement type={icontypesEnum.MARK} /> <p className="pl-2 text-xs text-gray-400" style={{fontSize:'14px'}}>Track link clicks</p>
                  </span>

                  <NavLink to="/register">
                    <span className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={null}
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                      >
                        Sign up
                      </button>
                    </span>
                  </NavLink>

                  <p className="flex justify-center text-gray-500 pt-3 text-xs font-xs cursor-pointer" onClick={toggleModal}>Cancel</p>


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
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
        </Modal>
      </section>





      <section>
        <Modal
          visible={visible2}
          width="400"
          height="400"
          effect="fadeInUp"
        // onClickAway={() => toggleModal}
        >
          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">
              <div className="mt-1">
                <div className="pb-4 rounded-lg p-1">
                  <span className="flex justify-between">
                    <h1 className=" text-xs text-gray-600" style={{ fontSize: '10px' }}>Your WhatsApp Click-To-Click link</h1>
                    <p className="cursor-pointer font-bold" onClick={toggleModal2}>X</p>
                  </span>


                  <EmojiPicker
                    onEmojiClick={selectEmoji}
                  />
                </div>

              </div>

            </div>
           
          </div>
        </Modal>
      </section>


    </>
  );
}

export default Login;
