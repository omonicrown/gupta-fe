/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
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
          {/* User */}
         
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
            {/* Form */}
           

           
            
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/admin-dashbord") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/admin-dashbord"
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
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin-users") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Users
                </Link>
              </li>
              <hr className="mb-1 md:min-w-full" />
              <li className="items-center">
                <Link
                  className={
                    "text-xs py-3 font-bold block " +
                    (window.location.href.indexOf("/view-agent-houses") !== -1
                      ? "text-[#0071BC] hover:text-lightBlue-600"
                      : "text-[#8A92A6] hover:text-blueGray-500")
                  }
                  to="/view-agent-houses"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/view-agent-houses") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                   Subcriptions
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
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/edit-house") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                   Subscriptions
                </Link>
              </li>
             
              
            </ul>

            {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/landing"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Logout
                </Link>
              </li>

              
            </ul> */}

           
          </div>
        </div>
      </nav>
    </>
  );
}
