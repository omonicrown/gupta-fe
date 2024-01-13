import React from 'react'
import { NavLink } from "react-router-dom";
import { SvgElement, icontypesEnum } from '../../assets/svgElement';

function PwordResetSucces() {
  return (
    <>
    {/* <!-- Start block --> */}
    <section className="bg-white  body-font font-poppins ">
        <div className="flex justify-center pt-20">
          {/* grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 */}

          

          <div className="px-24  mt-30">
            <div className="flex justify-center">
            <SvgElement type={icontypesEnum.BARS} />
            </div>
            <h1 className="max-w-2xl mt-6 text-3xl text-[#000000] font-semibold leading-10 md:text-3xl xl:text-4xl text-center ">
           All done!
            </h1>
            <p className="text-sm my-5 text-center text-gray-500">
              Your password has been reset.
            </p>
           

            <div className="mt-20">
              <form>

               <NavLink to={"/login"} className=" ">
                  <button
                    type="button"
                    className="w-full text-white bg-[#0071BC] hover:bg-[#3f84eb] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Continue to Login
                  </button>
                </NavLink>
               
              </form>

             
            </div>
          </div>
        </div>
      </section>

      {/* <!-- End block --> */}
    </>
  )
}

export default PwordResetSucces