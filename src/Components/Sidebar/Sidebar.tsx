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
import { AuthApis } from "../../apis/authApis";
import { AxiosResponse } from "axios";
import { AdminApis } from "../../apis/adminApi";

export default function Sidebar(title: any) {
  const navigate = useNavigate();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const dispatch: Dispatch = useDispatch();


  React.useEffect(() => {
    AdminApis.searchName('').then(
      (response: AxiosResponse<any>) => {
        if (!response?.data) {
          dispatch(login([]))
          navigate('/login');
        }
      }
    ).catch(function (error:any) {
      // handle error
      console.log(error);
      console.log("new error");
    })
  }, []);


  const logOut = () => {
    AuthApis.logout('').then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          dispatch(login([]))
          navigate('/login');

        }
      }
    ).catch(function (error:any) {
      // handle error
      console.log(error.response.data);
      console.log("new error");
    })

  };

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
              "md:flex md:flex-col items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow bg-[#0071BC] absolute top-4 left-0 right-1  h-auto flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-1 mb-4  ">
              <div className="flex justify-between ">

                <span className="flex justify-start gap-1" onClick={() => setCollapseShow("hidden")}><IoArrowBack style={{ color: '#333333' }} className="bg-gray-200 text-xs text-gray-500 rounded-full p-1 h-6 w-6" /> <span className="text-white ml-2">Back</span></span>

                <span
                  className="cursor-pointer opacity-50 md:hidden  py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <NavLink to='/editprofile'>
                    <b className="fas fa-times text-white"> <AiOutlineSetting /> </b>
                  </NavLink>
                </span>


              </div>

            </div>
            {/* Form */}


            {/* Divider */}
            {/* <hr className="md:min-w-full" /> */}

            <ul className="flex-col list-none flex bg-[#0071BC]  md:mt-1 mt-2">

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
                  <span className="flex  py-2.5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> My Links</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Short Links</span>
                    {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                      ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                      : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Multi Links</span>
                    {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                      ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                      : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Mini Store</span>
                    {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                      ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                      : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
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
                  <span className="flex py-2.5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Chat Routing</span>

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
                  <span className="flex py-2.5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1">Form Links</span>

                  </span>

                </NavLink>
              </li>










              <li className="items-center pt-36 mx-3 pl-3 mb-2">
                <span
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor: (window.location.href.indexOf("/dashboard2") !== -1
                      ? "text-white"
                      : "text-white")
                  }}
                  className={
                    "text-xs cursor-pointer block " +
                    (window.location.href.indexOf("/dashboard2") !== -1
                      ? "text-white"
                      : "text-white hover:bg-white/[0.1] hover:rounded-[5px]")
                  }

                >

                  <span className="flex justify-between py-2 px-2">
                    <span style={{ fontSize: '16px' }}> <a href="https://www.uforo.co/help"> Help</a></span>
                  </span>

                </span>
              </li>


              <li className="items-center mx-3 pl-3">
                <span
                  //  style={{backgroundColor:'#61A24F'}}
                  className={
                    "text-xs cursor-pointer block "
                  }

                  onClick={logOut}
                >

                  <span className="flex py-2  cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="red" d="M16 13v-2H7V8l-5 4l5 4v-3z" /><path fill="red" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" /></svg>
                    <span className=" text-[15px] mt-1 font-normal text-[#FF0000]">Log out</span>
                    {/* <span style={{ color: 'red' }}>  <SvgElement type={icontypesEnum.REDARROW} /> </span> */}
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
