
import React, { useState } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';

// components

export default function CardTiredLinks() {

  const [images, setImages] = React.useState('');
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [nameExist, setNameExist] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [logo, setlogo] = useState('');
  const [bio, SetBio] = useState('');
  const [addlink, setAddLink] = useState('');
  const [businessSite, setBusinessSite] = useState('');
  const [businessPolicy, setBusinessPolicy] = useState('');
  const [data, setLinks] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  React.useEffect(() => {
    AdminApis.getAllLinks().then(
      (response) => {
        if (response?.data) {
          setLinks(response?.data)
        }
      }
    );

  }, []);

  React.useEffect(() => {
    AdminApis.searchName({ 'name': name }).then(
      (response) => {
        if (response?.data) {
          setNameExist(response?.data?.data)
        }
      }
    );

  }, [name, nameExist]);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('name', name.replace(/ /g, ''))
      formData.append('title', title)
      formData.append('bio', bio)
      formData.append('logo', images[0]?.data_url)
      formData.append('redirect_link', addlink)
      formData.append('business_website', businessSite)
      formData.append('business_policy', businessPolicy)
      AdminApis.createTieredLink(formData).then(
        (response) => {
          if (response?.data) {
            console.log(response?.data)
            toast.success(response?.data?.message);
          } else {
            toast.error('link name already in use');
          }

          // toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error
        // console.log(error.response);
        toast.error("Offfline");
      }).finally(() => {
        //toast.error("No Internet Connection");

      })
    },
    [title, bio, name, addlink, businessPolicy, businessSite]
  );

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  py-3 border-0">
          <div className=" lg:w-10/12 w-12/12">
            <div className="w-full px-4 max-w-full pt-4 flex-grow flex-1">
              <p className="flex justify-center text-sm mb-4"> The Tiered Link service enables a web page that group all the Walinks you want under a single URL. This service is available for users with 2 or more links in their subscription plan.</p>
              <div className="grid lg:gap-40 sm:gap-2 mb-6 md:grid-cols-2">

                {/* First Section */}
                {isAvailable ?
                  <form onSubmit={null}>
                    <div className="mb-4">
                      <span className="mt-20">
                        <p
                          className=" text-black font-bold"
                        >
                          Editor:
                        </p>
                      </span>
                      <div className="mt-3">
                        <label for="first_name" class="block mb-2 text-sm  text-gray-900 dark:text-gray-600">Search for your tiered link URL first</label>
                        <input type="text" defaultValue={name} onChange={(e) => setName(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="uforo.link/ username" required />
                      </div>
                      {nameExist > 0 ? <span className="text-xs text-red-500">Name already exist</span> : <span className="text-xs text-green-500">Name Available</span>}

                      <button
                        disabled={nameExist === 1 ? true : false}
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className="flex w-7/12 mb-2 px-10 mt-2 py-1.5 text-center text-white hover:bg-green-800  font-xs rounded-lg  "
                      >
                        Reserve Tiered Link
                      </button>

                      <label for="first_name" class="block mb-2 text-xs text-gray-600 ">The URL wont use links from your subscription plan</label>
                    </div>
                  </form>


                  :

                  <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                      <span className="mt-20">
                        <p
                          className=" text-black font-bold"
                        >
                          Editor:
                        </p>
                      </span>
                      <div className="mt-3">
                        <span className="flex justify-between mb-1">
                          <label for="first_name" class="block mb-2 text-sm font-bold text-gray-900">Your tiered link</label>
                          <span className=" cursor-pointer"><SvgElement type={icontypesEnum.MORE} /></span>
                        </span>

                        <span className=" cursor-pointer">
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
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  <span className=" cursor-pointer"><SvgElement type={icontypesEnum.UPLOADIMAGE} /></span>
                                </button>
                                &nbsp;
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                {imageList.map((image, index) => (
                                  <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                      <button onClick={() => onImageUpdate(index)}>Update</button> | &nbsp;
                                      <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </ImageUploading>
                        </span>
                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Your tiered link</label>
                        <input type="text" defaultValue={name} onChange={(e) => setName(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="uforo.link/ username" required />
                        {nameExist > 0 ? <span className="text-xs text-red-500">Name already exist</span> : <span className="text-xs text-green-500">Name Available</span>}
                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Title</label>
                        <input type="text" defaultValue={title} onChange={(e) => setTitle(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Title" />
                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Bio</label>
                        <textarea id="message" defaultValue={bio} onChange={(e) => SetBio(e?.target?.value)} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Bio" style={{ backgroundColor: '#F5F5F5' }}></textarea>
                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Add link</label>

                        <div>
                          <select onChange={(e) => setAddLink(e?.target?.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>technology</option>

                           
                                {data?.link?.filter(data => data?.type !== 'tiered').map(
                                  (data, index) => (
                                    <option value={data?.name}>{data?.name}</option>
                                  )
                                )}
                            
                          </select>
                        </div>

                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Busines website</label>
                        <input type="text" defaultValue={businessSite} onChange={(e) => setBusinessSite(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="https:// busines website" />


                        <label for="first_name" class="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Business policy</label>
                        <input type="text" defaultValue={businessPolicy} onChange={(e) => setBusinessPolicy(e?.target?.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Business policy" />

                      </div>
                      {/* {nameExist > 0 ? <span className="text-xs text-red-500">Name already exist</span> : <span className="text-xs text-green-500">Name Available</span>} */}

                      <button
                        disabled={nameExist === 1 ? true : false}
                        type="submit"
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className="flex w-7/12 mb-2 px-10 mt-2 py-1.5 text-center text-white hover:bg-green-800  font-xs rounded-lg  "
                      >
                        Create Tiered Link
                      </button>
                    </div>
                  </form>
                }


                {/* Second Section */}



                <div className="mb-4">
                  <p
                    className=" text-black mb-5 font-bold"
                  >
                    Preview:
                  </p>
                  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
                    <div class="p-5">
                      <span className="flex justify-center mx-32 p-6 py-10 bg-gray-200 rounded-full"></span>

                      <h5 class=" flex justify-center mb-2 text-md pt-5 font-bold tracking-tight text-gray-900 ">Title</h5>
                      <p className="flex justify-center mb-2">Bio</p>


                      <span
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className="flex mx-5 mb-2 justify-center px-10 py-1.5 text-center text-white hover:bg-green-800  font-medium rounded-lg  "
                      >
                        update
                      </span>

                      <span
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className="flex mx-5 mb-2 justify-center px-10 py-1.5 text-center text-white hover:bg-green-800  font-medium rounded-lg  "
                      >
                        update
                      </span>

                      <span
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className="flex mx-5 mb-2 justify-center px-10 py-1.5 text-center text-white hover:bg-green-800  font-medium rounded-lg  "
                      >
                        update
                      </span>



                    </div>
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
