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
import { Oval } from "react-loader-spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // How to access the redux store
  const userLoginData = useSelector((state: any) => state.data.login.value);

  // This is used to update the store
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoader(true);
      const formData = new FormData()

      formData.append('email', email)
      formData.append('password', password)

      AuthApis.login(formData).then(
        (response: AxiosResponse<any>) => {
          if (response?.data?.status === true) {
            // UPDATED: Include service_type in the login dispatch
            dispatch(login({
              email: email,
              token: response.data.token,
              name: response.data.name,
              data: response.data?.data,
              service_type: response.data?.service_type || response.data?.data?.service_type
            }))

            setLoader(false);

            // Route user based on role and service type
            if (response.data?.data?.role === 'admin') {
              navigate('/admin-dashboard')
            } else {
              // Route based on service type
              const serviceType = response.data?.service_type || response.data?.data?.service_type;

              switch (serviceType) {
                case 'sms':
                  navigate('/sms-dashboard');
                  break;
                case 'whatsapp':
                  navigate('/mylinks');
                  break;
                case 'all':
                default:
                  navigate('/mylinks'); // Default to WhatsApp for 'all' service users
                  break;
              }
            }

          } else {
            setLoader(false);
            toast.error(response?.data?.message);
          }

        }
      ).catch(function (error) {
        // handle error
        setLoader(false);
        toast.error("Something went wrong. Please try again.");
      });
    },
    [email, password, loader]
  );

  return (
    <>
      <Navbar />
      <div className="pb-32 mt-32 sm:px-10">
        <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-6">

          <div className="border py-6 rounded-lg px-6">
            <div className=" ">
              <h1 className=" my-4 text-xl font-semibold text-gray-600 text-center">Welcome Back!</h1>
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

                  <NavLink to='/forgot-password'>
                    <p className="ml-2 text-sm font-medium text-gray-400 "> <a href="#" className="text-[#0071BC] hover:underline ">Forgot Password?</a></p>
                  </NavLink>
                </div>

                <span className="flex justify-center w-80">
                  <button
                    type="submit"
                    disabled={loader}
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-96 px-5 py-2.5 text-center "
                  >
                    <div className="flex justify-center gap-3 ">
                      <span>Login</span>
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
                <NavLink to='/register' className="flex justify-center">
                  <p className="ml-2 mt-3 text-sm font-medium text-gray-400 ">Don't have an account? <a href="#" className="text-[#0071BC] hover:underline ">Create one</a></p>
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

export default Login;