import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEye } from "react-icons/fa";
import CardNavBar from "./CardNavBar";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal';
import CardPageVisits from "./CardPageVisits"
import configs from "../../configs";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import CardRenewSubscription from "./CardRenewSubscription";



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
    AdminApis.getMultiLinks().then(
      (response) => {
        if (response?.data) {
          setdata(response?.data)
          setLoader(false);
          console.log(response?.data?.multi_link)
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
      AdminApis.deleteMultiLink(value).then(
        (response) => {
          if (response?.data) {
            console.log(response.data)
            setToggleDeleteModal(false)
            toast.success("MultiLink Deleted Successfully");
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
        const newContactList = data?.multi_link?.filter((data) => {
          return Object.values(data).join(" ")?.toLowerCase()?.includes(inputEl?.current?.value?.toLowerCase());
        });
        setSearchResult(newContactList);
      } else {
        setSearchResult(data?.multi_link);
      }
    }, [inputEl, searchTerm, searchResult, data]);





  return (
    <>


      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  md:py-1 p-1 border-0">
          <div className="bg-blue-100  rounded-lg ml-3 m-1 p-2 mb-3">
            <span className=" bg-blue-100  rounded-lg  text-gray-500 text-[12px]"><span className="mr-4 text-red-500 bg-red-200 p-1 px-3 rounded-full text-[15px]">!</span> Create a sleek webpage with multiple WhatsApp links. Personalize it with your brand logo and social media, enhancing customer engagement.</span>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full flex-grow flex-1">

              {data?.multi_link?.length ?
                <span className="flex justify-between" >
                  {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
                  <div class="relative invisible md:visible">
                    <input ref={inputEl} onChange={getSearchTerm} type="text" style={{ borderColor: '#0071BC' }} id="default-search" class="block p-4 pl-4 w-full h-4 text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-green-500 focus:border-green-500 " placeholder="Search " />
                    <svg aria-hidden="true" class="w-5 h-5 right-2.5 bottom-3 absolute text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>

                  <NavLink to='/create-multi-link' className="flex justify-center">
                    < span className="flex justify-center ">
                      <button
                        type="button"
                        style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                        className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
                      >
                        + Create New
                      </button>
                    </span>
                  </NavLink>
                </span>
                :
                ''
              }

              <div>
                {!loader ? (
                  (data?.multi_link?.length >= 1) ?
                    <div className="container flex-col md:flex-row md:justify-start mt-1 pt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                      {(inputEl?.current?.value?.length > 1 ? searchResult : data?.multi_link).map(
                        (data, index) => (
                          <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                            <span className="flex justify-between gap-3 rounded-t-lg border bg-[#0071BC] px-3 py-1" >
                              <p class="mb-2 font-medium tracking-tight text-white" style={{ fontSize: '18px' }}>mygupta.co/{data?.name}</p>
                              < span className="flex justify-center mt-2">
                                <CopyToClipboard text={`${configs?.baseRedirectFront}${(data?.name)}`}
                                  onCopy={() => isCopied()}>
                                  <span
                                    style={{ color: 'white', borderColor: '#0071BC' }}
                                    className="ring-1 cursor-pointer outline-none font-xs rounded-lg text-xs px-3 h-4  text-center "
                                  >
                                    Copy
                                  </span>
                                </CopyToClipboard>
                              </span>
                            </span>

                            <NavLink to={`/update-multi-link/${data?.id}`}>
                              <p class="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] flex justify-center cursor-pointer" style={{ fontSize: '16px', color: '#595959' }}><span className="py-10 text-xl" style={{ fontWeight: '600' }}>View Link Details</span>  </p>
                            </NavLink>
                            <span className="flex justify-between gap-1 pt-4 m-2">
                              <span className="flex justify-start gap-1">
                                <span
                                  style={{ color: 'white' }}
                                  className="ring-1 outline-none bg-[#149E49] font-xs rounded-lg text-xs px-4 h-5 pt-[2px] text-center cursor-pointer"
                                >
                                  Active
                                </span>


                              </span>



                              < span className="flex justify-end gap-1 ">





                                <NavLink to={`/update-multi-link/${data?.id}`} className='px-2 py-2'>
                                  <FaEye />
                                </NavLink>


                                <button
                                  type="button"
                                  onClick={(e) => toggleDelete(data?.id)}
                                  className=" outline-none  font-xs text-red-500 rounded-full text-xs px-2 py-2 text-center "
                                >
                                  <FaTrash />
                                </button>
                              </span>
                            </span>
                          </div>



                        )
                      )}
                    </div>
                    :

                    (data?.data == 'sub_expired' ?
                      <CardRenewSubscription />
                      :
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
                        <div className="rounded-t mb-0  py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 max-w-full p-52 flex-grow flex-1">

                              <h3 className="flex justify-center font-bold"> You haven’t created any Link</h3>
                              <p className="flex text-sm justify-center"> Click on the button below to create a new </p>
                              <p className="flex text-sm justify-center text-black font-bold"> Link.</p>

                              <NavLink to='/create-multi-link' className="flex justify-center">
                                < span className="flex justify-center pt-4">
                                  <button
                                    type="button"
                                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                                    className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
                                  >
                                    + Create New
                                  </button>
                                </span>
                              </NavLink>

                            </div>

                          </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                          {/* Projects table */}

                        </div>
                      </div>)
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
            <span className="flex justify-end p-3">
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
                      style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                      className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
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
                      Delete Multi Link
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
