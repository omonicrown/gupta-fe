import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";

// components

export default function CardRenewSubscription() {

  // let [data, setdata] = React.useState([]);
  // React.useEffect(() => {
  //   AdminApis.getAllLinks().then(
  //     (response) => {
  //       if (response?.data) {
  //         setdata(response?.data?.data)
  //       }
  //     }
  //   );

  // }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0  py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 max-w-full p-52 flex-grow flex-1">

              <h3 className="flex justify-center font-bold"> Your subscription has expired</h3>
              <p className="flex text-sm justify-center"> Click on the button below to renew your  </p>
              <p className="flex text-sm justify-center text-black font-bold"> plan.</p>

              <NavLink to='/subscription' className="flex justify-center">
              < span className="flex justify-center pt-4">
                <button
                  type="button"
                  style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                  className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
                >
                 Renew
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
