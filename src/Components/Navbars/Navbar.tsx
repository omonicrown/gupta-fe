import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { login } from '../../reducer/loginSlice'
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { SvgElement, icontypesEnum } from "../assets/svgElement";



function Navbar() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIslog] = useState(false);

  const userLoginData = useSelector((state: any) => state.data.login.value);



  const logOut = () => {
    setIslog(false)
    dispatch(login([]))
    navigate('/login');
  };

  return (
    <div className=" w-full fixed z-20 top-0 left-0">
      <nav className="bg-white sm:px-4 w-full z-20 top-0 left-0 shadow-md py-4 md:py-0 px-5" >
        <div className=" flex justify-between  mx-auto">
          <div className=" md:px-16 px-1">

            <NavLink to='/'>
              <div className="self-center pt-3 text-2xl font-semibold whitespace-nowrap">
                <SvgElement type={icontypesEnum.BARS} />
              </div>
            </NavLink>
          </div>
          <div className="flex md:order-2">
            <div className="hidden lg:flex flex-col justify-center font-medium md:flex-row lg:space-x-3 mr-[300px]">
              {/* <NavLink to='/'>
                  <div
                    className="hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 "
                    
                 >
                   About Us
                  </div>
                </NavLink> */}
              <NavLink to='/'>
                <div
                  className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 "
                >
                  Home
                </div>
              </NavLink>


              <NavLink to='/pricing'>
                <div
                  className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 "
                >
                  Pricing
                </div>
              </NavLink>
              <NavLink to='/faq'>
                <div
                  className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 "
                >
                  FAQ
                </div>
              </NavLink>
              <NavLink to='/product-demo'>
                <div
                  className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 "
                >
                  Product Demo
                </div>
              </NavLink>
            </div>

            <span className="hidden md:flex justify-center">

              <NavLink to='/login'>
                <div
                  className=" hover:bg-gray-100 focus:outline-none focus:ring-4  focus:ring-gray-200 font-medium rounded-lg text-sm px-1 mt-3 p-2 text-center mr-1 md:mr-1 "
                >
                  Log in
                </div>
              </NavLink>

              <NavLink to="/Register">
                <div
                  className="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-3 "
                >
                  <button
                    type="submit"
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
                  >
                    Sign up
                  </button>
                </div></NavLink>
            </span>


            <span className="flex justify-end">
              <NavLink to="/Register" className={' md:hidden'}>
                <div
                  className="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm  py-1.5 text-center mr-1"
                >
                  <button
                    type="submit"
                    style={{ backgroundColor: '#0071BC', borderRadius: '10px' }}
                    className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm  px-2 py-1.5 text-center "
                  >
                    Sign up
                  </button>
                </div></NavLink>

              <button
                onClick={() => setIsOpen(!isOpen)}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </span>



          </div>


        </div>


        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden bg-white w-full pl-6 pr-4 mt-3" id="mobile-menu">
              <div ref={ref} className=" pt-10 pb-3 space-y-1 ">
                <NavLink
                  to="/"
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  Home
                </NavLink>
                <hr className="pb-3" />
                <NavLink
                  to="/pricing"
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  Pricing
                </NavLink>
                <hr className="pb-3" />
                <NavLink
                  to="/faq"
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  FAQ
                </NavLink>

                <hr className="pb-3" />
                <NavLink
                  to='/product-demo'
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  Product Demo
                </NavLink>


                <hr className="pb-3" />
                <NavLink
                  to="/login"
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                >
                  Register
                </NavLink>


              </div>
            </div>


          )}
        </Transition>

      </nav>


    </div>
  );
}

export default Navbar;
