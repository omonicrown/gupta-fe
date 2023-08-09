import React from "react";
import { FaMapMarker } from "react-icons/fa";
import { AdminApis } from "../../apis/adminApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { HostelApis } from "../../apis/hostelApis";
import configs from "../../configs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Modal from 'react-awesome-modal';

// components

export default function UpdateUsers() {
    const params = useParams();
    const navigate = useNavigate();

    let [visible, setVisible] = React.useState(false);
    function toggleModal() {
      setVisible(!visible)
    }

    const houseId = params?.houseId;
    let [images, setImages] = React.useState([]);
    let [data, setdata] = React.useState([])

    React.useEffect(() => {
        HostelApis.getHostelById(houseId).then(
            (response) => {
                if (response?.data) {

                    setdata(response?.data?.data)
                    console.log(response?.data?.data)
                    const groupDropDown = response?.data?.data?.map(
                        (group) => ({ pics1: group.pics_1, pics2: group.pics_2, pics3: group.pics_3, pics4: group.pics_4, agentId: group?.agent_id }
                        ));
                    setImages(groupDropDown[0])
                    //setImages({...images,[pics1:]})
                }
            }
        );

    }, []);

    const deleteHouse = React.useCallback(
        (e) => {
          e.preventDefault();
        
          AdminApis.deleteHouse(houseId).then(
            (response) => {
              if (response?.data) {
                console.log(response?.data?.data)
                toast.success(response?.data?.message);
                navigate('/houses');
              }
            }
          );
        },
        []
      );

    React.useMemo(() => {
        const groupDropDown = data?.map(
            (group) => ({ pics1: group.pics_1, pics2: group.pics_2, pics3: group.pics_3, pics4: group.pics_4, agentId: group?.agent_id }
            ));
        setImages(groupDropDown[0])
        return groupDropDown;
    }, [data]);


    return (
        <>
            <button  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right mx-4 mt-6">Edit</button>
            <button onClick={toggleModal} type="button" class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 float-right mx-2 mt-6">Delete</button>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 py-9">
                <div className="flex md:pl-44 md:pr-44 pt-10">

                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >

                        <SwiperSlide>
                            <img
                                className="object-fill w-full h-96"
                                src={configs?.imageUrl + images?.pics1}
                                alt="image slide 1"
                            />
                            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                HouseNg.com</h3>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img
                                className="object-fill w-full h-96"
                                src={configs?.imageUrl + images?.pics2}
                                alt="image slide 2"
                            />
                            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                HouseNg.com</h3>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img
                                className="object-fill w-full h-96"
                                src={configs?.imageUrl + images?.pics3}
                                alt="image slide 3"
                            />
                            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                HouseNg.com</h3>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img
                                className="object-fill w-full h-96"
                                src={configs?.imageUrl + images?.pics4}
                                alt="image slide 4"
                            />
                            <h3 className="absolute text-5xl text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                HouseNg.com</h3>
                        </SwiperSlide>


                    </Swiper>


                </div>




                <div className="container flex justify-start lg:pl-44 lg:pr-44 pt-10 px-3">
                    <div className="">
                        <h2 className="text-2xl font-semibold capitalize underline underline-offset-8 mb-3">Information about the house</h2>
                        <div className="inline-flex items-center">
                              <span style={{border: '2px solid #335ef7'}} className=" text-[#335ef7] text-lg font-semibold inline-flex items-center p-1.5 mr-2 rounded-full ">
                                <FaMapMarker />    </span>
                              <h3 className="text-xs">South Gate, Akure</h3>
                            </div>
                        <h1 className="mt-3 bg-[#335ef7] text-white text-center py-2 font-bold text-3xl rounded-lg">₦ 150,000</h1>
                    </div>
                </div>

                <div className="container flex flex-col lg:flex-row lg:justify-between lg:pl-44 lg:pr-40 pt-10 px-3">
                    <div className="basis-1/2">
                        <p className="">A standard well built 2 bedroom flat for rent at South Gate. Well secured area, all road tarred. Nice neighborhood with stable power supply and water.</p>
                    </div>
                    <div className="basis-1/4">
                        <h1 className="text-2xl font-semibold mt-3">Summary</h1>
                        <h3 className="font-semibold text-lg mt-5">House Type : <span className="font-normal text-base">Self Contained</span></h3>
                        <h3 className="font-semibold text-lg">Category : <span className="font-normal text-base">Furnished</span></h3>
                        <h3 className="font-semibold text-lg">State : <span className="font-normal text-base">Ondo</span></h3>
                        <h3 className="font-semibold text-lg">City : <span className="font-normal text-base">Akure</span></h3>
                        <h3 className="font-semibold text-lg">Bedrooms : <span className="font-normal text-base">2</span></h3>
                        <h3 className="font-semibold text-lg">Toilets : <span className="font-normal text-base">2</span></h3>
                        <h3 className="font-semibold text-lg">Electricity : <span className="font-normal text-base">Prepaid Meter</span></h3>
                        <h3 className="font-semibold text-lg">Water : <span className="font-normal text-base">Bore Hole</span></h3>
                        <h3 className="font-semibold text-lg">Business Name : <span className="font-normal text-base">Sam & son Ltd</span></h3>
                    </div>
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


            <section>
                <Modal
                    visible={visible}
                    width="800"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => toggleModal}
                >
                    <p className="flex justify-end mt-2 ml-2 mr-2 cursor-pointer font-bold" onClick={toggleModal}>X</p>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16" >
                       
                            <div className=" pb-20">
                                <div className="w-full px-4 flex justify-evenly">
                                    <div className="block">
                                        Are you sure you want to delete House?
                                    </div>
                                </div>
                                <div className="flex justify-center pt-4">
                                    <button onClick={deleteHouse} type="button" class=" block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ">Delete</button>
                                    </div>
                            </div>


                            

                       
                    </div>
                </Modal>
            </section>
        </>
    );
}
