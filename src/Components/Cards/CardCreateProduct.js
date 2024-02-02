
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
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
import InputColor from 'react-input-color';

// components



export default function CardCreateProduct() {
  const navigate = useNavigate();
  let [visible, setVisible] = React.useState(false);
  const [addLink, setAddLink] = React.useState([]);

  const [addContact, setAddContact] = React.useState([]);
  const [color, setColor] = React.useState({hex:'#0071BC'});

  const [productLink, setProductLink] = React.useState([]);
  let [toggleDeleteModal, setToggleDeleteModal] = React.useState(false);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noOfItems, setNoOfItems] = useState('');
  const [price, setPrice] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

  const [linkId, setLinkId] = useState('');
  function toggleDeleteMarketLink(id) {
    setLinkId(id)
    setToggleDeleteModal(true)
  }

  let [toggleEditMarketLink, setToggleEditMarketLink] = React.useState(false);
  const [marketLinkData, setMarketLinkData] = useState([]);
  function toggleMarketLinkData(data) {
    setMarketLinkData(data)
    setToggleEditMarketLink(true)
  }


  const [refresh, setRefresh] = useState(false);


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



  function deleteMarketLink() {
    setLoader(true)
    AdminApis.deleteMarketLink(linkId).then(
      (response) => {
        if (response?.data) {
          console.log(response?.data)
          setRefresh(!refresh)
          setLoader(false)
          setToggleDeleteModal(false)
          toast.success(response?.data?.message);
        } else {
          setLoader(false)
          toast.error(response?.response?.data?.message);

        }

        // toast.success(response?.data?.message);
      }
    ).catch(function (error) {
      // handle error
      // console.log(error.response);
      toast.error(error.response.data.message);
    })
  }

  // setLinkName(addLink.split(" "))
  // console?.log((addLink.split(" "))[1])




  const [userData, setUserData] = useState([]);
  React.useEffect(() => {
    AdminApis.getMarketLink().then(
      (response) => {
        if (response?.data) {
          setProductLink(response?.data?.link)
          // setPermissionIdList(response?.data?.data)
          setUserData(response?.data?.user_data)

        }
      }
    );

  }, [refresh]);

  function toggleModal() {
    if (parseInt(userData?.no_of_malink) > ((productLink?.length))) {
      setVisible(!visible)
    } else {
      toast.error("Market Link limit exceeded");
    }

  }


  const [logoImg, setLogoImg] = React.useState('No selected file');
  const [logoImgPrev, setLogoImgPrev] = React.useState('empty');
  function uploadLogoImg(e) {
    let size = (e.target.files[0].size / 1048576.0)
    setLogoImgPrev(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 1) {
        if (e.target.name == 'uploadImg1') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 1) {
        if (e.target.name == 'uploadImg1') {
          setLogoImg(e.target.files[0]);
        }
      }
    }
  };



  const [img1, setImg1] = React.useState('No selected file');
  const [img12, setImg12] = React.useState('empty');
  function uploadImg1(e) {
    let size = (e.target.files[0].size / 1048576.0)
    setImg12(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 1) {
        if (e.target.name == 'uploadImg1') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 1) {
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
      if (size > 1) {
        if (e.target.name == 'uploadImg2') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 1) {
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
      if (size > 1) {
        if (e.target.name == 'uploadImg3') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 1) {
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
      formData.append('brand_primary_color', color?.hex)
      formData.append('brand_description', brandDescription)
      formData.append('facebook_url', facebookUrl)
      formData.append('instagram_url', instagramUrl)
      formData.append('tiktok_url', tiktokUrl)
      formData.append('brand_logo', logoImg)

      AdminApis.createMarketLink(formData).then(
        (response) => {
          if (response?.data) {
            // console.log(response?.data)
            setRefresh(!refresh)
            setVisible(false);
            setBrandDescription('')
            setFacebookUrl('')
            setInstagramUrl('')
            setTiktokUrl('')
            setLogoImg("No selected file")
            setColor('');
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
    [checkLink, color, brandDescription, facebookUrl, instagramUrl, tiktokUrl, refresh, logoImg]
  );


  const UpdateMarketLink = React.useCallback(
    (e) => {
      // console?.log(color.hex)
      e.preventDefault();
      const formData = new FormData()
      formData.append('link_name', marketLinkData?.link_name)
      formData.append('brand_primary_color', (color?.hex) ? color?.hex : marketLinkData?.brand_primary_color)
      formData.append('brand_description', brandDescription == '' ? marketLinkData?.brand_description : brandDescription)
      formData.append('facebook_url', facebookUrl == '' ? marketLinkData?.facebook_url : facebookUrl)
      formData.append('instagram_url', instagramUrl == '' ? marketLinkData?.instagram_url : instagramUrl)
      formData.append('tiktok_url', tiktokUrl == '' ? marketLinkData?.tiktok_url : tiktokUrl)
      formData.append('brand_logo', logoImg)
      formData.append('brand_logo_id', logoImg)
      formData.append('id', marketLinkData?.id)

      AdminApis.updateMarketLink(formData).then(
        (response) => {
          if (response?.data) {
            // console.log(response?.data)
            setRefresh(!refresh)
            setToggleEditMarketLink(false);
            setBrandDescription('')
            setFacebookUrl('')
            setInstagramUrl('')
            setTiktokUrl('')
            setLogoImg("No selected file")
            setColor('');
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
    [checkLink, color, brandDescription, facebookUrl, instagramUrl, tiktokUrl, refresh, logoImg]
  );


  const createProduct = React.useCallback(
    (e) => {
      e.preventDefault();
      if (img1 == 'No selected file') {
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
            <span className=" bg-blue-100  rounded-lg  text-gray-500 text-[12px]"><span className=" text-red-500 bg-red-200 p-1 px-3 rounded-full text-[15px]">!</span><br />  ATTENTION : Please kindly note that the market market link is the link where your customers will see the list of your products</span>
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


        <div className={"lg:grid lg:grid-cols-2 gap-2 mt-10 " + (loader ? 'shadow animate-pulse ' : '')}>
          <div className="mb-10">
            <div className=" lg:w-4/5">
              <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Product Name</label>
              <input required type="text" defaultValue={title} onChange={(e) => setProductName(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title of business here" />

              <label for="first_name" class="block mb-2 mt-4 text-sm  text-gray-900 dark:text-gray-600 ">Product Description / Details</label>
              <textarea required id="message" defaultValue={bio} onChange={(e) => setProductDescription(e?.target?.value)} rows={3} className="block bg-[#F4FBFF] p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="eg. about product,product size e.t.c..." ></textarea>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Sales Price</label>
                  <input required type="number" defaultValue={title} onChange={(e) => setPrice(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Eg.3500" />
                </div>

                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Discounted Price</label>
                  <input required type="number" defaultValue={title} onChange={(e) => setNoOfItems(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Discount Price" />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Link to Product (Market Link)</label>
                  <select required onChange={(e) => { setAddLink(e?.target?.value); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={''}>Select link</option>
                    {productLink.map(
                      (data, index) => (
                        <option value={`${data?.link_name} ${data?.id}`}>{data?.link_name}  </option>
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



            <div className=" max-w-200-px mt-10">
              <div className=" font-[600] underline mb-3">Market Links</div>

              {productLink?.length > 0 ?
                productLink.map(
                  (data, index) => (
                    <span className="flex justify-between mb-4">
                      <span><span>({index + 1}) </span>  {data?.link_name}</span>

                      <span className="flex space-x-2">

                        {userData?.sub_type == 'premium' ? <span className=" text-blue-500 cursor-pointer" onClick={() => toggleMarketLinkData(data)}><FaEdit /></span> : ''}


                        <span className=" text-red-500 cursor-pointer" onClick={() => toggleDeleteMarketLink(data?.id)}><FaTrash /></span>

                      </span>


                    </span>
                  )
                )
                :
                "No Market Link Created"
              }


            </div>

          </div>




          {/* second Div */}
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center  ">
                  {img12 == 'empty' ? <img src="/images/img1.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img12} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" onChange={uploadImg1} accept="image/x-png,image/gif,image/jpeg" name='uploadImg1' type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img22 == 'empty' ? <img src="/images/img2.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img22} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" name='uploadImg2' accept="image/x-png,image/gif,image/jpeg" onChange={uploadImg2} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img32 == 'empty' ? <img src="/images/img3.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img32} style={{ minHeight: '200px', maxHeight: "200px" }} />}
                </div>
                <input id="dropzone-file" name='uploadImg3' accept="image/x-png,image/gif,image/jpeg" onChange={uploadImg3} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
            </div>


          </div>

        </div>


      </form>


      {/* CREATE MARKET LINK */}

      <section>
        <Modal
          visible={visible}
          width="380"
          height=  {userData?.sub_type == 'premium' ?'700':'300'}
          effect="fadeInUp"
          onClickAway={() => toggleModal}
        >
          <div className="px-2 bg-[#fff]  items-center rounded-lg p-2">
            <span className="flex justify-between px-1 pt-1">
              <p className="cursor-pointer font-bold mt-2" >Create Market Link</p>
              <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>


            <div>
              <form onSubmit={CreateMarketLink}>
                <div className="">
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Market Link Name</label>
                  <div className="gap-4">
                    <input type="text" defaultValue={checkLink} onChange={(e) => setCheckLink(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 w-4/5 " required placeholder="Business Link Name" />
                    {(checkLink?.length !== 0 && data == 0) ? <span className="pl-4 w-1/5 text-[30px]">👌</span> : (data != 1 ? '' : <span className="pl-4 w-1/5 text-[30px] "> 😭 </span>)}
                  </div>
                  <span className="text-[10px]">{`https://www.mygupta.co/store/${checkLink.replace(/ /g, '-')}`} </span> <br />{(checkLink?.length !== 0 && data == 0) ? <span className=" w-1/5 text-[10px] text-green-500">Available</span> : (data != 1 ? '' : <span className=" w-1/5 text-[10px] text-red-500"> Link is taken </span>)}


                </div>


                {userData?.sub_type == 'premium' ?
                  <div>
                    <div>

                      <label for="first_name" class="block mt-4 text-xs  text-gray-900 dark:text-gray-600">Select Brand Primary Color</label>

                      <span className="flex justify-between">
                        <span className="mt-3 mr-2">
                          <InputColor
                            initialValue="#0071BC"
                            className=""
                            onChange={setColor}
                            placement="right"
                          />
                        </span>

                        <div
                          className="w-full  rounded-lg"
                          style={{

                            height: 30,
                            marginTop: 10,
                            border: "2px solid #777",
                            backgroundColor: color.hex,
                          }}
                        >
                          <span className="flex justify-center text-white"> {color.hex}</span>
                        </div>
                      </span>


                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Facebook Url</label>
                      <input type="text" defaultValue={facebookUrl} onChange={(e) => setFacebookUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.facebook.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Instagram Url</label>
                      <input type="text" defaultValue={instagramUrl} onChange={(e) => setInstagramUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.instagram.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">TikTok Url</label>
                      <input type="text" defaultValue={tiktokUrl} onChange={(e) => setTiktokUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.tiktok.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Brand Description</label>
                      <textarea type="text" onChange={(e) => setBrandDescription(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Brief description of your brand" > </textarea>
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-3 text-xs  text-gray-900 dark:text-gray-600">Upload Brand Logo</label>
                      <input id="dropzone-file" accept="image/x-png,image/gif,image/jpeg" onChange={uploadLogoImg} placeholder="upload brand logo" name='uploadImg1' type="file" className={" mb-2 text-sm text-[#6C757D] font-medium"} />
                    </div>
                  </div>

                  :
                  ''
                }










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


      <section>
        <Modal
          visible={toggleEditMarketLink}
          width="380"
          height="700"
          effect="fadeInUp"
          onClickAway={() => setToggleEditMarketLink}
        >
          <div className="px-2 bg-[#fff]  items-center rounded-lg p-2">
            <span className="flex justify-between px-1 pt-1">
              <p className="cursor-pointer font-bold mt-2" >Edit Market Link</p>
              <p className="cursor-pointer font-bold" onClick={(e) => setToggleEditMarketLink(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>


            <div>
              <form onSubmit={UpdateMarketLink}>
                <div className="">
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Market Link Name</label>
                  <div className="gap-4">
                    <input type="text" disabled defaultValue={marketLinkData?.link_name} onChange={(e) => setCheckLink(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 w-4/5 " placeholder="Business Link Name" />
                    {/* {(checkLink?.length !== 0 && data == 0) ? <span className="pl-4 w-1/5 text-[30px]">👌</span> : (data != 1 ? '' : <span className="pl-4 w-1/5 text-[30px] "> 😭 </span>)} */}
                  </div>
                  {/* <span className="text-[10px]">{`https://www.mygupta.co/store/${checkLink.replace(/ /g, '-')}`} </span> <br />{(checkLink?.length !== 0 && data == 0) ? <span className=" w-1/5 text-[10px] text-green-500">Available</span> : (data != 1 ? '' : <span className=" w-1/5 text-[10px] text-red-500"> Link is taken </span>)} */}


                </div>
                {userData?.sub_type == 'premium' ?
                  <div>
                    <div>

                      <label for="first_name" class="block mt-4 text-xs  text-gray-900 dark:text-gray-600">Select Brand Primary Color</label>

                      <span className="flex justify-between">
                        <span className="mt-3 mr-2">
                          <InputColor
                            initialValue={marketLinkData?.brand_primary_color ? marketLinkData?.brand_primary_color : '#0071BC'}
                            className=""
                            onChange={setColor}
                            placement="right"
                          />
                        </span>

                        <div
                          className="w-full  rounded-lg"
                          style={{

                            height: 30,
                            marginTop: 10,
                            border: "2px solid #777",
                            backgroundColor: color?.hex,
                          }}
                        >
                          <span className="flex justify-center text-white"> {color?.hex}</span>
                        </div>
                      </span>


                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Facebook Url</label>
                      <input type="text" defaultValue={marketLinkData?.facebook_url} onChange={(e) => setFacebookUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.facebook.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Instagram Url</label>
                      <input type="text" defaultValue={marketLinkData?.instagram_url} onChange={(e) => setInstagramUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.instagram.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">TikTok Url</label>
                      <input type="text" defaultValue={marketLinkData?.tiktok_url} onChange={(e) => setTiktokUrl(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://www.tiktok.com/..." />
                    </div>

                    <div>
                      <label for="first_name" class="block mb-2 mt-2 text-xs  text-gray-900 dark:text-gray-600">Brand Description</label>
                      <textarea type="text" defaultValue={marketLinkData?.brand_description} onChange={(e) => setBrandDescription(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Brief description of your brand" > </textarea>
                    </div>

                    <div className="flex justify-between">

                      <span>
                        <label for="first_name" class="block mb-2 mt-3 text-xs  text-gray-900 dark:text-gray-600">Upload Brand Logo</label>
                        <input id="dropzone-file" accept="image/x-png,image/gif,image/jpeg" onChange={uploadLogoImg} placeholder="upload brand logo" name='uploadImg1' type="file" className={" mb-2 text-sm text-[#6C757D] font-medium"} />
                      </span>

                      <span className="mt-2">
                        <img src={marketLinkData?.brand_logo} />
                      </span>

                    </div>
                  </div>
                  :
                  ''
                }




                <button
                  type="submit"

                  className={"text-white mt-10" + (data == 0 ? ' bg-[#0071BC]' : ' bg-[#E03130] ') + " " + (data == 0 ? 'hover:bg-[#103f5e] ' : '') + " focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center"}
                >
                  {data == 0 ? 'Update Link' : 'Taken'}
                </button>
              </form>
            </div>
          </div>

        </Modal>
      </section>



      {/* DELETE MARKET LINK */}

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
                  Delete Market Link
                </label>

                <label
                  style={{ fontSize: '14px' }}
                  className="flex justify-start mb-2 pt-2 text-xs font-medium text-gray-600"
                >
                  You are about to delete the market link you created.


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
                    All link data will be lost.
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    The link name will be made available to others.
                  </li>
                  <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs font-bold">
                    All products attached to the market link will be lost.
                  </li>
                  {/* <li style={{ color: '#2C2C2C', fontSize: '14px' }} className="text-xs">
                    If you used this link in your Tiered links, the button will stop working
                  </li> */}
                </ul>




                <span className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={deleteMarketLink}
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
