/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
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

export default function AdminSidebar() {

  const userLoginData = useSelector((state: any) => state.data.login.value);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

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

  {
    userLoginData?.data?.role !== 'admin' ?
      logOut()
      :
      ''
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars">|||</i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 pl-6"
            to="/"
          >
            <img src="/images/Dashboard/logo.png" alt="hero" />
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <img src="/images/Dashboard/logo.png" alt="hero" />
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"> X </i>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-dashboard") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-dashbord") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <hr className="mb-1 md:min-w-full" />

              {/* Links Management */}
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-users") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-users"
                >
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-users") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Users
                </Link>
              </li>
              <hr className="mb-1 md:min-w-full" />

              {/* SMS Management Section */}
              <li className="items-center">
                <div className="text-xs py-2 font-bold text-[#666] uppercase">SMS Management</div>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-sms-users") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-sms-users"
                >
                  <i
                    className={
                      "fas fa-wallet mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-sms-users") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  SMS Users
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-sender-ids") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-sender-ids"
                >
                  <i
                    className={
                      "fas fa-id-card mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-sender-ids") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Sender IDs
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-sms-messages") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-sms-messages"
                >
                  <i
                    className={
                      "fas fa-envelope mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-sms-messages") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Messages
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-sms-campaigns") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-sms-campaigns"
                >
                  <i
                    className={
                      "fas fa-bullhorn mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-sms-campaigns") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Campaigns
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-sms-settings") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-sms-settings"
                >
                  <i
                    className={
                      "fas fa-cog mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-sms-settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  SMS Settings
                </Link>
              </li>
              <hr className="mb-1 md:min-w-full" />

              {/* Existing menu items */}
              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/witdrawal-request") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/witdrawal-request"
                >
                  <i
                    className={
                      "fas fa-money-bill mr-2 text-sm " +
                      (window.location.href.indexOf("/witdrawal-request") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Withdrawals
                </Link>
              </li>

              <hr className="mb-1 md:min-w-full" />
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/edit-house") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/edit-house"
                >
                  <i
                    className={
                      "fas fa-crown mr-2 text-sm " +
                      (window.location.href.indexOf("/edit-house") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Subscriptions
                </Link>
              </li>

              <li className="items-center mt-[25vh]">
                <span
                  className={
                    "text-xs cursor-pointer block "
                  }

                  onClick={logOut}
                >

                  <span className="flex py-2  cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="red" d="M16 13v-2H7V8l-5 4l5 4v-3z" /><path fill="red" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" /></svg>
                    <span className=" text-[15px] mt-1 font-normal text-[#FF0000]">Log out</span>
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