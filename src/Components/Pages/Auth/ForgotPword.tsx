import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthApis } from "../../../apis/authApis";
import { SvgElement, icontypesEnum } from "../../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPword() {
  const navigate = useNavigate();

  const [userData, setUserdata] = useState({
    'email': "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('email', userData?.email)

    AuthApis.forgotPassword(formData).then(
      (response) => {
        if (response?.data) {
          if (response?.data?.success) {
            navigate('/reset-password',{state:{email:userData?.email}});
            toast.success(response?.data?.message);

          }else{
            toast.warn(response?.data?.data);
          }
        } else {
          toast.error('Something went wrong');
        }

        // toast.success(response?.data?.message);
      }
    ).catch(function (error) {
      // handle error
      console.log(error.response.data);
      // toast.error("Offfline");
    }).finally(() => {
      // toast.error("No Internet Connection");

    });
  }

  return (
    <>
      {/* <!-- Start block --> */}
      <section className="bg-[#FBFBFB]  body-font font-poppins ">
        <div className="flex justify-center     ">

          <div className="md:px-24 px-5  mt-36">
            <div className="flex justify-center">
              <SvgElement type={icontypesEnum.BARS} />
            </div>
            <h1 className="max-w-2xl mt-6 text-3xl text-[#000000] font-semibold leading-10 md:text-3xl xl:text-4xl text-center ">
              Forgot Password?
            </h1>
            <p className="text-xs mt-3 text-gray-500 text-center">
              No worries, we’ll send you reset instructions.
            </p>

            <div className="mt-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-semibold text-[#0A2E04]">
                    Email address
                  </label>
                  <input
                    type="email"
                    className=" border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                    placeholder="Enter email"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </div>



                <button
                  type="submit"
                  className="w-full text-white bg-[#0071BC] hover:bg-[#3050ed] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Reset Password
                </button>

                <NavLink to={"/sign-in"} className="flex justify-center">
                  {/* <SvgElement type={icontypesEnum.BARS} /> */}
                  <p className="text-center text-xs font-semibold text-[#0071BC] mt-1">

                    Back to login

                  </p>
                </NavLink>

              </form>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      {/* <!-- End block --> */}
    </>
  );
}

export default ForgotPword;
