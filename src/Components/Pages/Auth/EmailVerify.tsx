import React from "react";
import { NavLink } from "react-router-dom";

function EmailVerify() {
  return (
    <>
      {/* <!-- Start block --> */}
      <section className="bg-[#F8F8F8] min-h-screen body-font font-poppins">
        <div className="grid  max-w-screen-xl  lg:gap-8 xl:gap-0 lg:grid-cols-12 ">
          <div className="hidden lg:col-span-6 lg:flex w-full bg-[#2b5ccd] min-h-screen">
            <div className="relative pt-10">
              <div className="lg:pl-[40px] pr-[5px] lg:pt-[260px]">
                <h3 className="text-[44px] text-white font-bold">
                  Start connecting your world with a<br /> Click!
                </h3>
                {/* <p className="mt-6 text-[16px] text-white pr-[15px]">
                  Our cold email automation helps you send personalized cold emails at scale with high email deliverability.
                </p> */}
              </div>
            </div>
          </div>

          <div className="lg:pl-20 lg:pr-6 mx-auto lg:col-span-6 lg:py-4 mt-8 md:mt-[100px]  px-2 py-10">
            <div className="flex justify-center lg:hidden">
              <img src="/image.png" alt="sign-in" />
            </div>
            <h1 className=" text-2xl md:mt-8 mt-5 text-center text-[#0A0A0C] font-semibold leading-10 md:text-[32px] xl:text-4xl md:text-center lg:text-left">
              Check your email
            </h1>
            <p className="lg:text-[15px] md:text-[14px] text-[10px] mt-3 mb-6 text-[##414143] text-center md:text-center  lg:text-left">
              We’ve sent a verification details to your email  with a link to <br /> activate your account
            </p>
            <div className=" mt-[100px] mx-4 lg:mx-0">
              <h3 className="text-[#0A0A0C] lg:text-[20px] md:text-[18px] text-[14px] font-[600] text-center md:text-center lg:text-left">Didn’t get an email? Check your spam folder!</h3>

            </div>
          </div>
        </div>
      </section>

      {/* <!-- End block --> */}
    </>
  );
}

export default EmailVerify;
