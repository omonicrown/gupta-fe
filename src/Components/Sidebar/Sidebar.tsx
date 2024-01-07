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
  const userLoginData = useSelector((state: any) => state.data.login.value);

  console?.log()


  React.useEffect(() => {
    AdminApis.searchName('').then(
      (response: AxiosResponse<any>) => {
        if (!response?.data) {
          dispatch(login([]))
          navigate('/login');
        }
      }
    ).catch(function (error: any) {
      // handle error
      console.log(error);
      console.log("new error");
    })
  }, []);

  React.useEffect(() => {
    userLoginData?.data?.isVerified == 'false'
      ?
      verify()
      :
      ''
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
      // handle error
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.3636 3.39131H6.24291C6.07135 2.92716 5.73377 2.53597 5.28983 2.28687C4.8459 2.03777 4.32419 1.94681 3.81692 2.03006C3.30965 2.11331 2.84948 2.36541 2.51774 2.74181C2.186 3.1182 2.00405 3.59466 2.00405 4.08696C2.00405 4.57926 2.186 5.05572 2.51774 5.43211C2.84948 5.80851 3.30965 6.06061 3.81692 6.14386C4.32419 6.22711 4.8459 6.13615 5.28983 5.88705C5.73377 5.63795 6.07135 5.24676 6.24291 4.78261H14.3636C14.9423 4.78261 15.4972 5.00249 15.9064 5.39387C16.3156 5.78525 16.5455 6.31607 16.5455 6.86957C16.5455 7.42306 16.3156 7.95389 15.9064 8.34527C15.4972 8.73665 14.9423 8.95652 14.3636 8.95652H12.0596C11.9066 8.55387 11.6277 8.20602 11.2609 7.96021C10.894 7.7144 10.457 7.58254 10.0091 7.58254C9.56118 7.58254 9.12413 7.7144 8.75728 7.96021C8.39043 8.20602 8.11156 8.55387 7.95854 8.95652H5.63636C4.67194 8.95652 3.74702 9.32298 3.06507 9.97528C2.38312 10.6276 2 11.5123 2 12.4348C2 13.3573 2.38312 14.242 3.06507 14.8943C3.74702 15.5466 4.67194 15.913 5.63636 15.913H10V18L12.9091 15.2174L10 12.4348V14.5217H5.63636C5.05771 14.5217 4.50276 14.3019 4.09359 13.9105C3.68441 13.5191 3.45455 12.9883 3.45455 12.4348C3.45455 11.8813 3.68441 11.3505 4.09359 10.9591C4.50276 10.5677 5.05771 10.3478 5.63636 10.3478H7.96582C8.12025 10.7481 8.39926 11.0936 8.76525 11.3375C9.13124 11.5815 9.56663 11.7123 10.0127 11.7123C10.4588 11.7123 10.8942 11.5815 11.2602 11.3375C11.6262 11.0936 11.9052 10.7481 12.0596 10.3478H14.3636C15.3281 10.3478 16.253 9.98137 16.9349 9.32907C17.6169 8.67677 18 7.79206 18 6.86957C18 5.94708 17.6169 5.06237 16.9349 4.41007C16.253 3.75777 15.3281 3.39131 14.3636 3.39131ZM4.18182 4.78261C4.03798 4.78261 3.89737 4.74181 3.77777 4.66537C3.65817 4.58893 3.56495 4.48029 3.50991 4.35317C3.45486 4.22606 3.44046 4.08619 3.46852 3.95125C3.49658 3.8163 3.56585 3.69235 3.66756 3.59506C3.76927 3.49777 3.89886 3.43152 4.03993 3.40468C4.18101 3.37783 4.32724 3.39161 4.46013 3.44426C4.59302 3.49691 4.70661 3.58608 4.78652 3.70048C4.86644 3.81488 4.90909 3.94937 4.90909 4.08696C4.90909 4.27146 4.83247 4.4484 4.69608 4.57886C4.55969 4.70932 4.3747 4.78261 4.18182 4.78261ZM10 10.3478C9.85616 10.3478 9.71555 10.307 9.59595 10.2306C9.47635 10.1542 9.38313 10.0455 9.32809 9.91839C9.27304 9.79128 9.25864 9.6514 9.2867 9.51646C9.31476 9.38152 9.38403 9.25757 9.48574 9.16028C9.58745 9.06299 9.71704 8.99673 9.85812 8.96989C9.99919 8.94305 10.1454 8.95683 10.2783 9.00948C10.4112 9.06213 10.5248 9.15129 10.6047 9.26569C10.6846 9.38009 10.7273 9.51459 10.7273 9.65218C10.7273 9.83668 10.6506 10.0136 10.5143 10.1441C10.3779 10.2745 10.1929 10.3478 10 10.3478Z" fill="#FEFEFE" />
                      <path d="M15.8182 13.1304C15.3866 13.1304 14.9648 13.2528 14.606 13.4821C14.2472 13.7114 13.9676 14.0373 13.8024 14.4187C13.6373 14.8 13.5941 15.2196 13.6783 15.6245C13.7625 16.0293 13.9703 16.4012 14.2754 16.693C14.5805 16.9849 14.9693 17.1837 15.3925 17.2642C15.8158 17.3447 16.2544 17.3034 16.6531 17.1454C17.0518 16.9875 17.3925 16.72 17.6323 16.3768C17.872 16.0336 18 15.6301 18 15.2173C18 14.6638 17.7701 14.133 17.361 13.7416C16.9518 13.3502 16.3968 13.1304 15.8182 13.1304ZM15.8182 15.913C15.6743 15.913 15.5337 15.8722 15.4141 15.7957C15.2945 15.7193 15.2013 15.6107 15.1463 15.4835C15.0912 15.3564 15.0768 15.2166 15.1049 15.0816C15.1329 14.9467 15.2022 14.8227 15.3039 14.7254C15.4056 14.6281 15.5352 14.5619 15.6763 14.535C15.8174 14.5082 15.9636 14.522 16.0965 14.5746C16.2294 14.6273 16.343 14.7164 16.4229 14.8308C16.5028 14.9452 16.5454 15.0797 16.5454 15.2173C16.5454 15.4018 16.4688 15.5788 16.3324 15.7092C16.196 15.8397 16.0111 15.913 15.8182 15.913Z" fill="#FEFEFE" />
                    </svg>

                    <span style={{ fontSize: '15px' }} className=" font-normal mt-1 pl-2"> Short Links</span>
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
                  <span className="flex justify-between py-2.5 px-2">
                    <span className="flex justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className=" font-normal mt-1"><span className="text-[10px]">Automation</span>  </span>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className=" font-normal mt-1"><span className="text-[10px]">Chat Routing</span>  </span>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
                      <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> <span className="text-[10px]">Form Links</span> </span>
                    </span>
                    <span className="text-[9px] rounded-full border border-white border-opacity-20 px-2 pt-0.5 bg-white bg-opacity-20">Coming Soon</span>

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
