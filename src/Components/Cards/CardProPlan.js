import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";

// components

export default function CardProPlan() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full p-52 flex-grow flex-1">
              <h3 className="flex justify-center font-bold" style={{ fontSize: '16px' }}> Yay! You want to get a Pro Plan</h3>
              <p className="flex text-sm justify-center" style={{ fontSize: '16px' }}>Our Pro Plans launch on the 21st of Nov, 2022 </p>
                <p className="flex text-sm justify-center" style={{ fontSize: '16px' }}>Join waitlist to get 20% OFF when we launch</p>
              <a href="https://app.wamation.com.ng/formframe?formid=8751b802cf761" className="flex justify-center">
                < span className="flex justify-center pt-4">
                  <button
                    type="button"
                    style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                    className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
                  >
                    Join Waitlist
                  </button>
                </span>
              </a>

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
