/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducer/loginSlice'
import { useNavigate } from 'react-router-dom';
import { AiOutlineSetting } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Sidebar(title:any) {
  const navigate = useNavigate();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const dispatch: Dispatch = useDispatch();
  function logOut() {
    dispatch(login([]))
    navigate('/login');
  }


  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl md:bg-[#0071BC] rounded-xl mt-2 ml-1 relative md:w-64 z-2 py-2 px-1">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <b className="fas fa-bars text-3xl"> ≡ </b><span className="text-black">{title?.title}</span>
          </button>
          {/* Brand */}

          <span className="flex justify-end md:hidden">
            <span className="flex  flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch gap-5">
              <h2 className="pt-2"><SvgElement type={icontypesEnum.SEARCH} /></h2>
                <h2 className="pt-2"><SvgElement type={icontypesEnum.NOTIFICATION} /></h2>
                <NavLink to='/editprofile'>
                  <h2 className=" pt-2"><SvgElement type={icontypesEnum.SETTINGS} /></h2>
                </NavLink>
              </div>
            </span>
          </span>

          <Link
            className="hidden text-left md:pb-10 mt-10 text-blueGray-600 mr-0 md:inline-block whitespace-nowrap text-sm uppercase font-bold px-0 pl-4"
            to="/"
          >
            <SvgElement type={icontypesEnum.BARS2} />
          </Link>
          {/* User */}

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-1 mb-4 ">
              <div className="flex justify-between">

                <span className="flex justify-start gap-1" onClick={() => setCollapseShow("hidden")}><IoArrowBack style={{color:'#333333'}} className="bg-gray-200 text-xs text-gray-500 rounded-full p-1 h-7 w-7" /> <span>Back</span></span>

                <span
                  className="cursor-pointer text-black opacity-50 md:hidden  py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                   <NavLink to='/editprofile'>
                  <b className="fas fa-times"> <AiOutlineSetting /> </b>
                  </NavLink>
                </span>


              </div>

            </div>
            {/* Form */}


            {/* Divider */}
            {/* <hr className="md:min-w-full" /> */}

            <ul className="md:flex-col min-w-full list-none flex flex-col md:mt-5 mt-5">
              <li className="items-center mx-6 mb-2">
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { backgroundColor: '#1DB459', paddingLeft: "12px", borderRadius: "8px" } : { color: '#FFFFFF' }
                  }
                  className={
                    "text-sm py-3  pl-3 font-medium flex " +
                    (window.location.href.indexOf("/mylinks") !== -1
                      ? "text-white hover:text-lightBlue-600"
                      : "text-white hover:text-blueGray-500")
                  }
                  to="/mylinks"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                  My Links
                </NavLink>
                
              </li>
              <li className="items-center mx-6 mb-2">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/mylinks") !== -1
                      ? "rgba(255, 255, 255, 0.1)"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer py-1 pl-3 block " +
                    (window.location.href.indexOf("/mylinks") !== -1
                      ? "text-white"
                      : "text-white")
                  }
                  to="/mylinks"
                >
                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}> My Links</span>
                    <span> {(window.location.href.indexOf("/mylinks") !== -1
                      ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                      : <SvgElement type={icontypesEnum.ARROW} /> )} </span>
                  </span>

                </NavLink>
              </li>

              {/* <hr className=" md:min-w-full" /> */}

              <li className="items-center">
                <Link
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/multi-links") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer  block " +
                    (window.location.href.indexOf("/multi-links") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }
                  to="/multi-links"
                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}> Multi Links</span>
                    <span>  <SvgElement type={icontypesEnum.CROWN} /> </span>
                  </span>

                </Link>
              </li>

              {/* <hr className=" md:min-w-full" /> */}

              <li className="items-center">
                <Link
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/mini-store") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer block " +
                    (window.location.href.indexOf("/mini-store") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }
                  to="/mini-store"
                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}>Mini Store</span>
                    <span>  <SvgElement type={icontypesEnum.CROWN} /> </span>
                  </span>

                </Link>
              </li>

              <hr className=" md:min-w-full" />

              <li className="items-center">
                <Link
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/chatrouting") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer block " +
                    (window.location.href.indexOf("/chatrouting") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }
                  to="/chatrouting"
                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}>Chat Routing</span>
                    <span>  <SvgElement type={icontypesEnum.CROWN} /> </span>
                  </span>

                </Link>
              </li>


              {/* <hr className=" md:min-w-full" /> */}

              <li className="items-center">
                <Link
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/formlinks") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer block " +
                    (window.location.href.indexOf("/formlinks") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }
                  to="/formlinks"
                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}>Form Links</span>
                    <span>  <SvgElement type={icontypesEnum.CROWN} /> </span>
                  </span>

                </Link>
              </li>

              {/* <hr className=" md:min-w-full" /> */}

              <li className="items-center">
                <span
                onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/dashboard2") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }}
                  className={
                    "text-xs cursor-pointer block " +
                    (window.location.href.indexOf("/dashboard2") !== -1
                      ? "text-white"
                      : "text-black hover:text-blueGray-500")
                  }
                  
                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{fontSize:'16px'}}> <a href="https://www.uforo.co/help"> Help</a></span>
                  </span>

                </span>
              </li>

              <li className="items-center pt-80">
                <span
                  //  style={{backgroundColor:'#61A24F'}}
                  className={
                    "text-xs cursor-pointer block "
                  }

                  onClick={logOut}
                >

                  <span className="flex justify-between py-2 px-2 cursor-pointer">
                    <span className=" text-sm text-red-600">Log out</span>
                    <span style={{ color: 'red' }}>  <SvgElement type={icontypesEnum.REDARROW} /> </span>
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
