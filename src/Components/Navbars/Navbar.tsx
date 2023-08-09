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
    <div>
      <nav className="bg-white sm:px-4 w-full z-20 top-0 left-0 shadow-md">
        <div className=" flex justify-between  mx-auto">
          <div className=" md:px-16 px-1">

            <NavLink to='/'>
              <div className="self-center pt-3 text-2xl font-semibold whitespace-nowrap">
                <SvgElement type={icontypesEnum.BARS} />
              </div>
            </NavLink>
          </div>
          <div className="flex md:order-2">
            
              <span className="hidden md:flex justify-center">
                <NavLink to='/login'>
                  <div
                    className=" hover:bg-gray-100 focus:outline-none focus:ring-4  focus:ring-gray-200 font-medium rounded-lg text-sm px-5 mt-3 p-2 text-center mr-3 md:mr-3 "
                  >
                    Log in
                  </div>
                </NavLink>

                <NavLink to="/proplan">
                  <div
                    className="text-white focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-3 "
                  >
                    <SvgElement type={icontypesEnum.PREMIUM} />
                  </div></NavLink>
              </span>

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
            <div className="md:hidden bg-white w-full mt-3" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               
              
                <NavLink
                  to="/login"
                  className="block py-2 pr-4 pl-3 mx-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#6692d7] md:p-0"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="block py-2 pr-4 pl-3 mx-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#6692d7] md:p-0"
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
