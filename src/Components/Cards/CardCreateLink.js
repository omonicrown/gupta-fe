
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

// components



export default function CardCreateLink() {
  const navigate = useNavigate();


  let [visible, setVisible] = React.useState(false);
  let [visible2, setVisible2] = React.useState(false);
  let [visible3, setVisible3] = React.useState(false);
  let [value, setvalue] = React.useState(false);

  function toggleModal() {
    setVisible(!visible)
  }

  function toggleModal2() {
    setVisible2(!visible2)
  }

  function toggleModal3() {
    setVisible3(!visible3)
  }


  function toggleCloseModal() {
    setVisible(!visible)
    navigate('/mylinks');
  }

  function isCopied() {
    toast.success("Copied to Clipard");
  }
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');
  const [slicedLink, setSlicedLink] = useState('');
  const [data, setData] = useState('');
  const [nameExist, setNameExist] = useState('');
  const [type, setType] = useState('message');

  const selectEmoji = React.useCallback(
    (e) => {
      setMessage(message + (e.emoji))
      setVisible2(false)
    },
    [message]
  );

  React.useEffect(() => {
   
    AdminApis.searchName({'name':name}).then(
      (response) => {
        if (response?.data) {
          setNameExist(response?.data?.data)
        }
      }
    );

  }, [name,nameExist]);

  // const str = "B72 1JL";

  // Replacing " " (space) to "" empty space
  // const res = str.replace(/ /g, '')
  // console.log(res); // BJ721JL


  // How to access the redux store
  const userLoginData = useSelector((state) => state.data.login.value);

  // This is used to update the store
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()

      formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber).replace(/ /g, ''))
      formData.append('name', name.replace(/ /g, ''))
      formData.append('message', message?.replace(/[\n\r]+/g, "."))
      {
        type === 'message' ?
          AdminApis.createLink(formData).then(
            (response) => {
              // console?.log(response)
              if (response?.data) {
                setData(response?.data)
                setSlicedLink((response?.data?.link?.name))

                navigate('/mylinks');
                // if(response?.data?.errors){
                //   // toggleModal3()
                //  // toast.error(response?.data?.message);
                // }else{
                //   // toggleModal()
                // }

              } else{
                toast.error(response?.response?.data?.message)
              }

              // toast.success(response?.data?.message);
            }
          ).catch(function (error) {
            // handle error
            console.log(error);
            toast.error(error?.data?.message);
          })
          :

          AdminApis.createCatalog(formData).then(
            (response) => {
              if (response?.data) {
                setData(response?.data)
                setSlicedLink((response?.data?.link?.name))
                navigate('/mylinks');
                // if(response?.data?.error  == 1){
                //   toast.error(response?.data?.message);
                // }else{
                //   // toggleModal()
                // }
               

              } else {
                toast.error('link name already in use');
              }
            }
          ).catch(function (error) {
            toast.error("Offfline");
          }).finally(() => {
            //toast.error("No Internet Connection");

          })
      }
    },
    [phone, message, name, type,visible3,visible,visible2]
  );

  console.log(name)

  // console.log((data?.url).slice(8))
  return (
    <>

      <div className="pb-32 sm:px-5">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-1">

          <div className=" ">
          
            <div className="rounded-lg px-6 pb-4 pt-6 border border-[#D9D9D9] shadow-md mt-6">
              <form onSubmit={handleSubmit} className=" ">
              <span className="font-bold text-[20px]">Create a Named gupta.ink</span>
                <div className="mb-4 mt-6">
                  <label
                    htmlFor="name"
                    className="flex justify-start  mb-2 text-sm  text-gray-600 "
                  >
                    Name
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="brand"
                      name="name"
                      className="flex w-80 justify-center shadow-sm bg-[#F4FBFF]  text-gray-900 text-sm rounded-lg p-2.5 "
                      placeholder="Name"
                      defaultValue={name}
                      onChange={(e) => setName(e?.target?.value)}
                      required={true}
                    />
                     <div class=" absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-1">
                     
                      <svg aria-hidden="true" class="w-5 h-5 text-[#0071BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                  </div>
                  {(nameExist > 0) ? <span className="text-xs text-red-500">Name already exist</span>: (name ==='') ? '':<span className="text-xs text-green-500">Name Available</span>}
                  <label
                    htmlFor="email"
                    className="flex justify-start text-sm font-medium pt-2 text-gray-700 "
                  >
                   
                   <b>gupta.ink/{name.replace(/ /g, '')}</b> 
                  </label>
                </div>
                {/* <CountryDropdown  id="UNIQUE_ID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" preferredCountries={['gb', 'us']}  value="" handleChange={e => console.log(e.target.value)}></CountryDropdown>    */}


                <div className="mb-3">
                  <label
                    htmlFor="number"
                    className="flex justify-start mb-2 text-sm font-sm text-gray-500 "
                  >
                    Your Whatsapp phone number
                  </label>
                  <PhoneInput
                    style={{ backgroundColor: '#F4FBFF' }}
                    disabled={false}
                    // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhone}
                    placeholder={'Enter Mobile Number'}
                  />

                </div>


                <div className="mb-4 mt-4 flex justify-start gap-2">
                <label for="default-radio-1" class=" text-sm " style={{color:'#616161'}}>Link type:</label>
                  <div class=" flex justify-center">
                    <input checked={type == 'message'?true : false} id="default-radio-1" type="radio" value="message" onClick={(e) => setType(e?.target?.value)} name="default-radio" class="w-4 h-4 mt-1 text-green-600 bg-green-100 border-green-700 " />
                    {/* <input type="radio" id="default-radio-1" style={{ color: 'green' }} value="message" onClick={(e) => setType(e?.target?.value)} name="default-radio" class="w-4 h-4 pt-2 text-green-600 bg-green-100 border-green-700 " /> */}
                    <label for="default-radio-1" class="ml-2 text-sm  text-gray-400 ">Message</label>
                  </div>

                  <div class="flex justify-center ">
                    <input id="default-radio-2" type="radio" value="catalog" name="default-radio" onClick={(e) => setType(e?.target?.value)} class="w-4 h-4 mt-1 text-green-600 bg-gray-100 border-green-300  " />
                    <label for="default-radio-2" class="ml-2 text-sm  text-gray-400 ">Catalog</label>
                  </div>

                </div>

                <div className="mb-6 ">
                  <label
                    htmlFor="number"
                    className="flex justify-start mb-2 text-sm font-sm text-gray-500 "
                  >
                    Pre-filled message
                  </label>

                  <label
                    htmlFor="number"
                    onClick={toggleModal2}
                    className="flex justify-start mb-2 text-sm font-sm text-gray-500 cursor-pointer"
                  >
                    😊 Add emoji
                  </label>

                  <textarea id="message" disabled={type !== 'message'?true : false} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-[#F4FBFF] rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Add a pre-filled message that users will send to you." style={{ backgroundColor: '#F4FBFF' }} onChange={(e) => setMessage(e?.target?.value)} value={message}></textarea>


                </div>

                {(type === '' || type === 'message') ? '' :

                  <span class="block p-3 max-w-xs bg-red-100 rounded-lg border border-gray-200 shadow-md hover:bg-gray-10 mb-3">
                    <p class="text-red-400 text-sm flex gap-2 pb-1" style={{ fontStyle: 'Inter' }}><AiOutlineWarning style={{ marginTop: '3px' }} /> Warning</p>
                    <p class="text-gray-600 text-xs" style={{ fontStyle: 'Inter' }}>Before creating your link, confirm that you have an active WhatsApp Business catalog.</p>
                  </span>

                }

                <span className="flex justify-center">
                  <button
                    type="submit"
                    disabled={nameExist === 1 ? true : false}
                    style={{ backgroundColor: (nameExist === 1 ? 'grey' : '#0071BC') }}
                    className=" text-white hover:bg-blue-800 font-medium rounded-[10px] text-sm w-full px-2 py-2.5 text-center "
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
          height="250"
          effect="fadeInUp"
          onClickAway={() => toggleModal}
        >


          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <div className="container flex flex-row justify-center bg-[#fff] items-center rounded-lg p-1">

              <div className=" ">
               

                <div className="">
                  <form onSubmit={handleSubmit} className=" rounded-lg p-4 ">
                    <span className="flex justify-between">
                      <h1 className=" text-xs text-black font-bold pt-3" style={{ fontSize: '15px' }}>Congratulations</h1>
                      <p className="cursor-pointer " onClick={toggleModal}><SvgElement type={icontypesEnum.CANCEL} /></p>
                    </span>

                    <label
                    style={{fontSize:'14px'}}
                      className="flex justify-start mb-2 pt-2 text-xs font-bold text-black"
                    >
                      You are the owner of gupta.ink/{slicedLink}
                    </label>

                    <label
                    style={{fontSize:'14px'}}
                      className=" mb-2 pt-2 text-xs text-gray-600"
                    >
                      There are <b className="text-black">6 links</b> in your plan. You have already used <b className="text-black">{data?.created}</b>, you can create <b className="text-black">{6 - data?.created}</b> additional link(s).
                    </label>

                    <span className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={toggleCloseModal}
                        style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
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






      <section>
        <Modal
          visible={visible3}
          width="320"
          height="220"
          effect="fadeInUp"
          onClickAway={() => toggleModal3}
        >
            <div className="container flex justify-center bg-[#fff] items-center rounded-lg p-1 pt-3">
                <div className="">
                    <span className="flex justify-between">
                      <h1 className=" text-xs text-black font-bold pt-3" style={{ fontSize: '15px' }}>That’s all</h1>
                      <p className="cursor-pointer " onClick={toggleModal3}><SvgElement type={icontypesEnum.CANCEL} /></p>
                    </span>

                    <label
                    style={{fontSize:'14px'}}
                      className="flex justify-start mb-2 pt-2 text-xs font-bold text-black"
                    >
                     You have used up all your free named links
                    </label>

                    

                    <label
                    style={{fontSize:'14px'}}
                      className=" mb-2  block pt-2 text-xs text-gray-600"
                    >
                      Upgrade to a Pro Plan to access more links.
                    </label>

                    <span className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={toggleModal3}
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                      > <NavLink to='/proplan'>
                        View Pro Plans
                        </NavLink>
                      </button>
                    </span>

                    <p className="flex justify-center text-gray-500 pt-3 text-xs font-xs cursor-pointer" onClick={toggleModal3}>Cancel</p>

                </div>
              
            </div>

         
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
                 
                    <p className="cursor-pointer " onClick={toggleModal2}><SvgElement type={icontypesEnum.CANCEL} /></p>
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
