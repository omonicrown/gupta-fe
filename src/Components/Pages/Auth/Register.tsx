import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../reducer/loginSlice'
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { AuthLiveApis } from "../../../apis/live/authLiveApis";
import { AuthApis } from "../../../apis/authApis";
import { store } from "../../../store/store";
import { History } from "history";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Navbars/Navbar";
//@ts-ignore
import { PhoneInput } from "react-contact-number-input";
import { Oval } from "react-loader-spinner";

function Register() {

  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState<any>("");
  const [loader, setLoader] = useState(false);

  // Updated user data state to include service_type
  const [userData, setUserdata] = useState({
    'name': "",
    'fullName': "",
    'email': "",
    'password': "",
    'confirm_password': "",
    'phone_number': "",
    'service_type': "", // NEW FIELD
    'checked': false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state: any) => state.data.login.value);

  // This is used to update the store
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoader(true);

      if (userData?.password !== userData?.confirm_password) {
        setLoader(false);
        return toast.error("Password does not match");
      }

      // NEW VALIDATION: Check if service type is selected
      if (!userData?.service_type) {
        setLoader(false);
        return toast.error("Please select a service type");
      }

      const formData = new FormData()
      formData.append('name', userData?.name)
      formData.append('email', userData?.email)
      formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber).replace(/ /g, ''))
      formData.append('password', userData?.password)
      formData.append('service_type', userData?.service_type) // NEW FIELD
      console.log(formData)

      AuthApis.register(formData).then(
        (response: AxiosResponse<any>) => {
          if (response?.data) {
            setLoader(false);

            if (response?.data?.status === true) {
              // UPDATED: Include service_type in the login dispatch
              dispatch(login({
                email: userData?.email,
                token: response.data.token,
                name: response.data.name,
                service_type: userData?.service_type // Pass service type to store
              }))
              toast.success("Registration Successful");
              navigate('/email-verify');
            }

          } else {
            setLoader(false);
            toast.warn('Registration Failed');
          }
          setLoader(false);
          toast.success(response?.data?.message);
        }
      ).catch(function (error) {
        // handle error
        setLoader(false);
        toast.error("Something went wrong. Please try again.");
      }).finally(() => {

      });
    },
    [userData, phone, loader]
  );

  return (
    <>
      <Navbar />
      <div className="pb-32 mt-32 lg:mt-20 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className="border py-6 rounded-lg px-6">
            <div className=" ">
              <h1 className=" my-4 text-xl font-semibold text-gray-600">Sign up</h1>
            </div>

            <div className="mt-2">
              <form onSubmit={handleSubmit} className="">

                <div className="mb-6 ">
                  <label
                    htmlFor="brand"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400 "
                  >
                    Brand/Business Name
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="name"
                    className="flex justify-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5 "
                    placeholder="Eg. Sammie Store"
                    defaultValue={email}
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="mb-6 ">
                  <label
                    htmlFor="email"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="flex justify-center shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5 "
                    placeholder="Email"
                    defaultValue={email}
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="number"
                    className="flex justify-start mb-2 text-sm font-sm text-gray-500 "
                  >
                    Your Whatsapp phone number
                  </label>
                  <PhoneInput
                    style={{ backgroundColor: '#F4FBFF' }}
                    disabled={false}
                    countryCode={'ng'}
                    onChange={setPhone}
                    placeholder={'Enter Mobile Number'}
                  />
                </div>

                {/* NEW SERVICE SELECTION DROPDOWN */}
                <div className="mb-6">
                  <label
                    htmlFor="service_type"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400"
                  >
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5"
                    value={userData.service_type}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value="">Choose a service...</option>
                    <option value="whatsapp">WhatsApp Links & Marketplace</option>
                    <option value="sms">SMS Platform</option>
                    <option value="all">All Services</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    You can change this later in your account settings
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      name="password"
                      className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required={true}
                      defaultValue={password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className=" absolute right-2.5 bottom-3"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {!show ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirm_password"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      placeholder="Confirm Password"
                      id="confirm_password"
                      name="confirm_password"
                      className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required={true}
                      defaultValue={password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className=" absolute right-2.5 bottom-3"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {!show ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mb-4 w-80">
                  <div className="flex items-center mb-4">
                    <input
                      id="green-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="green-checkbox" className="ml-2 text-xs font-small text-gray-900 dark:text-gray-400">
                      I accept the <b>terms of service</b> and <b>privacy policy</b>
                    </label>
                  </div>
                </div>

                <span className="flex justify-center w-80">
                  <button
                    type="submit"
                    disabled={loader}
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-96 px-5 py-2.5 text-center "
                  >
                    <div className="flex justify-center gap-3 ">
                      <span>Sign up</span>
                      <Oval
                        visible={loader}
                        height="20"
                        width="20"
                        color="#0071BC"
                        secondaryColor="#FCBF94"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  </button>
                </span>
                <NavLink to='/login' className="flex justify-center">
                  <p className="ml-2 mt-3 text-sm font-medium text-gray-400 ">
                    Already have an account? <a href="/login" className="text-[#0071BC] hover:underline ">Log in</a>
                  </p>
                </NavLink>

              </form>
            </div>
          </div>
        </div>
      </div>

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

export default Register;