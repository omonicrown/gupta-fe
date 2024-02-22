import React from 'react'
import { AuthApis } from '../../../apis/authApis';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { SvgElement, icontypesEnum } from '../../assets/svgElement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

  const [userData, setUserdata] = React.useState({
    'email': "",
    'otp': "",
    'password': "",
    "confirm_password": ""
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userData?.password !== userData?.confirm_password){
      toast.warn('Password does not match');
    }else{
      const formData = new FormData()
      formData.append('email', location?.state?.email)
      formData.append('token', userData?.otp)
      formData.append('password', userData?.password)
      formData.append('password_confirmation', userData?.confirm_password)
  
      AuthApis.resetPassword(formData).then(
        (response) => {
          if (response?.data) {
            if (response?.data?.success) {
              navigate('/password-success');
            }else{
              toast.warn(response?.data?.data);
            }
          } else {
            
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
    
  }


  return (
    <>
      {/* <!-- Start block --> */}
      <section className="bg-white  body-font font-poppins ">
        <div className="flex justify-center pt-20">
          {/* grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 */}
          <div className="md:px-24 px-5 mt-30">
            <div className="flex justify-center">
              <SvgElement type={icontypesEnum.BARS} />
            </div>
            <h1 className="max-w-2xl mt-6 text-3xl text-[#000000] font-semibold leading-10 md:text-3xl xl:text-4xl text-center ">
              Password Reset
            </h1>
            <p className="text-xs my-5 text-center text-gray-500">
              Must be at least 8 charaters
            </p>


            <div className="mt-5">
              <form onSubmit={handleSubmit}>

                <div className="mb-5">
                  <label className=" flex justify-center mb-2 text-sm font-semibold text-[#0A2E04]">
                    We have sent your 4 digit code to your email
                  </label>
                  <input
                    type="number"
                    className=" border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                    placeholder="Enter Your 4 Digit Code"
                    onChange={handleChange}
                    name="otp"
                    required
                  />
                </div>

                <hr className='mt-10' />


                <div className="mb-5 mt-10">
                  <label className="block mb-2 text-sm font-semibold text-[#0A2E04]">
                   New Password
                  </label>
                  <input
                    type="password"
                    className=" border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                    placeholder="*****"
                    onChange={handleChange}
                    name="password"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-semibold text-[#0A2E04]">
                    Comfirm Password
                  </label>
                  <input
                    type="password"
                    className=" border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                    placeholder="*****"
                    onChange={handleChange}
                    name="confirm_password"
                    required
                  />
                </div>





                <button
                  type="submit"
                  className="w-full text-white bg-[#0071BC] hover:bg-[#2452af] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Reset Password
                </button>


              </form>

              <NavLink to={"/login"} className="flex justify-center mt-4">
                {/* <img src="/images/arrow-back-icon.svg" className=" mr-2" alt="sign-in" /> */}
                <p className="text-center text-xs font-semibold text-gray-500 mt-1">

                  Back to login

                </p>
              </NavLink>
            </div>
          </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      </section>

      {/* <!-- End block --> */}
    </>
  )
}

export default ResetPassword