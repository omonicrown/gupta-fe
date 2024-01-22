import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";

// components

export default function CardFormLink() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full p-52 flex-grow flex-1">

              <h3 className="flex justify-center font-bold" style={{fontSize:'14px'}}> OPS! </h3>
              <p className="flex text-sm justify-center" style={{fontSize:'14px'}}> This Feature is not available yet! </p>
              
              <NavLink to='#' className="flex justify-center">
              < span className="flex justify-center pt-4">
                <button
                  type="button"
                  style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                  className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
                >
                 Coming Soon
                </button>
              </span>
              </NavLink>

            </div>

          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

        </div>
      </div>
    </>
  );
}
