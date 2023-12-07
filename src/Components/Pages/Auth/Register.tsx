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

function Register() {

  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState<any>("");

  // initialValue
  const initialValue = {
    email: "",
    fullName: "",
    phoneNo: "",
    gender: "",
    password: "",
    comfirmPassword: "",
    phone_number:"",
    checked: false,
  };

  const [userData, setUserdata] = useState({
    'name': "",
    'fullName': "",
    'email': "",
    'password': "",
    'confirm_password': "",
    'phone_number':"",
    'checked': false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  // console.log(userData);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state: any) => state.data.login.value);

  // This is used to update the store
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = React.useCallback(
   (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(userData?.password !== userData?.confirm_password){
      return  toast.error("Password does not match");
    }

    const formData = new FormData()
    formData.append('name', userData?.name)
    formData.append('email', userData?.email)
    formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber).replace(/ /g, ''))
    formData.append('password', userData?.password)
    console.log(formData)
   
    AuthApis.register(formData).then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          console.log(response.data)

          if (response?.data?.status === true) {
            dispatch(login({ email: userData?.email, token: response.data.token,name:response.data.name}))
            toast.success("Login Successful");
            navigate('/mylinks');
            window.location.reload();
          }

        } else {
          toast.warn('Invalid Login Credentials');
        }

        toast.success(response?.data?.message);
      }
    ).catch(function (error) {
      // handle error
      console.log(error.response.data);
      toast.error("Offfline");
    }).finally(() => {
     
    });
  },
  [userData,phone]
);




  //   console.log(userData);
  return (
    <>
      <Navbar />
      <div className="pb-32 md:mt-10 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className="border py-6 rounded-lg px-6">
            <div className=" ">
              <h1 className=" my-4 text-xl font-semibold text-gray-600">Sign up</h1>

            </div>

            <div className="mt-2">
              <form onSubmit={handleSubmit} className="">

              <div className="mb-6 ">
                  <label
                    htmlFor="email"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400 "
                  >
                    Brand/Business Name
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="name"
                    className="flex justify-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5 "
                    placeholder="Eg. Mark Store"
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
                    // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhone}
                    placeholder={'Enter Mobile Number'}
                  />

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
                      className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
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
                    htmlFor="password"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-400"
                  >
                   Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      name="confirm_password"
                      className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
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
                    <input  id="green-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="green-checkbox" className="ml-2 text-xs font-small text-gray-900 dark:text-gray-400">I accept the <b>terms of service</b> and <b>privacy policy</b> </label>
                  </div>
                </div>

                < span className="flex justify-center w-80">

                  <button
                    type="submit"
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-96 px-5 py-2.5 text-center "
                  >
                    Sign up
                  </button>
                </span>
                <NavLink to='/login' className="flex justify-center">
                  <p className="ml-2 mt-3 text-sm font-medium text-gray-400 ">Already have an account? <a href="/login" className="text-[#0071BC] hover:underline ">Log in</a></p>
                </NavLink>
               
              </form>


            </div>
          </div>
        </div>
        {/* <button
                 
                  onClick={getdata}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  getData
                </button> */}
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

export default Register;
