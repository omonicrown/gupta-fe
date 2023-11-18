
import React, { useState } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';
import { useParams } from 'react-router-dom';
import configs from "../../configs";

// components

export default function CardTiredLinks() {

  const [images, setImages] = React.useState('');
  const maxNumber = 69;

  const params = useParams();



  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const [nameExist, setNameExist] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [logo, setlogo] = useState('');
  const [bio, SetBio] = useState('');
  const [addlink, setAddLink] = useState([]);
  const [businessSite, setBusinessSite] = useState('');
  const [businessPolicy, setBusinessPolicy] = useState('');
  const [data, setLinks] = useState([]);
  const [multiLinks, setMultiLinks] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [permissionList, setPermissionList] = React.useState([]);
  const [permissionList2, setPermissionList2] = React.useState([]);

  const [permissionIdList, setPermissionIdList] = React.useState([]);

  const [fileName, setFileName] = useState("No selected file")
  const [errorMes, setErrorMes] = React.useState("")



  React.useEffect(() => {
    AdminApis.getMultiLinkData(params?.linkId).then(
      (response) => {
        if (response?.data) {
          // console?.log('ssss')
          setMultiLinks(response?.data?.data);
          setName(response?.data?.data?.multiLinks?.name);
          setTitle(response?.data?.data?.multiLinks?.title)
          SetBio(response?.data?.data?.multiLinks?.bio)
          setBusinessSite(response?.data?.data?.multiLinks?.business_website)
          // console?.log(response?.data?.data?.attachLinks)
          setPermissionList(response?.data?.data?.attachLinks)
          setBusinessPolicy(response?.data?.data?.multiLinks?.business_policy)


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

  console?.log(permissionList)


  return (
    <>

      <div className="md:flex md:justify-center rounded mt-10">

        {permissionList?.length >= 1

          ?
          <div class="px-4 bg-white border shadow-lg rounded-lg">
            <div class="mb-10 mt-4">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      disabled={imageList?.length ? true : false}
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={null}
                      {...dragProps}
                    >
                      {imageList?.length ? '' : <span className="flex justify-center md:mx-2 p-6 max-w-[80vw] min-w-[80vw] md:min-w-[30vw] md:max-w-[40vw]  max-h-[50vh] md:min-h-[50%] md:max-h-[25vh]"> <div className=""> <img src={configs?.imageUrl + multiLinks?.multiLinks?.logo} className=" rounded-full max-w-[100%] min-w-[100%] md:min-w-[10vw] md:max-w-[10vw]] max-h-[80%] md:min-h-[50%] md:max-h-[20vh]" />  </div> </span>}

                    </button>
                    &nbsp;
                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                    {imageList.map((image, index) => (
                      <div key={index} className=" flex justify-center rounded-full">
                        <img src={image['data_url']} alt="" className="mx-32 flex rounded-full max-h-20 max-w-fit" />
                        <div className="image-item__btn-wrapper flex justify-center">
                          {/* <button onClick={() => onImageUpdate(index)}>Update</button> | &nbsp;
                                   <button onClick={() => onImageRemove(index)}>Remove</button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>

              {/* <span className="flex mt-10 justify-center mx-32 p-6 bg-gray-200 rounded-full"> <div> <img src={require('../assets/img/camera.png')} className="flex justify-center" /> <div className="flex justify-center text-xs">Upload</div> </div> </span> */}

              <h5 class=" flex justify-center mb-10 text-md pt-5 font-bold tracking-tight text-gray-900 ">{title == '' ? "Title" : title} </h5>

              <div className="flex justify-center mb-10 mx-2 md:max-w-[30vw]">
                <p >{bio == '' ? "Bio" : bio}</p>
              </div>


              {permissionList?.map(
                (data, index) => (
                  <a href={`https://gupta-tkwuj.ondigitalocean.app/${data?.attach_links}`} target="_blank" key={index}>
                    <span
                      style={{ backgroundColor: '#0071BC' }}
                      className="flex mx-1 mb-2 justify-center px-10 py-1.5 cursor-pointer text-white hover:bg-blue-800  font-medium rounded-lg  "
                    >
                      <span className="flex justify-between">
                        <span><SvgElement type={icontypesEnum.WHATSAPP} /> </span>
                        <span>{data?.attach_links}</span>
                      </span>
                    </span>
                  </a>
                ))}


            </div>
            <hr className="mb-[16px]" />

            <div className="flex justify-center mb-5">
              <div className="flex flex-col">
                <div className="ml-3 mb-5">More Info:</div>
                <div
                  className="flex mb-2 justify-center border border-[#0071BC] px-2 w-30 py-1.5 cursor-pointer text-[#0071BC] hover:border-blue-800  rounded-lg  "
                >
                  <a className="flex justify-between" href={`http://${businessSite}`} target="_blank">
                    <span className="pl-3">Visit</span>
                    <span className="px-3  pt-1"><SvgElement type={icontypesEnum.EXPLORE} /> </span>
                  </a>
                </div>
              </div>
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
