import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import CardNavBar from "./CardNavBar";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal';
import configs from "../../configs";
import CardPageVisits from "./CardPageVisits";
import { SvgElement, icontypesEnum } from "../assets/svgElement";


// components

export default function CardMyLinks() {


  let [visible, setVisible] = React.useState(false);
  let [toggleDeleteModal, setToggleDeleteModal] = React.useState(false);
  let [value, setvalue] = React.useState('');
  let [contact, setContact] = React.useState('');
  let [effect, setEffect] = React.useState('');

  console?.log(value)

  function toggleModal(value2, contact) {
    setvalue(value2)
    setContact(contact)
    setVisible(!visible)
  }

  function toggleDelete(value2) {
    setvalue(value2)

    setToggleDeleteModal(!visible)
  }
  // console.log(contact)

  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  // console.log(message)


  const [loader, setLoader] = React.useState(true);
  function isCopied() {
    toast.success("Copied to Clipboard");
  }

  let [data, setdata] = React.useState([]);

  React.useEffect(() => {
    setLoader(true);
    setEffect('')
    AdminApis.getAllLinks().then(
      (response) => {
        if (response?.data) {
          setdata(response?.data)
          setLoader(false);
          // window.location.reload();
          //console.log(response?.data)
        }
      }
    );

  }, [effect]);


  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      console?.log(message)
      data = {
        'message': message,
        'id': value?.id,
        'name': value?.name,
        'phone_number': value?.link_info?.phone_number
      }
      AdminApis.editLink(data).then(
        (response) => {
          if (response?.data) {
            console.log(response.data)
            setVisible(false)
            setEffect('v')
            toast.success(response?.data?.message);
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
    [value, message, contact, name]
  );

  const deleteLink = React.useCallback(
    (e) => {
      e.preventDefault();
      AdminApis.deleteLink(value).then(
        (response) => {
          if (response?.data) {
            console.log(response.data)
            setToggleDeleteModal(false)
            toast.success("Link Deleted Successfully");
            setEffect('d')
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
    [value, message, effect]
  );

  const [searchTerm, setSearchTerm] = React.useState("");
  const inputEl = React.useRef("");
  const [searchResult, setSearchResult] = React.useState([]);

  const getSearchTerm = React.useCallback(
    () => {
      console.log(inputEl.current.value);
      setSearchTerm(inputEl.current.value);
      if (searchTerm !== "") {
        const newContactList = data?.link?.filter((data) => {
          return Object.values(data).join(" ")?.toLowerCase()?.includes(inputEl?.current?.value?.toLowerCase());
        });
        setSearchResult(newContactList);
      } else {
        setSearchResult(data?.link);
      }
    }, [inputEl, searchTerm, searchResult, data]);






  return (
    <>


      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  md:py-3 p-1 border-0">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full flex-grow flex-1">

              {data?.link?.length ?
                <span className="flex justify-between" >
                  {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
                  <div class="relative invisible md:visible">
                    <input ref={inputEl} onChange={getSearchTerm} type="text" id="default-search" class="block p-2.5 pl-4 w-full text-sm text-gray-900 bg-[#F4FBFF] rounded-lg border border-[#D9D9D9] " placeholder="Search Link" />
                    <svg aria-hidden="true" class="w-5 h-5 right-2.5 bottom-3 absolute text-[#A9A9A9] " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>

                  <NavLink to='/createlink' className="flex justify-center">
                    < span className="flex justify-center ">
                      <button
                        type="button"
                        className=" text-white font-medium bg-[#0071BC] rounded-[5px] text-sm px-5 py-2.5 text-center "
                      >
                        Create New +
                      </button>
                    </span>
                  </NavLink>
                </span>
                :
                ''
              }



              <div className="pt-5">
                {!loader ? (
                  (data?.link?.length >= 1) ?
                    <div className="container flex-col md:flex-row md:justify-start mt-1 pt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                      {(inputEl?.current?.value?.length > 1 ? searchResult : data?.link).map(
                        (data, index) => (

                          <>
                            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                              <span className="flex justify-between gap-3 rounded-t-lg border-none bg-[#0071BC] px-3 py-1" >
                                <p class="mb-2 font-medium tracking-tight text-white" style={{ fontSize: '18px' }}>gupta.ink/{data?.name} </p>
                                <div>
                                  <CopyToClipboard text={`${configs?.baseRedirect}/${(data?.name)}`}
                                    onCopy={() => isCopied()}>
                                    <h3 className="text-white text-xs mt-1.5 border border-[#fff] py-1 px-3 rounded-full cursor-pointer">Copy</h3>
                                  </CopyToClipboard>
                                </div>
                                {/* < span className="flex justify-center mt-2">
                                  <CopyToClipboard text={`gupta.ink/${(data?.name)}`}
                                    onCopy={() => isCopied()}>
                                    <span
                                     
                                      className="border border-white cursor-pointer font-xs rounded-full text-xs text-white px-3 py-1  text-center "
                                    >
                                      Copy
                                    </span>
                                  </CopyToClipboard>
                                </span> */}
                              </span>
                              <NavLink to={`/link-details/${data?.id}`} className={'cursor-pointer'}>
                                <span className="flex justify-between gap-2 m-2 ">
                                  <p class="mb-2 tracking-tight text-gray-900 font-medium" style={{ fontSize: '16px' }}>{(data?.link_info?.phone_number)?.replace(/ /g, '')}  </p>
                                  {/* <p class=" text-xs tracking-tight font-bold text-gray-900" style={{ fontSize: '16px' }}> .</p> */}
                                  <p class="tracking-tight font-bold " style={{ color: '#149E49', fontSize: '16px', paddingTop: '1px' }}> {data?.short_url?.visits?.filter(visit => visit?.operating_system !== '0').length ? data?.short_url?.visits?.filter(visit => visit?.operating_system !== '0').length : '0'} click(s)</p>
                                </span>
                                <div className="bg-[#F4FBFF] mx-2 rounded-[5px]">
                                  <p class="mb-2 tracking-tight m-2 py-2 pl-1  h-20 text-[#A9A9A9]">{data?.link_info?.message}</p>
                                </div>

                              </NavLink>
                              <span className="flex justify-between gap-1  m-2">
                                <span className="flex justify-start gap-1 pt-3">
                                  <span
                                    style={{ color: 'white' }}
                                    className=" bg-[#149E49] font-xs rounded-full text-xs px-4 h-5 pt-[2px] text-center cursor-pointer"
                                  >
                                    Active
                                  </span>

                                  {data?.type === 'catalog' ?
                                    <span
                                      style={{ borderColor: '#61A24F' }}
                                      className=" bg-blue-100 text-blue-800 outline-none font-xs rounded-lg text-xs px-4 h-5 pt-[2px] text-center "
                                    >
                                      Catalog
                                    </span>

                                    :

                                    ''
                                  }
                                </span>



                                < span className="flex justify-end gap-1 ">

                                  <button
                                    type="button"
                                    style={{}}
                                    onClick={(e) => toggleModal(data)}
                                    className=" outline-none  font-xs rounded-full text-xs px-2  text-center "
                                  >
                                    {/* <FaEdit /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#0071bc" d="M6.414 15.89L16.556 5.748l-1.414-1.414L5 14.476v1.414h1.414Zm.829 2H3v-4.243L14.435 2.212a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 17.89ZM3 19.89h18v2H3v-2Z" /></svg>
                                  </button>


                                  <button
                                    type="button"
                                    onClick={(e) => toggleDelete(data?.id)}
                                    className=" outline-none  font-xs text-red-500 rounded-full text-xs px-2 py-2 text-center "
                                  >
                                    {/* <FaTrash /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#d00000" d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2h16Zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2h4Z" /></g></svg>
                                  </button>
                                </span>
                              </span>
                            </div>
                          </>


                        )
                      )}
                    </div>
                    :

                    <CardPageVisits />
                )

                  :

                  <div className="p-2  shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '70vh', width: '78vw' }}>
                    <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-400">

                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                    <div className="flex items-center mt-4 space-x-3">

                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                  //  :
                  //  <div>
                  //   <h2>Pending </h2>
                  //  </div>
                }








              </div>





            </div>

          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

        </div>
      </div>


      <section>
        <Modal
          visible={visible}
          width="400"
          height="400"
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
                  className="flex justify-start  mb-2 pt-2 text-md font-bold text-black"
                >
                  Edit User Message
                </label>

                <label
                  className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                >
                  User message
                </label>


                <form onSubmit={handleSubmit} className="pb-4 rounded-lg">
                  <div className="mb-6 ">
                    <textarea id="message" rows={3} defaultValue={value?.link_info?.message} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="User message" style={{ backgroundColor: '#F5F5F5' }} onChange={(e) => setMessage(e?.target?.value)}></textarea>
                  </div>

                  {/* <div className="mb-6 ">
                    <input id="message" type="text" defaultValue={value?.name} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="User message" style={{ backgroundColor: '#F5F5F5' }} onChange={(e) => setName(e?.target?.value)} />
                  </div> */}

                  <span className="flex justify-center pt-4">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                      className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Update
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



      <section>
        <Modal
          visible={toggleDeleteModal}
          width="350"
          height="430"
          effect="fadeInUp"
          onClickAway={() => setToggleDeleteModal(false)}
        >
          <div className=" " style={{ height: '100%', overflow: 'auto' }}>

            <div className="container flex flex-row justify-around bg-[#fff]  items-center rounded-lg p-2">

              <div className="px-3">

                {/* <span className="flex justify-around">
                    <h1 className=" text-xs text-red-600" style={{ fontSize: '10px' }}>Link can’t be edited in free plan. <span style={{ color: '#61A24F' }} className="font-bold text-xs">Upgrade to Pro</span></h1>
                  </span> */}
                <span className="flex justify-end px-2 pt-3">
                  <p className="cursor-pointer font-bold" onClick={(e) => setToggleDeleteModal(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
                </span>

                <label
                  className="flex justify-start mb-2 pt-1 text-md font-bold text-black"
                >
                  Delete Link
                </label>

                <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >
                  You are about to delete the link you created.


                </label>
                <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >


                  Please note that:
                </label>

                <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400 pl-2">
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }}>
                    The link will stop working.
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    All link data will be lost
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    The link name will be made available to others
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    Anyone who clicks the link will be redirected to gupta.link
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    If you used this link in your Tiered links, the button will stop working
                  </li>
                </ul>



                <form onSubmit={deleteLink} className="pb-4 rounded-lg">
                  <span className="flex justify-center pt-4">
                    <button
                      type="submit"
                      style={{ borderRadius: '50px', color: '#F52424' }}
                      className=" text-red-700 bg-red-200 focus:ring-4 focus:outline-none focus:ring-grredeen-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Delete Link
                    </button>
                  </span>

                  <span className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={(e) => setToggleDeleteModal(false)}
                      style={{ borderRadius: '50px' }}
                      className=" text-black   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-2 py-1.5 text-center "
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
