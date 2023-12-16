
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import { Oval } from 'react-loader-spinner'

// components



export default function CardCreateProduct() {
  const navigate = useNavigate();
  let [visible, setVisible] = React.useState(false);
  const [addLink, setAddLink] = React.useState([]);

  const [addContact, setAddContact] = React.useState([]);

  const [productLink, setProductLink] = React.useState([]);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noOfItems, setNoOfItems] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState('');


  React.useEffect(() => {
    AdminApis.getlinks().then(
      (response) => {
        if (response?.data) {
          setAddContact(response?.data?.link)
          // setPermissionIdList(response?.data?.data)

          // console?.log(response?.data?.data?.length)
        }
      }
    );

  }, []);

  const [title, setTitle] = useState('');
  const [logo, setlogo] = useState('');
  const [bio, SetBio] = useState('');

  function toggleModal() {
    setVisible(!visible)
  }

  // setLinkName(addLink.split(" "))
  // console?.log((addLink.split(" "))[1])





  React.useEffect(() => {
    AdminApis.getMarketLink().then(
      (response) => {
        if (response?.data) {
          setProductLink(response?.data?.link)
          // setPermissionIdList(response?.data?.data)

          // console?.log(response?.data?.data?.length)
        }
      }
    );

  }, []);

  const [img1, setImg1] = React.useState('No selected file');
  const [img12, setImg12] = React.useState('empty');
  function uploadImg1(e) {
    let size = (e.target.files[0].size / 1048576.0)
    setImg12(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 3) {
        if (e.target.name == 'uploadImg1') {
          e.target.value = ''
        }
      }
      if (size <= 3) {
        if (e.target.name == 'uploadImg1') {
          setImg1(e.target.files[0]);
        }
      }
    }
  };


  const [img2, setImg2] = React.useState('No selected file');
  const [img22, setImg22] = React.useState('empty');
  function uploadImg2(e) {
    let size = (e.target.files[0].size / 1048576.0)
    setImg22(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 3) {
        if (e.target.name == 'uploadImg2') {
          e.target.value = ''
        }
      }
      if (size <= 3) {
        if (e.target.name == 'uploadImg2') {
          setImg2(e.target.files[0]);
        }
      }
    }
  };

  const [img3, setImg3] = React.useState('No selected file');
  const [img32, setImg32] = React.useState('empty');
  function uploadImg3(e) {
    let size = (e.target.files[0].size / 1048576.0)
    setImg32(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 3) {
        if (e.target.name == 'uploadImg3') {
          e.target.value = ''
        }
      }
      if (size <= 3) {
        if (e.target.name == 'uploadImg3') {
          setImg3(e.target.files[0]);
        }
      }
    }
  };

  const [loader, setLoader] = React.useState(false);
  let [data, setdata] = React.useState(0);
  let [checkLink, setCheckLink] = React.useState('');

  React.useEffect(() => {
    setLoader(true);
    AdminApis.checkMarketLink({ 'link_name': checkLink.replace(/ /g, '-') }).then(
      (response) => {
        if (response?.data) {
          setLoader(false)
          setdata(response?.data?.link)
        }
      }
    );

  }, [checkLink]);


  const CreateMarketLink = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('link_name', checkLink.replace(/ /g, '-'))

      AdminApis.createMarketLink(formData).then(
        (response) => {
          if (response?.data) {
            // console.log(response?.data)
            toggleModal()
            toast.success(response?.data?.message);
          } else {
            toggleModal()
            toast.error(response?.response?.data?.message);

          }

          // toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error
        // console.log(error.response);
        toast.error(error.response.data.message);
      })
    },
    [checkLink]
  );

  console?.log(img1)


  const createProduct = React.useCallback(
    (e) => {
      e.preventDefault();
      if (img1 == 'No selected file' || img2 == 'No selected file' || img3 == 'No selected file') {
        toast.error("Upload Product Images");
      } else {
       
        setLoader(true)
        const formData = new FormData()
        formData.append('link_name', (addLink.split(" "))[0])
        formData.append('link_id', (addLink.split(" "))[1])
        formData.append('product_name', productName)
        formData.append('product_description', productDescription)
        formData.append('phone_number', phoneNumber)
        formData.append('no_of_items', noOfItems)
        formData.append('product_price', price)
        // formData.append('id', 'nill')
        formData.append('product_image_1', img1)
        formData.append('product_image_2', img2)
        formData.append('product_image_3', img3)

        AdminApis.createProduct(formData).then(
          (response) => {
            if (response?.data) {
              // console.log(response?.data)
              // toggleModal()
              setLoader(false)
              toast.success(response?.data?.message);
              navigate('/mini-store');
            } else {
              // toggleModal()
              toast.error(response?.response?.data?.message);
            }

            // toast.success(response?.data?.message);
          }
        ).catch(function (error) {
          // handle error
          // console.log(error.response);
          setLoader(false)
          toast.error(error.response.data.message);
        }).finally(function () {
          setLoader(false)
        })
      }
    },
    [addLink, productName, productDescription, noOfItems, price, img1, img2, img3, phoneNumber, loader]
  );

  // const handleSubmit = React.useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     const formData = new FormData()
  //     formData.append('name', name.replace(/ /g, ''))
  //     formData.append('title', title)
  //     formData.append('bio', bio)
  //     AdminApis.createTieredLink(formData).then(
  //       (response) => {
  //         if (response?.data) {
  //           console.log(response?.data)
  //           toast.success(response?.data?.message);
  //         } else {
  //           toast.error('link name already in use');
  //         }

  //         // toast.success(response?.data?.message);
  //       }
  //     ).catch(function (error) {
  //       // handle error
  //       // console.log(error.response);
  //       toast.error(error.response.data.message);
  //     })
  //   },
  //   [title, bio, name]
  // );

  // console.log((data?.url).slice(8))
  return (
    <>
      <form onSubmit={createProduct} className="pb-32 sm:px-3">

        <div className="md:flex md:justify-between">
          <div className="bg-blue-100 md:w-2/5 rounded-lg m-1 p-2">
          <span className=" bg-blue-100  rounded-lg  text-gray-500 text-[12px]"><span className=" text-red-500 bg-red-200 p-1 px-3 rounded-full text-[15px]">!</span><br/>  ATTENTION : Please kindly note that the market market link is the link where your customers will see the list of your products</span>
          </div>
         
         
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={toggleModal}
            className=" text-gray-900 h-10 bg-[#8ed2ff] hover:bg-[#167bbe] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
          >
            Add Market Link
          </button>

          <button
            type="submit"
            className=" text-white h-10 bg-[#0071BC] hover:bg-[#103f5e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
          >
            Add Product
          </button>

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

        </div>

        </div>
        

        <div className={"lg:grid lg:grid-cols-2 gap-2 mt-10 "+(loader?'shadow animate-pulse ':'')}>
          <div className="mb-10">
            <div className=" lg:w-4/5">
              <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Product Name</label>
              <input required type="text" defaultValue={title} onChange={(e) => setProductName(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title of business here" />

              <label for="first_name" class="block mb-2 mt-4 text-sm  text-gray-900 dark:text-gray-600 ">Product Description</label>
              <textarea required id="message" defaultValue={bio} onChange={(e) => setProductDescription(e?.target?.value)} rows={3} className="block bg-[#F4FBFF] p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Bried Descriptrion" ></textarea>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Sales Price</label>
                  <input required type="number" defaultValue={title} onChange={(e) => setPrice(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title of business here" />
                </div>

                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">No of Items in Stock</label>
                  <input required type="text" defaultValue={title} onChange={(e) => setNoOfItems(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="No of Items" />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Link to Product (Market Link)</label>
                  <select required onChange={(e) => { setAddLink(e?.target?.value); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={''}>Select link</option>
                    {productLink.map(
                      (data, index) => (
                        <option value={`${data?.link_name} ${data?.id}`}>{data?.link_name}</option>
                      )
                    )}

                  </select>
                </div>


                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Whatsapp Link</label>
                  <select required onChange={(e) => { setPhoneNumber(e?.target?.value); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={''}>Select whatsapp url</option>
                    {addContact.map(
                      (data, index) => (
                        <option value={`${data?.name}`}>{data?.name}</option>
                      )
                    )}

                  </select>
                </div>
              </div>




            </div>

          </div>

          {/* second Div */}
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center  ">
                  {img12 == 'empty' ? <img src="images/img1.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img12} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" onChange={uploadImg1} name='uploadImg1' type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img22 == 'empty' ? <img src="images/img2.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img22} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" name='uploadImg2' onChange={uploadImg2} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img32 == 'empty' ? <img src="images/img3.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img32} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" name='uploadImg3' onChange={uploadImg3} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>


          </div>

        </div>


      </form>



      <section>
        <Modal
          visible={visible}
          width="400"
          height="450"
          effect="fadeInUp"
          onClickAway={() => toggleModal}
        >
          <div className="px-2 bg-[#fff]  items-center rounded-lg p-2">
            <span className="flex justify-between px-1 pt-1">
              <p className="cursor-pointer font-bold mt-2" >Create Market Link</p>
              <p className="cursor-pointer font-bold" onClick={toggleModal}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>


            <div>
              <form onSubmit={CreateMarketLink}>
                <div className="">
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Market Link Name</label>
                  <div className="gap-4">
                    <input type="text" defaultValue={checkLink} onChange={(e) => setCheckLink(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 w-4/5 " required placeholder="Business Link Name" />
                    {(checkLink?.length !== 0 && data == 0) ? <span className="pl-4 w-1/5 text-[30px]">👌</span> : (data != 1 ? '' : <span className="pl-4 w-1/5 text-[30px] "> 😭 </span>)}
                  </div>
                  <span className="text-[10px]">{`https://www.gupta.link/market-place/${checkLink.replace(/ /g, '-')}`} </span> <br />{(checkLink?.length !== 0 && data == 0) ? <span className=" w-1/5 text-[10px] text-green-500">Available</span> : (data != 1 ? '' : <span className=" w-1/5 text-[10px] text-red-500"> Link is taken </span>)}


                </div>

                <button
                  type="submit"
                  disabled={data == 0 ? false : true}
                  className={"text-white mt-10" + (data == 0 ? ' bg-[#0071BC]' : ' bg-[#E03130] ') + " " + (data == 0 ? 'hover:bg-[#103f5e] ' : '') + " focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center"}
                >
                  {data == 0 ? 'Create Link' : 'Taken'}
                </button>
              </form>
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
