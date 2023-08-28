
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
    AdminApis.getlinks().then(
      (response) => {
        if (response?.data) {
          setLinks(response?.data?.data)
          setPermissionIdList(response?.data?.data)
        }
      }
    );
  }, []);

  React.useEffect(() => {
    AdminApis.getMultiLink(params?.linkId).then(
      (response) => {
        if (response?.data) {
          setMultiLinks(response?.data?.data);
          setName(response?.data?.data?.multiLinks?.name);
          setTitle(response?.data?.data?.multiLinks?.title)
          SetBio(response?.data?.data?.multiLinks?.bio)
          setBusinessSite(response?.data?.data?.multiLinks?.business_website)
          console?.log(response?.data?.data?.attachLinks)
          setPermissionList(response?.data?.data?.attachLinks)
          setBusinessPolicy(response?.data?.data?.multiLinks?.business_policy)


          // response?.data?.data?.attachLinks?.map(
          //   (data, index) => (
          //     permissionDropdownChange2(data?.attach_links)
          //   ))
        }
      }
    );

  }, []);



  React.useEffect(() => {
    AdminApis.searchName({ 'name': name }).then(
      (response) => {
        if (response?.data) {
          setNameExist(response?.data?.data)
          // console?.log(response?.data)
        }
      }
    );

  }, [name, nameExist]);

  React.useEffect(() => {
    setPermissionList2([])
    permissionList?.map(
      (data, index) => (
        setPermissionList2(permissionList2 => [...permissionList2, data?.attach_links])
      ))

  }, [permissionList]);


  const [selectedPics1, setSelectedPics1] = React.useState('No selected file');

  const changeHandler1 = (e) => {
    // console?.log(e.target.files)
    const target = e.target
    let size = (target.files[0].size / 1048576.0)
    let targetName = target.name
    setFileName(e.target.files[0].name)
    // console?.log(size)
    if (target.files && target.files[0]) {
      if (size > 1) {
        if (targetName == 'image1') {
          setErrorMes("File too big!")
          target.value = ''
          console.log('error')
        }
      }
      if (size <= 1) {
        if (targetName == 'image1') {
          setErrorMes(" ")
          setSelectedPics1(e.target.files[0]);
          console.log(e.target.files[0])
        }
      }
    }
  };



  const handleSubmit = React.useCallback(
    (e) => {

      e.preventDefault();
      const formData = new FormData()
      formData.append('name', name.replace(/ /g, ''))
      formData.append('title', title)
      formData.append('bio', bio)
      formData.append('id', params?.linkId)
      formData.append('attach_links', permissionList2?.toString())
      // formData.append('logo', images[0]?.file)
      formData.append('redirect_link', addlink)
      formData.append('business_website', businessSite)
      formData.append('business_policy', businessPolicy)

      AdminApis.updateTieredLink(formData).then(
        (response) => {
          if (response?.data) {
            console.log(response?.data)
            toast.success(response?.data?.message);
          } else {
            console.log(response)
            toast.error('link name already in use');
          }

          // toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error

        toast.error(error.response.data.message);
      })
    },
    [title, bio, name, addlink, businessPolicy, businessSite, params, permissionList, permissionList2]
  );

  const removeButton = React.useCallback(
    (idx) => {
      // const data = permissionList?.length == 0 ? permission : permissionList
      // const temp = [...permissionList];
      // temp.splice(idx, 1);
      // setPermissionList(temp)
      // console?.log(idx)

      const temp2 = [...permissionIdList];
      temp2.splice(idx, 1);
      setPermissionIdList(temp2)
    },
    [permissionIdList]
  );

  const permissionDropdownChange = React.useCallback(
    (value) => {
      let verify = 0;
      console?.log(value)
      if (value !== '') {
        permissionList?.map(
          (data, index) => (
            // if(data?.attach_links == value){
            //   
            // }
            (data?.attach_links == value ? verify = 1 : '')


          ))

        if (verify == 0) {
          setPermissionList(permissionList => [...permissionList, { 'attach_links': value }])
        }
        // 


      }
    },
    [permissionList, permissionIdList]
  );

  const permissionDropdownChange2 = React.useCallback(
    (value) => {
      if (value !== '') {
        setPermissionList(permissionList => [...permissionList, value])


      }
    },
    []
  );


  const remove = React.useCallback(
    (value, index) => {
      if (value !== '') {
        // setPermissionList(permissionList => [...permissionList, value])
        const temp = [...permissionList];
        temp.splice(index, 1);
        setPermissionList(temp)
        // setPermissionIdList(permissionIdList => [...permissionIdList, { 'name': value }])

        // permissionIdList?.map(
        //   (data, index) => (
        //     ((data?.name === value) ?
        //       removeButton(index)

        //       :
        //       '')
        //   ),
        // )
      }
    },
    [permissionList, permissionIdList]
  );

  console?.log(permissionList)


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  py-3 border-0">
          <div className=" lg:w-10/12 w-12/12">
            <div className="w-full px-4 max-w-full pt-4 flex-grow flex-1">
              <p className="flex justify-center text-sm mb-4"> The Tiered Link service enables a web page that group all the Walinks you want under a single URL. This service is available for users with 2 or more links in their subscription plan.</p>
              <div className="grid lg:gap-40 sm:gap-2 mb-6 md:grid-cols-2">

                {/* First Section */}


                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <span className="mt-0 flex justify-center">
                      <p className=" text-black font-bold">
                        <button
                          type="button"
                          style={{ backgroundColor: '#0071BC' }}
                          className="flex mb-2 px-10 mt-2 py-1.5 text-center text-white font-xs"
                        >
                          Editor:
                        </button>
                      </p>
                    </span>
                    <div className="mt-3">
                      {/* <span className="flex justify-between mb-1">
                          <label for="first_name" class="block mb-2 text-sm font-bold text-gray-900">Your multi link</label>
                          <span className=" cursor-pointer"><SvgElement type={icontypesEnum.MORE} /></span>
                        </span> */}

                      <span className="cursor-pointer">
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
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                {imageList?.length ? '' : <span className="flex justify-center mx-20 p-6 rounded-full"> <div> <img src={configs?.imageUrl + multiLinks?.multiLinks?.logo} className="flex justify-center rounded-[100px]" />  </div> </span>}

                              </button>
                              &nbsp;
                              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                              {imageList.map((image, index) => (
                                <div key={index} className="image-item rounded-full">
                                  <div className="flex justify-center">
                                    <img src={image['data_url']} alt="" className=" mx-32 rounded-3xl max-h-20 max-w-sm" />
                                  </div>

                                  <div className="image-item__btn-wrapper flex justify-center">
                                    <button type="button" onClick={() => onImageUpdate(index)}>update</button> | &nbsp;
                                    <button type="button" onClick={() => onImageRemove(index)}>remove</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </ImageUploading>
                      </span>
                      <label for="first_name" class="block mb-2 text-sm  text-gray-900 dark:text-gray-600"></label>
                      <input type="text" disabled defaultValue={multiLinks?.multiLinks?.name} onChange={(e) => setName(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mt-1 block w-full p-2.5" placeholder="username" style={{ backgroundColor: '#F4FBFF' }} required />
                      {/* {(name.length <= 0) ? <div className="text-xs my-2 ml-1"> gupta.ink/</div> : (nameExist > 0 ? <span className="text-xs text-red-500">Name already exist</span> : <span className="text-xs text-[#0071BC]">Name Available</span>)} */}

                      <div className="flex justify-start gap-2 pt-4">
                        <span> <SvgElement type={icontypesEnum.QRCODE} /> </span>
                        <span> <SvgElement type={icontypesEnum.COPY} /> </span>
                        <span> <SvgElement type={icontypesEnum.UPARROW} /> </span>
                        <span className=" cursor-pointer" > <SvgElement type={icontypesEnum.DELETE} /> </span>
                        {/* <label className=""> <SvgElement type={icontypesEnum.DELETE} /> </label>  */}

                      </div>

                      <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Title</label>
                      <input type="text" defaultValue={title} onChange={(e) => setTitle(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Title of business here" style={{ backgroundColor: '#F4FBFF' }} />
                      <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Bio</label>
                      <textarea id="message" defaultValue={bio} onChange={(e) => SetBio(e?.target?.value)} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Bio" style={{ backgroundColor: '#F4FBFF' }}></textarea>
                      <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Add link</label>

                      <div>
                        <select onChange={(e) => { setAddLink(e?.target?.value); permissionDropdownChange(e?.target?.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                          <option value={''}>Select link</option>
                          {
                            permissionIdList.map(
                              (data2, index) => (
                                <option value={data2?.name}>{data2?.name}</option>
                              )
                            )

                          }

                        </select>
                      </div>

                      <div className="mt-4">
                        {permissionList?.map(
                          (data, index) => (
                            <div key={index}>
                              <span
                                style={{ backgroundColor: '#0071BC' }}
                                className="flex mx-0 mb-2 justify-between px-2 py-1.5 text-center text-white hover:bg-green-800  font-medium rounded-lg  "
                              >
                                <span>{data?.attach_links}</span>
                                <span className=" rounded-lg px-1 cursor-pointer" onClick={() => remove(data?.attach_links, index)} style={{ backgroundColor: 'white', color: 'blue' }}>X</span>

                              </span>

                            </div>
                          ))}
                      </div>

                      <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Busines website</label>
                      <input type="text" defaultValue={businessSite} onChange={(e) => setBusinessSite(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="https:// busines website" />


                      <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Business policy</label>
                      <input type="text" defaultValue={businessPolicy} onChange={(e) => setBusinessPolicy(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Business policy" />

                    </div>
                    {/* {nameExist > 0 ? <span className="text-xs text-red-500">Name already exist</span> : <span className="text-xs text-green-500">Name Available</span>} */}

                    <div className="flex justify-center">
                      <button

                        type="submit"
                        style={{ backgroundColor: '#0071BC' }}
                        className="px-4 cursor-pointer mb-2 mt-2 py-1.5 text-center text-white font-xs rounded-lg"
                      >
                        Update Multilink
                      </button>
                    </div>

                  </div>
                </form>



                {/* Second Section */}



                <div className="mb-4">
                  <p className=" text-black mb-5 font-bold flex justify-center">
                    <button
                      type="button"
                      style={{ backgroundColor: '#0071BC' }}
                      className="flex mb-2 px-10 mt-2 py-1.5 text-center text-white font-xs"
                    >
                      Preview:
                    </button>
                  </p>
                  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
                    <div class="mb-20 mt-4">
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
                              disabled={imageList?.length ? true : false}
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={null}
                              {...dragProps}
                            >
                              {imageList?.length ? '' : <span className="flex justify-center mx-20 p-6 rounded-full"> <div> <img src={configs?.imageUrl + multiLinks?.multiLinks?.logo} className="flex justify-center rounded-[100px]" />  </div> </span>}

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

                      <h5 class=" flex justify-center mb-2 text-md pt-5 font-bold tracking-tight text-gray-900 ">{title == '' ? "Title" : title} </h5>

                      <div className="flex justify-center mb-2 mx-2">
                        <p >{bio == '' ? "Bio" : bio}</p>
                      </div>


                      {permissionList?.map(
                        (data, index) => (
                          <a href={`http://localhost:8000/${data?.attach_links}`} target="_blank" key={index}>
                            <span
                              style={{ backgroundColor: '#0071BC' }}
                              className="flex mx-5 mb-2 justify-center px-10 py-1.5 cursor-pointer text-white hover:bg-blue-800  font-medium rounded-lg  "
                            >
                              <span className="flex justify-between">
                                <span><SvgElement type={icontypesEnum.WHATSAPP} /> </span>
                                <span>{data?.attach_links}</span>

                              </span>

                            </span>

                          </a>
                        ))}


                    </div>
                    <hr className="mb-[26px]" />

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

                  </div>

                  <div className="flex justify-center mt-3" >
                    <span style={{ fontSize: '16px', fontWeight: '300' }}>Powered By Gupta</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

        </div>
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
