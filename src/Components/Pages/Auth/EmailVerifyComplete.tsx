import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { AuthApis } from "../../../apis/authApis";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

function EmailVerify() {

  const params: any = useParams();
  let email: string = params?.email;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(false);
  const userLoginData = useSelector((state: any) => state.data.login.value);

  React.useEffect(() => {
    if (userLoginData.isVerified =='true' ) {
      navigate('/sign-in');
    }

    console?.log(email)

    const formData = new FormData()
    formData.append('email', email)

    AuthApis.verifyMail(formData).then(
      (response:any) => {
        if (response?.data) {
          console.log(response.data)
         
          if (response?.data?.success === true) {
            navigate('/login');
            // console.log(response.data)
          } else {
            // toast.success(response?.data?.message);
          }
        } else {

        }

        // toast.success(response?.data?.message);
      }
    ).catch(function (error) {
      // handle error
      console.log(error.response.data);
      // toast.error(error.response.data?.message);
    })



    // userLoginData.token ?
    // ''
    // :
    //   navigate('/sign-in');
  }, []);

  return (
    <>
    <div className="flex justify-center mt-[50vh]">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#0071BC"
          secondaryColor="#FCBF94"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}

export default EmailVerify;
