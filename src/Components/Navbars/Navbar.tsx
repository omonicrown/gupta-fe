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

  // Get user's service type from Redux store
  const userServiceType = userLoginData?.data?.service_type || userLoginData?.service_type || 'all';
  const isLoggedIn = userLoginData && userLoginData.token;

  // Helper functions to check service access
  const hasWhatsAppAccess = () => {
    return ['whatsapp', 'all'].includes(userServiceType);
  };

  const hasSmsAccess = () => {
    return ['sms', 'all'].includes(userServiceType);
  };

  const hasAllServicesAccess = () => {
    return userServiceType === 'all';
  };

  const logOut = () => {
    setIslog(false)
    dispatch(login([]))
    navigate('/login');
  };

  // Function to get service-specific dashboard route
  const getDashboardRoute = () => {
    if (!isLoggedIn) return '/';

    switch (userServiceType) {
      case 'sms':
        return '/sms-dashboard';
      case 'whatsapp':
        return '/mylinks';
      case 'all':
      default:
        return '/mylinks'; // Default to WhatsApp for 'all' service users
    }
  };

  return (
    <div className=" w-full fixed z-20 top-0 left-0">
      <nav className="bg-white sm:px-4 w-full z-20 top-0 left-0 shadow-md py-4 md:py-0 px-5" >
        <div className=" flex justify-between  mx-auto">
          <div className=" md:px-16 px-1">
            <NavLink to={isLoggedIn ? getDashboardRoute() : '/'}>
              <div className="self-center pt-3 text-2xl font-semibold whitespace-nowrap">
                <SvgElement type={icontypesEnum.BARS} />
              </div>
            </NavLink>
          </div>

          <div className="flex md:order-2">
            {/* Navigation menu for non-logged in users */}
            {!isLoggedIn && (
              <div className="hidden lg:flex flex-col justify-center font-medium md:flex-row lg:space-x-3 mr-[300px]">
                <NavLink to='/'>
                  <div className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 ">
                    Home
                  </div>
                </NavLink>

                <NavLink to='/pricing'>
                  <div className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 ">
                    Pricing
                  </div>
                </NavLink>

                <NavLink to='/faq'>
                  <div className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 ">
                    FAQ
                  </div>
                </NavLink>

                <NavLink to='/product-demo'>
                  <div className=" hover:bg-gray-100 font-medium rounded-lg text-[16px] pl-8 pr-8 mt-3 p-2 text-center mr-1 md:mr-1 ">
                    Product Demo
                  </div>
                </NavLink>
              </div>
            )}

            {/* Logged-in user actions */}
            {isLoggedIn ? (
              <span className="hidden md:flex justify-center items-center gap-3">
                {/* Service Type Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    {userServiceType === 'sms' && (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                          <path fill="#0071BC" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">SMS Platform</span>
                      </>
                    )}

                    {userServiceType === 'whatsapp' && (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                          <path fill="#25D366" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">WhatsApp</span>
                      </>
                    )}

                    {userServiceType === 'all' && (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                          <path fill="#0071BC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-600">All Services</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Subscription/Upgrade button - Only show for WhatsApp users */}
                {hasWhatsAppAccess() && (
                  <NavLink to='/subscription'>
                    <div className="relative bg-blue-200 flex font-bold rounded-lg border-[2px] px-3 py-1 items-center hover:bg-blue-300 transition-colors">
                      <span className="mr-1">👑</span>
                      <span className="text-sm">Upgrade</span>
                      {/* Show subscription expiry warning if applicable */}
                      {userLoginData?.data?.sub_status === 'trial' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                  </NavLink>
                )}

                {/* SMS Wallet button - Only show for SMS users */}
                {hasSmsAccess() && (
                  <NavLink to='/sms-wallet'>
                    <div className="relative bg-green-200 flex font-bold rounded-lg border-[2px] px-3 py-1 items-center hover:bg-green-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                        <path fill="#059669" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      <span className="text-sm text-green-800">SMS Wallet</span>
                    </div>
                  </NavLink>
                )}

                {/* Settings */}
                <NavLink to='/editprofile'>
                  <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <SvgElement type={icontypesEnum.SETTINGS} />
                  </div>
                </NavLink>

                {/* Logout */}
                <button
                  onClick={logOut}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </span>
            ) : (
              /* Login/Signup buttons for non-logged in users */
              <span className="hidden md:flex justify-center">
                <NavLink to='/login'>
                  <div className=" hover:bg-gray-100 focus:outline-none focus:ring-4  focus:ring-gray-200 font-medium rounded-lg text-sm px-1 mt-3 p-2 text-center mr-1 md:mr-1 ">
                    Log in
                  </div>
                </NavLink>

                <NavLink to="/Register">
                  <div className="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-3 ">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                      className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
                    >
                      Sign up
                    </button>
                  </div>
                </NavLink>
              </span>
            )}

            {/* Mobile signup button and hamburger menu */}
            <span className="flex justify-end">
              {!isLoggedIn && (
                <NavLink to="/Register" className={' md:hidden'}>
                  <div className="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm  py-1.5 text-center mr-1">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0071BC', borderRadius: '10px' }}
                      className=" text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm  px-2 py-1.5 text-center "
                    >
                      Sign up
                    </button>
                  </div>
                </NavLink>
              )}

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
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
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

        {/* Mobile menu */}
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

                {/* Mobile menu for logged-in users */}
                {isLoggedIn ? (
                  <>
                    {/* Service indicator */}
                    <div className="flex items-center py-3 border-b">
                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                        {userServiceType === 'sms' && (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                              <path fill="#0071BC" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600">SMS Platform</span>
                          </>
                        )}

                        {userServiceType === 'whatsapp' && (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                              <path fill="#25D366" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600">WhatsApp</span>
                          </>
                        )}

                        {userServiceType === 'all' && (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                              <path fill="#0071BC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600">All Services</span>
                          </>
                        )}
                      </div>
                    </div>

                    <NavLink
                      to={getDashboardRoute()}
                      className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <hr className="pb-3" />

                    {/* WhatsApp specific links */}
                    {hasWhatsAppAccess() && (
                      <>
                        <NavLink
                          to="/subscription"
                          className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                        >
                          👑 Upgrade Plan
                        </NavLink>
                        <hr className="pb-3" />
                      </>
                    )}

                    {/* SMS specific links */}
                    {hasSmsAccess() && (
                      <>
                        <NavLink
                          to="/sms-wallet"
                          className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                        >
                          💳 SMS Wallet
                        </NavLink>
                        <hr className="pb-3" />
                      </>
                    )}

                    <NavLink
                      to="/editprofile"
                      className="block text-[#616161] py-3 font-bold hover:bg-gray-100"
                    >
                      Settings
                    </NavLink>

                    <button
                      onClick={logOut}
                      className="block text-red-600 py-3 font-bold hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  /* Mobile menu for non-logged in users */
                  <>
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
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>

      </nav>
    </div>
  );
}

export default Navbar;