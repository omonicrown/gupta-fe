
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
import { useParams } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'
import { ThreeDots } from 'react-loader-spinner' 
import { TailSpin } from 'react-loader-spinner'
import { Oval } from 'react-loader-spinner'

// components



export default function CardEditProduct() {
  const navigate = useNavigate();
  let [visible, setVisible] = React.useState(false);
  const [addLink, setAddLink] = React.useState([]);

  const [addContact, setAddContact] = React.useState([]);

  const [productLink, setProductLink] = React.useState([]);
  const params = useParams();

  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noOfItems, setNoOfItems] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const [imgId1, setImgId1] = useState('');
  const [imgId2, setImgId2] = useState('');
  const [imgId3, setImgId3] = useState('');


  React.useEffect(() => {
    AdminApis.getlinks().then(
      (response) => {
        if (response?.data) {
          setAddContact(response?.data?.link)
          // setPermissionIdList(response?.data?.data)
        }
      }
    );

  }, []);




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
    if (e.target.files && e.target.files[0]) {
      if (size > 4) {
        if (e.target.name == 'uploadImg1') {
          e.target.value = ''
          toast.warn(`Image too large ${size}`)
        }
      }
      if (size <=4) {
        if (e.target.name == 'uploadImg1') {
          setImg12(URL.createObjectURL(e.target.files[0]))
          setImg1(e.target.files[0]);
        }
      }
    }
  };


  const [img2, setImg2] = React.useState('No selected file');
  const [img22, setImg22] = React.useState('empty');
  function uploadImg2(e) {
    let size = (e.target.files[0].size / 1048576.0)
    if (e.target.files && e.target.files[0]) {
      if (size > 4) {
        if (e.target.name == 'uploadImg2') {
          e.target.value = ''
          toast.warn(`Image too large.`)
        }
      }
      if (size <= 4) {
        if (e.target.name == 'uploadImg2') {
          setImg22(URL.createObjectURL(e.target.files[0]))
          setImg2(e.target.files[0]);
        }
      }
    }
  };

  const [img3, setImg3] = React.useState('No selected file');
  const [img32, setImg32] = React.useState('empty');
  function uploadImg3(e) {
    let size = (e.target.files[0].size / 1048576.0)
    if (e.target.files && e.target.files[0]) {
      if (size > 4) {
        if (e.target.name == 'uploadImg3') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 4) {
        if (e.target.name == 'uploadImg3') {
          setImg32(URL.createObjectURL(e.target.files[0]))
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
          setdata(response?.data?.link)
          setLoader(false);
        }
      }
    );

  }, [checkLink]);

  React.useEffect(() => {
    AdminApis.getSingleProduct(params?.id).then(
      (response) => {
        if (response?.data) {
          setProductName(response?.data?.data?.product?.product_name);
          setProductDescription(response?.data?.data?.product?.product_description);
          setPrice(response?.data?.data?.product?.product_price)
          setNoOfItems(response?.data?.data?.product?.no_of_items)
          setAddLink(response?.data?.data?.product?.link_name)
          setCategory(response?.data?.data?.product?.category)
          setLocation(response?.data?.data?.product?.location)
          setPhoneNumber(response?.data?.data?.product?.phone_number)
          setPhoneNumber(response?.data?.data?.product?.phone_number)
          setImg12(response?.data?.data?.product?.product_image_1)
          setImg1(response?.data?.data?.product?.product_image_1)
          setImg22(response?.data?.data?.product?.product_image_2)
          setImg2(response?.data?.data?.product?.product_image_2)
          setImg32(response?.data?.data?.product?.product_image_3)
          setImg3(response?.data?.data?.product?.product_image_3)
          setProductId(response?.data?.data?.product?.id)
          setImgId1(response?.data?.data?.product?.product_image_id_1)
          setImgId2(response?.data?.data?.product?.product_image_id_2)
          setImgId3(response?.data?.data?.product?.product_image_id_3)
         
        }
      }
    );

  }, []);


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
            toast.error('link name already in use');

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



  const createProduct = React.useCallback(
    (e) => {
      e.preventDefault();
      setLoader(true);
      const formData = new FormData()
      formData.append('link_name', (addLink.split(" "))[0])
      formData.append('link_id', (addLink.split(" "))[1])
      formData.append('product_name', productName)
      formData.append('product_description', productDescription)
      formData.append('phone_number', phoneNumber)
      formData.append('no_of_items', noOfItems)
      formData.append('id', productId)
      formData.append('category', category)
        formData.append('location', location)
      formData.append('product_price', price)
      formData.append('product_image_1', img1)
      formData.append('product_image_2', img2)
      formData.append('product_image_3', img3)
      formData.append('product_image_id_1', imgId1)
      formData.append('product_image_id_2', imgId2)
      formData.append('product_image_id_3', imgId3)

      AdminApis.updateProduct(formData).then(
        (response) => {
          if (response?.data) {
            // console.log(response?.data)
            // toggleModal()
            setLoader(false);
            toast.success("Product Updated Successfully");
          } else {
            // toggleModal()
            toast.error('link name already in use');

          }

          // toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error
        // console.log(error.response);
        toast.error(error.response.data.message);
      })
    },
    [addLink, productName, productDescription, noOfItems, price, img1, img2, img3, productId, imgId1, imgId2, imgId3,phoneNumber,location,category]
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

      <form onSubmit={createProduct} className="pb-32 sm:px-5">
      

        <div className={"lg:grid lg:grid-cols-2 gap-2 mt-10 "+(loader?'shadow animate-pulse ':'')}>
          <div className="mb-10">
            <div className=" lg:w-4/5">
              <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Product Name</label>
              <input type="text" defaultValue={productName} onChange={(e) => setProductName(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title of business here" />

              <label for="first_name" class="block mb-2 mt-4 text-sm  text-gray-900 dark:text-gray-600 ">Product Description</label>
              <textarea id="message" defaultValue={productDescription} onChange={(e) => setProductDescription(e?.target?.value)} rows={3} className="block bg-[#F4FBFF] p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Bio" ></textarea>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Category</label>
                  <select id="gender" defaultValue={category} onChange={e => setCategory(e.target.value)} name="programs_type" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-pointer">
                    <option selected value={category}>{category}</option>
                    <option value="women fashion">Women's Fashion</option>
                    <option value="men fashion">Men's Fashion</option>
                    <option value="bags">Bags</option>
                    <option value="beauty&cosmetics">Beauty and cosmetics</option>
                    <option value="sport/outdoor">Sport/Outdoor</option>
                    <option value="home/kitchen">Home/Kitchen</option>
                    <option value="shoes">Shoes</option>
                    <option value="watches">Watches</option>
                    <option value="keyboard & mice">Keyboard & mice</option>
                    <option value="laptops">Laptops</option>
                    <option value="phones">Phones</option>
                  </select>

                </div>

                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Location</label>
                  <select id="gender" defaultValue={location} onChange={e => setLocation(e.target.value)} name="programs_type" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-pointer">
                    <option value={location} selected="selected">{location}</option>
                    <option value="Abuja FCT">Abuja FCT</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nassarawa">Nassarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
                </div>

              </div>
              
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Sales Price</label>
                  <input type="number" defaultValue={price} onChange={(e) => setPrice(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Eg. 3500" />
                </div>

                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Discount Price</label>
                  <input type="number" defaultValue={noOfItems} onChange={(e) => setNoOfItems(e?.target?.value)} id="first_name" class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Discount Price" />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <div>

                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Link to Product : ({addLink})</label>
                  <select onChange={(e) => { setAddLink(e?.target?.value); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={''}>Select link</option>
                    {productLink.map(
                      (data, index) => (
                        <option value={`${data?.link_name} ${data?.id}`}>{data?.link_name}</option>
                      )
                    )}

                  </select>
                </div>


                <div>
                  <label for="first_name" class="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Whatsapp Link : ({phoneNumber})</label>
                  <select onChange={(e) => { setPhoneNumber(e?.target?.value); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={''}>Select whatsapp url</option>
                    {addContact?.map(
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
                  {img12 == 'no image' ? <img src="/images/img1.png" style={{ minHeight: '200px' }} /> : <img src={img12} className=" md:min-h-[250px] md:max-h-[250px] min-h-[200px] max-h-[200px]"/>}
                </div>
                <input id="dropzone-file" onChange={uploadImg1} name='uploadImg1' type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
              <span className="text-[10px] text-[#dc143c]">Image should not be more than 4MB.</span>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img22 == 'no image' ?  <img src={`/images/img2.png`} alt={img22} style={{ minHeight: '200px' }} /> : <img src={img22} className=" md:min-h-[250px] md:max-h-[250px] min-h-[200px] max-h-[200px]" />}
                </div>
                <input id="dropzone-file" name='uploadImg2' onChange={uploadImg2} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
              <span className="text-[10px] text-[#dc143c]">Image should not be more than 4MB.</span>
            </div>

            <div className="">
              <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
                <div className="flex flex-col items-center justify-center ">
                  {img32 == 'no image' ? <img src="/images/img3.png" style={{ minHeight: '200px'}} /> : <img src={img32} className=" md:min-h-[250px] md:max-h-[250px] min-h-[200px] max-h-[200px]" />}
                </div>
                <input id="dropzone-file" name='uploadImg3' onChange={uploadImg3} type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
              </label>
              <span className="text-[10px] text-[#dc143c]">Image should not be more than 4MB.</span>
            </div>


          </div>

        </div>


        <div className="flex justify-center gap-2 mt-5">
          {
            loader ?
              <div className='flex justify-center '>
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
              :
              ''
          }

          <button
            type="submit"
            className=" text-white bg-[#0071BC] hover:bg-[#103f5e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
          >
            Update Product 
          </button>
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
