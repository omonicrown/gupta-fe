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


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state: any) => state.data.login.value);

  // This is used to update the store
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData()

      formData.append('email', email)
      formData.append('password', password)

      AuthApis.login(formData).then(
        (response: AxiosResponse<any>) => {
          if (response?.data) {
            if (response?.data?.status === true) {
              dispatch(login({ email: email, token: response.data.token, name: response.data.name, data: response.data?.data }))
                // navigate('/mylinks');
                console?.log(response.data?.data?.role)
                {response.data?.data?.role == 'admin'
                  ? navigate('/admin-dashboard')
                  :
                  navigate('/mylinks')}
                

              console?.log(response.data?.data?.role)
              // window.location.reload();
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
        // toast.error("No Internet Connection");

      });
    },
    [email, password]
  );



  return (
    <>
      <Navbar />
      <div className="pb-32 md:mt-32 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className="border py-6 rounded-lg px-6">
            <div className=" ">
              <h1 className=" my-4 text-xl font-semibold text-gray-600">Log in</h1>

            </div>

            <div className="mt-2 ">
              <form onSubmit={handleSubmit} className="">
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
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
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
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                      required={true}
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <input id="green-checkbox" type="checkbox" value="" className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="green-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Remember me</label>
                  </div>

                  <NavLink to='/resetpassword'>
                    <p className="ml-2 text-sm font-medium text-gray-400 "> <a href="#" className="text-[#0071BC] hover:underline ">Forgot Password?</a></p>
                  </NavLink>

                </div>



                < span className="flex justify-center w-80">

                  <button
                    type="submit"
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-96 px-5 py-2.5 text-center "
                  >
                    Log In
                  </button>
                </span>
                <NavLink to='/register' className="flex justify-center">
                  <p className="ml-2 mt-3 text-sm font-medium text-gray-400 ">Don't have an account? <a href="#" className="text-[#0071BC] hover:underline ">Create one</a></p>
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

export default Login;
