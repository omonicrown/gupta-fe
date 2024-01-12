import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit, FaWhatsapp } from "react-icons/fa";
import CardNavBar from "./CardNavBar";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal';
import CardPageVisits from "./CardPageVisits";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import { url } from "inspector";
import { store } from "../../store/store";
import { Oval } from 'react-loader-spinner'
import CardRenewSubscription from "./CardRenewSubscription";
import configs from "../../configs";


// components

export default function CardMiniStore() {


  let [visible, setVisible] = React.useState(false);
  let [toggleDeleteModal, setToggleDeleteModal] = React.useState(false);
  let [value, setvalue] = React.useState('');
  let [contact, setContact] = React.useState('');
  let [effect, setEffect] = React.useState('');

  // console?.log(value)

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



  const [loader, setLoader] = React.useState(true);
  function isCopied() {
    toast.success("Copied to Clipboard");
  }

  let [data, setdata] = React.useState([]);

  React.useEffect(() => {
    setLoader(true);
    setEffect('')
    AdminApis.getAllStore().then(
      (response) => {
        if (response?.data) {
          setdata(response?.data)
          setLoader(false);
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
            setEffect('')
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
      setLoader(true);
      AdminApis.deleteProduct(value).then(
        (response) => {
          if (response?.data) {
            console.log(response.data)
            setToggleDeleteModal(false)
            toast.success("Link Deleted Successfully");
            setLoader(false);
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
  const [searchResult, setSearchResult] = React.useState({sa:'32'});

  const getSearchTerm = React.useCallback(
    () => {
      console.log(inputEl.current.value);
      setSearchTerm(inputEl.current.value);
      if (searchTerm !== "") {
        const newContactList = data?.data?.filter((data) => {
          return Object.values(data).join(" ")?.toLowerCase()?.includes(inputEl?.current?.value?.toLowerCase());
        });
        setSearchResult(newContactList);
      } else {
        setSearchResult(data?.data);
      }
    }, [inputEl, searchTerm, searchResult, data]);


  console.log(searchResult?.length)



  return (
    <>


      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  md:py-3 p-1 border-0">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full flex-grow flex-1">

              {data?.data?.length ?
                <span className="flex justify-between" >
                  {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
                  <div class="relative  visible">
                    <input ref={inputEl} onChange={getSearchTerm} type="text" style={{ borderColor: '#0071BC' }} id="default-search" class="block p-4 pl-4 w-full h-4 text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-green-500 focus:border-green-500 " placeholder="Search " />
                    <svg aria-hidden="true" class="w-5 h-5 right-2.5 bottom-3 absolute text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>

                  <NavLink to='/createproduct' className="flex justify-center">
                    < span className="flex justify-center ">
                      <button
                        type="button"
                        style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                        className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-28 px-5 py-2.5 text-center "
                      >
                        + Add 
                      </button>
                    </span>
                  </NavLink>
                </span>
                :
                ''
              }



              <div>
                {!loader ? (
                  (searchResult?.length == 0 ?
                    <div className="p-2  shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '70vh', width: '78vw' }}>
                      <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-400">
                        <span>Empty Record</span>
                      </div>
                     
                    </div>
                    :
                    (data?.data?.length >= 1 && data?.data !== 'sub_expired') ?
                      <div className="container  flex-col md:flex-row md:justify-start mt-1 pt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                        {(inputEl?.current?.value?.length > 1 ? searchResult : data?.data)?.map(
                          (data, index) => (

                            <>
                              <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                                <div className="flex justify-between mx-3 my-2">
                                  <span className="flex justify-start">
                                    <span className="mt-2"><span className=" rounded-full px-3 py-1.5 bg-[#0071BC] text-white">{(store.getState().data.login.value.name).slice(0, 1).toUpperCase()}</span></span>
                                    <span className="flex flex-col pl-[16px]">
                                      <span className="font-[600] text-[10px]">{configs?.baseRedirectFront}store/{(data?.link_name)}</span>
                                      {/* <span className=" text-[14px] font-[400]">{(data?.phone_number)}</span> */}
                                    </span>

                                  </span>

                                  <span className="mt-2">
                                    <span className="flex justify-end gap-1 ">

                                      {/* <NavLink to={`/storedetails/${data?.id}`}
                                      className=" text-[10px] text-[#0071BC] py-1  flex cursor-pointer bg-[#DBF2FF] rounded-full px-2"
                                    >
                                      {data?.no_of_items} Items in stock
                                    </NavLink> */}

                                      <NavLink to={`/edit-product/${data?.id}`} className={'cursor-pointer mt-1.5'}>
                                        <FaEdit />
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
                                <hr />
                                <NavLink to={`/edit-product/${data?.id}`} className={'cursor-pointer'}>
                                  <p class="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] h-44" style={{ fontSize: '16px', color: '#595959', backgroundImage: `url(${data?.product_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}>{data?.link_info?.message}</p>
                                </NavLink>
                                <hr />

                                <div className="flex flex-col pt-[16px] px-[16px]">
                                  <div className="flex justify-between">
                                    <span className="text-[16px] font-[600]">{data?.product_name}</span>
                                    <span
                                      style={{ color: 'white' }}
                                      className="ring-1 outline-none bg-[#149E49] font-xs rounded-lg text-xs px-4 h-5 pt-[2px] text-center cursor-pointer"
                                    >
                                      Active
                                    </span>
                                  </div>

                                  <span className="text-[#149E49] text-[14px] font-[400]">₦ {data?.product_price}</span>
                                  <span className="text-[14px] font-[400] text-[#808191] h-10 overflow-auto">{data?.product_description}</span>
                                </div>


                                {/* <span className="flex justify-between gap-1 pt-4 m-2">
                               

                               
                              </span> */}
                              </div>
                            </>



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

                                <h3 className="flex justify-center font-bold"> You haven’t created any Product Link</h3>
                                <p className="flex text-sm justify-center"> Click on the button below to create a new </p>
                                <p className="flex text-sm justify-center text-black font-bold"> Product.</p>

                                <NavLink to='/createproduct' className="flex justify-center">
                                  < span className="flex justify-center pt-4">
                                    <button
                                      type="submit"
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
            <div className=" flex flex-row justify-around bg-[#fff]  items-center rounded-lg p-1">

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
                  Delete Product
                </label>

                <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >
                  You are about to delete the Product you created.


                </label>
                <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >


                  Please note that:
                </label>

                <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400 pl-2">

                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    All Product data will be lost
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    The product will not be made available to customers again
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

                  <span className="flex justify-center pt-4">
                    <Oval
                      height={40}
                      width={40}
                      color="#0071BC"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={loader}
                      ariaLabel='oval-loading'
                      secondaryColor="#96cff6"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
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
