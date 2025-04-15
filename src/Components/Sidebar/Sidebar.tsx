import React from "react";
import { Link } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducer/loginSlice'
import { useNavigate } from 'react-router-dom';
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { AuthApis } from "../../apis/authApis";
import { AxiosResponse } from "axios";
import { AdminApis } from "../../apis/adminApi";
import { FiBarChart2, FiMessageSquare, FiUsers, FiChevronDown, FiChevronUp, FiList, FiHome, FiKey, FiCreditCard, FiSend, FiHash } from "react-icons/fi";

export default function Sidebar(title: any) {
  const navigate = useNavigate();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [activeTab, setActiveTab] = React.useState<"whatsapp" | "sms">("whatsapp"); // Track active tab
  const dispatch: Dispatch = useDispatch();
  const userLoginData = useSelector((state: any) => state.data.login.value);

  // Authentication checks
  React.useEffect(() => {
    AdminApis.searchName('').then(
      (response: AxiosResponse<any>) => {
        if (!response?.data) {
          dispatch(login([]))
          navigate('/login');
        }
      }
    ).catch(function (error: any) {
      console.log(error);
      console.log("new error");
    })
  }, []);

  React.useEffect(() => {
    if (userLoginData?.data?.isVerified === 'false') {
      verify();
    }
  }, []);

  // Set initial active tab based on current URL
  React.useEffect(() => {
    const isSmsRoute = isSmsRouteActive();
    setActiveTab(isSmsRoute ? "sms" : "whatsapp");
  }, []);

  const logOut = () => {
    AuthApis.logout('').then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          dispatch(login([]))
          navigate('/login');
        }
      }
    ).catch(function (error: any) {
      console.log(error.response.data);
      console.log("new error");
    })
  };

  const verify = () => {
    AuthApis.logout('').then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          dispatch(login([]))
          navigate('/email-verify');
        }
        navigate('/email-verify');
      }
    ).catch(function (error: any) {
      console.log(error.response.data);
      console.log("new error");
    })
  };

  // Check if any route is active
  const isWhatsappRouteActive = () => {
    const routes = ['/mylinks', '/redirect-links', '/multi-links', '/mini-store'];
    return routes.some(route => window.location.href.indexOf(route) !== -1);
  };

  const isSmsRouteActive = () => {
    const smsRoutes = ['/sms-dashboard', '/analytics', '/contacts', '/contact-groups', '/messages', '/sender-ids', '/api-keys', '/sms-wallet'];
    return smsRoutes.some(route => window.location.href.indexOf(route) !== -1);
  };

  const switchToWhatsappTab = () => {
    setActiveTab("whatsapp");
  };

  const switchToSmsTab = () => {
    setActiveTab("sms");
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl md:bg-[#0071BC] rounded-xl mt-2 ml-1 relative md:w-64 z-2 py-2 px-1">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white p-3 mr-1")}
          >
            <b className="fas fa-bars text-3xl"> ≡ </b><span className="text-black ">{title?.title}</span>
          </button>
          
          {/* Mobile header content */}
          <span className="flex justify-end md:hidden">
            <span className="flex flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch gap-2">
                <NavLink to='/subscription'>
                  <div className="relative bg-blue-200 flex w-full font-bold rounded-lg border-[2px] p-1 flex-wrap items-stretch">
                    👑 Upgrade
                  </div>
                </NavLink>
                <NavLink to='/editprofile'>
                  <h2 className="pt-2"><SvgElement type={icontypesEnum.SETTINGS} /></h2>
                </NavLink>
              </div>
            </span>
          </span>

          {/* Brand logo */}
          <Link
            className="hidden text-left md:pb-10 mt-10 text-blueGray-600 mr-0 md:inline-block whitespace-nowrap text-sm uppercase font-bold px-0 pl-4"
            to="/"
          >
            <SvgElement type={icontypesEnum.BARS2} />
          </Link>

          {/* Sidebar content */}
          <div
            className={
              "md:flex md:flex-col items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow bg-[#0071BC] absolute top-0 left-0 right-0 h-auto flex-1 rounded " +
              collapseShow
            }
          >
            {/* Mobile menu header */}
            <div className="md:min-w-full md:hidden block pb-1 mb-4">
              <div className="flex justify-between">
                <span className="flex justify-start gap-1" onClick={() => setCollapseShow("hidden")}>
                  <IoMdCloseCircle style={{ color: '#333333' }} className="bg-gray-200 text-xs text-gray-500 rounded-full p-1 h-6 w-6" /> 
                  <span className="text-white ml-2"></span>
                </span>
                <span
                  className="cursor-pointer opacity-50 md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <NavLink to='/editprofile'>
                    <b className="fas fa-times text-white"> <AiOutlineSetting /> </b>
                  </NavLink>
                </span>
              </div>
            </div>

            {/* Platform selection tabs */}
            <div className="flex mb-4 mx-3">
              <button 
                onClick={switchToWhatsappTab}
                className={`flex-1 py-2 px-3 text-center text-xs font-medium rounded-l-lg ${activeTab === "whatsapp" || isWhatsappRouteActive() ? 'bg-white text-[#0071BC]' : 'bg-white/10 text-white'}`}
              >
                <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-1" viewBox="0 0 24 24">
                    <path fill={activeTab === "whatsapp" || isWhatsappRouteActive() ? "#0071BC" : "white"} d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                  </svg>
                  WhatsApp
                </div>
              </button>
              <button 
                onClick={switchToSmsTab}
                className={`flex-1 py-2 px-3 text-center text-xs font-medium rounded-r-lg ${activeTab === "sms" || isSmsRouteActive() ? 'bg-white text-[#0071BC]' : 'bg-white/10 text-white'}`}
              >
                <div className="flex justify-center items-center">
                  <FiMessageSquare className="h-4 w-4 mr-1" />
                  SMS Platform
                </div>
              </button>
            </div>

            {/* Navigation menus */}
            <ul className="flex-col list-none flex bg-[#0071BC] md:mt-1 mt-2">
              
              {/* WhatsApp section */}
              {activeTab === "whatsapp" && (
                <>
                  <li className="items-center mx-3 mb-3">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/mylinks") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/mylinks") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/mylinks"
                    >
                      <span className="flex py-2.5 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Whatsapp Links</span>
                      </span>
                    </NavLink>
                  </li>

                  <li className="items-center mx-3 mb-3">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/redirect-links") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/redirect-links") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/redirect-links"
                    >
                      <span className="flex py-2.5 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M17.74 2.76a4.321 4.321 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.321 4.321 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.321 4.321 0 0 1-6.1 0a4.321 4.321 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0" /></svg>
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1 pl-2">Short Links</span>
                      </span>
                    </NavLink>
                  </li>

                  <li className="items-center mx-3 mb-3">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/multi-links") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/multi-links") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/multi-links"
                    >
                      <span className="flex py-2.5 px-2">
                        <svg width="31" height="16" viewBox="0 0 31 16" className="mr-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* SVG content remains the same */}
                          <path d="M20.0276 4.33741C20.5368 4.84845 20.8228 5.54048 20.8228 6.26193C20.8228 6.98337 20.5368 7.67541 20.0276 8.18645L19.0622 9.14555C18.3555 9.85226 17.3585 10.0731 16.4499 9.83333L18.1031 8.18645L18.5826 7.70058L19.0622 7.22103C19.5922 6.691 19.5922 5.83285 19.0622 5.30282C18.9371 5.17538 18.7878 5.07414 18.6232 5.00504C18.4585 4.93593 18.2817 4.90034 18.1031 4.90034C17.9245 4.90034 17.7477 4.93593 17.583 5.00504C17.4184 5.07414 17.2691 5.17538 17.144 5.30282L16.6581 5.78237L14.5254 7.91512C14.2919 7.0065 14.5128 6.00953 15.2195 5.30282L16.1786 4.33741C16.6896 3.82817 17.3816 3.54224 18.1031 3.54224C18.8245 3.54224 19.5166 3.82817 20.0276 4.33741ZM14.2541 11.0701L17.6235 7.70058C17.8886 7.43557 17.8886 7.0065 17.6235 6.74148C17.3459 6.47015 16.9105 6.49539 16.6581 6.74148L13.2949 10.111C13.0299 10.376 13.0299 10.8051 13.2949 11.0701C13.5726 11.3414 14.008 11.3162 14.2541 11.0701ZM13.7745 12.515L16.3868 9.89643C16.6266 10.8051 16.4057 11.802 15.699 12.5087L14.7399 13.4741C14.2289 13.9834 13.5368 14.2693 12.8154 14.2693C12.0939 14.2693 11.4019 13.9834 10.8909 13.4741C10.3816 12.9631 10.0957 12.2711 10.0957 11.5496C10.0957 10.8282 10.3816 10.1361 10.8909 9.62511L11.8563 8.666C12.563 7.95929 13.56 7.73844 14.4686 7.97191L11.8563 10.5905C11.3199 11.1206 11.3199 11.9787 11.8563 12.515C12.3863 13.0451 13.2445 13.0451 13.7745 12.515Z" fill="white" />
                          <g clipPath="url(#clip0_757_439)">
                            <path d="M1.9598 4.6015C2.3761 4.01228 3.00896 3.61208 3.71975 3.48855C4.43054 3.36502 5.16132 3.52824 5.752 3.94245L6.86225 4.72939C7.67952 5.30466 8.06781 6.24908 7.98716 7.18535L6.08153 5.83855L5.52073 5.44927L4.96615 5.05891C4.35319 4.62746 3.50771 4.7744 3.07626 5.38735C2.97212 5.53244 2.89794 5.69682 2.85805 5.8709C2.81816 6.04498 2.81337 6.22526 2.84395 6.40121C2.87453 6.57716 2.93987 6.74525 3.03615 6.89567C3.13243 7.04608 3.25772 7.1758 3.40471 7.27724L3.96037 7.67381L6.4268 9.40989C5.57156 9.79549 4.55151 9.7486 3.73423 9.17334L2.61885 8.3937C2.02963 7.9774 1.62943 7.34454 1.5059 6.63375C1.38237 5.92296 1.54559 5.19218 1.9598 4.6015ZM9.58161 9.13701L5.68495 6.39421C5.37847 6.17849 4.95573 6.25195 4.74001 6.55843C4.52023 6.87843 4.61964 7.30306 4.90531 7.50959L8.80089 10.2462C9.10737 10.4619 9.53011 10.3884 9.74584 10.0819C9.96562 9.76195 9.8662 9.33732 9.58161 9.13701ZM11.0874 9.36206L8.06013 7.23671C8.91428 6.8449 9.93434 6.89178 10.7516 7.46704L11.867 8.24668C12.4562 8.66298 12.8564 9.29584 12.9799 10.0066C13.1035 10.7174 12.9403 11.4482 12.526 12.0389C12.1097 12.6281 11.4769 13.0283 10.7661 13.1518C10.0553 13.2754 9.32453 13.1121 8.73384 12.6979L7.6236 11.911C6.80632 11.3357 6.41803 10.3913 6.49247 9.45612L9.5197 11.5815C10.1337 12.0191 10.9792 11.8722 11.4158 11.2519C11.8472 10.639 11.7003 9.79351 11.0874 9.36206Z" fill="white" />
                          </g>
                          <g clipPath="url(#clip1_757_439)">
                            <path d="M18.3656 3.33947C18.7819 2.75026 19.4147 2.35005 20.1255 2.22652C20.8363 2.103 21.5671 2.26621 22.1578 2.68043L23.268 3.46736C24.0853 4.04263 24.4736 4.98706 24.3929 5.92332L22.4873 4.57653L21.9265 4.18725L21.3719 3.79689C20.7589 3.36544 19.9135 3.51237 19.482 4.12533C19.3779 4.27041 19.3037 4.4348 19.2638 4.60887C19.2239 4.78295 19.2191 4.96323 19.2497 5.13919C19.2803 5.31514 19.3456 5.48323 19.4419 5.63364C19.5382 5.78406 19.6635 5.91377 19.8105 6.01521L20.3661 6.41179L22.8326 8.14787C21.9773 8.53346 20.9573 8.48658 20.14 7.91131L19.0246 7.13167C18.4354 6.71537 18.0352 6.08252 17.9117 5.37173C17.7881 4.66093 17.9514 3.93016 18.3656 3.33947ZM25.9874 7.87498L22.0907 5.13219C21.7842 4.91646 21.3615 4.98993 21.1458 5.29641C20.926 5.6164 21.0254 6.04104 21.3111 6.24757L25.2067 8.98415C25.5131 9.19987 25.9359 9.1264 26.1516 8.81992C26.3714 8.49993 26.272 8.0753 25.9874 7.87498ZM27.4931 8.10004L24.4659 5.97469C25.32 5.58287 26.3401 5.62975 27.1574 6.20502L28.2728 6.98466C28.862 7.40096 29.2622 8.03382 29.3857 8.74461C29.5092 9.4554 29.346 10.1862 28.9318 10.7769C28.5155 11.3661 27.8826 11.7663 27.1719 11.8898C26.4611 12.0133 25.7303 11.8501 25.1396 11.4359L24.0294 10.649C23.2121 10.0737 22.8238 9.12927 22.8982 8.19409L25.9255 10.3194C26.5395 10.7571 27.385 10.6102 27.8216 9.98992C28.253 9.37697 28.1061 8.53149 27.4931 8.10004Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_757_439">
                              <rect width="12.6198" height="12.6198" fill="white" transform="translate(2.16064 15.9282) rotate(-99.859)" />
                            </clipPath>
                            <clipPath id="clip1_757_439">
                              <rect width="12.6198" height="12.6198" fill="white" transform="translate(18.5664 14.6661) rotate(-99.859)" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Multi Links</span>
                      </span>
                    </NavLink>
                  </li>

                  <li className="items-center mx-3 mb-3">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/mini-store") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/mini-store") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/mini-store"
                    >
                      <span className="flex py-2.5 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="M7.435 1.25h9.13c.57 0 1.054 0 1.453.041c.426.044.82.14 1.192.37c.371.23.633.539.863.9c.215.34.432.772.687 1.282l.016.033c.01.02.019.039.027.06l1.403 3.547c.168.423.353.95.407 1.488c.055.552-.02 1.183-.453 1.73a2.753 2.753 0 0 1-1.41.945v9.604H22a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h1.25v-9.604a2.754 2.754 0 0 1-1.41-.944c-.432-.548-.508-1.18-.453-1.73c.054-.54.24-1.066.406-1.489l1.404-3.548a.747.747 0 0 1 .027-.06l.016-.032c.255-.51.471-.943.687-1.282c.23-.361.492-.67.863-.9c.372-.23.766-.326 1.191-.37c.4-.041.884-.041 1.454-.041M18 10.888a2.75 2.75 0 0 0 1.25.758v9.604h-4v-2.782c0-.44 0-.82-.028-1.13c-.03-.33-.096-.656-.273-.963a2.251 2.251 0 0 0-.824-.824c-.307-.177-.633-.243-.962-.273c-.312-.028-.691-.028-1.13-.028h-.065c-.44 0-.82 0-1.13.028c-.33.03-.656.096-.963.273a2.25 2.25 0 0 0-.824.824c-.177.307-.243.633-.273.962c-.028.312-.028.691-.028 1.13v2.783h-4v-9.603a2.75 2.75 0 0 0 1.25-.76a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863M10.25 21.25h3.5V18.5c0-.481 0-.792-.022-1.027c-.02-.225-.055-.307-.079-.348a.75.75 0 0 0-.274-.274c-.04-.024-.123-.058-.348-.079A12.776 12.776 0 0 0 12 16.75c-.481 0-.792 0-1.027.022c-.225.02-.307.055-.348.079a.75.75 0 0 0-.274.274c-.024.04-.059.123-.079.348c-.021.235-.022.546-.022 1.027zM6.75 9a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.232.773c.114-.144.17-.342.138-.652c-.032-.322-.151-.688-.308-1.086L19.42 4.517c-.268-.535-.447-.89-.613-1.15c-.16-.252-.274-.361-.386-.43c-.111-.07-.26-.123-.557-.154c-.314-.032-.72-.033-1.336-.033H7.472c-.617 0-1.023 0-1.336.033c-.297.031-.446.085-.557.154c-.112.069-.226.178-.386.43c-.167.26-.345.615-.613 1.15L3.188 8.035c-.157.398-.276.764-.308 1.086c-.031.31.024.508.138.652A1.25 1.25 0 0 0 5.25 9a.75.75 0 0 1 1.5 0" clipRule="evenodd" /></svg>
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Mini Store</span>
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* SMS Platform section */}
              {activeTab === "sms" && (
                <>
                  {/* Dashboard */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/sms-dashboard") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/sms-dashboard") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/sms-dashboard"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiHome className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Dashboard</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* SMS Wallet - Highlighted */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/sms-wallet") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "bg-green-700/30 hover:bg-green-700/50")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block relative " +
                        (window.location.href.indexOf("/sms-wallet") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-green-600/30 rounded-[8px]")
                      }
                      to="/sms-wallet"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiCreditCard className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">SMS Wallet</span>
                        <span className="absolute top-1 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      </span>
                    </NavLink>
                  </li>

                  {/* Messages */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/messages") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/messages") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/messages"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiSend className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Send Messages</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* Analytics */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/analytics") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/analytics") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/analytics"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiBarChart2 className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Analytics</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* Contacts */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/contacts") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/contacts") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/contacts"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiUsers className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Contacts</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* Contact Groups */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/contact-groups") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/contact-groups") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/contact-groups"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiList className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Contact Groups</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* Sender IDs */}
                  <li className="items-center mx-3 mb-2">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/sender-ids") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/sender-ids") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/sender-ids"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiHash className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">Sender IDs</span>
                      </span>
                    </NavLink>
                  </li>

                  {/* API Keys */}
                  <li className="items-center mx-3 mb-3">
                    <NavLink
                      onClick={() => setCollapseShow("hidden")}
                      style={{
                        backgroundColor: (window.location.href.indexOf("/api-keys") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500")
                      }}
                      className={
                        "text-xs cursor-pointer pl-3 block " +
                        (window.location.href.indexOf("/api-keys") !== -1
                          ? "text-white rounded-[8px]"
                          : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                      }
                      to="/api-keys"
                    >
                      <span className="flex py-2.5 px-2">
                        <FiKey className="h-5 w-5 mr-3 text-white" />
                        <span style={{ fontSize: '15px' }} className="font-normal mt-1">API Keys</span>
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Payment - always visible */}
              <li className="items-center mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/payment-page") !== -1
                      ? "rgba(255, 255, 255, 0.1)"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/payment-page") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/payment-page"
                >
                  <span className="flex py-2.5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3" viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                    <span style={{ fontSize: '15px' }} className="font-normal mt-1">Pay with Gupta</span>
                  </span>
                </NavLink>
              </li>

              {/* Coming Soon items */}
              <li className="items-center mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/chatrouting") !== -1
                      ? "rgba(255, 255, 255, 0.1)"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/chatrouting") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/chatrouting"
                >
                  <span className="flex justify-between py-2.5 px-2">
                    <span className="flex justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3" viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className="font-normal mt-1"><span className="text-[10px]">Automation</span></span>
                    </span>
                    <span className="text-[9px] rounded-full border border-white border-opacity-20 px-2 pt-0.5 bg-white bg-opacity-20">Coming Soon</span>
                  </span>
                </NavLink>
              </li>

              <li className="items-center mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/chatrouting") !== -1
                      ? "rgba(255, 255, 255, 0.1)"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/chatrouting") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/chatrouting"
                >
                  <span className="flex justify-between py-2.5 px-2">
                    <span className="flex justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3" viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className="font-normal mt-1"><span className="text-[10px]">Chat Routing</span></span>
                    </span>
                    <span className="text-[9px] rounded-full border border-white border-opacity-20 px-2 pt-0.5 bg-white bg-opacity-20">Coming Soon</span>
                  </span>
                </NavLink>
              </li>

              <li className="items-center mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/formlinks") !== -1
                      ? "rgba(255, 255, 255, 0.1)"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/formlinks") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/formlinks"
                >
                  <span className="flex justify-between py-2.5 px-2">
                    <span className="flex justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3" viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className="font-normal mt-1"><span className="text-[10px]">Form Links</span></span>
                    </span>
                    <span className="text-[9px] rounded-full border border-white border-opacity-20 px-2 pt-0.5 bg-white bg-opacity-20">Coming Soon</span>
                  </span>
                </NavLink>
              </li>

              {/* Logout at bottom */}
              <li className="items-center mx-3 mt-20 pl-3 pb-6">
                <span
                  className="text-xs cursor-pointer block"
                  onClick={logOut}
                >
                  <span className="flex py-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3" viewBox="0 0 24 24"><path fill="red" d="M16 13v-2H7V8l-5 4l5 4v-3z" /><path fill="red" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" /></svg>
                    <span className="text-[15px] mt-1 font-normal text-[#FF0000]">Log out</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
                          