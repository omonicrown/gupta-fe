import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { NavLink } from "react-router-dom";
import { PaymentApis } from "../../apis/paymentApis";

export default function Navbar({ title }) {
  const dispatch = useDispatch();
  const userLoginData = useSelector((state) => state.data.login.value);



  let [data, setdata] = React.useState([]);
  const [daysLeft, setDaysLeft] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [subType, setSubType] = React.useState(null);

  const calculateDaysLeft = (subEnd) => {
    const endDate = new Date(subEnd);
    const today = new Date();

    // Calculate time difference in milliseconds
    const timeDiff = endDate.getTime() - today.getTime();

    // Convert time difference from milliseconds to days
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // If daysRemaining is negative, subscription has expired
    if (daysRemaining >= 15) {
      setColor('green')
    } else if (daysRemaining < 15 && daysRemaining >= 7) {
      setColor('orange')
    } else if (daysRemaining < 7) {
      setColor('red')
    }
    setDaysLeft(daysRemaining > 0 ? daysRemaining : 0);
  };


  React.useEffect(() => {
    PaymentApis.getWalletDetails().then(
      (response) => {
        if (response?.data) {
          // setdata(response?.data)
          calculateDaysLeft(response?.data?.data?.sub_end)
          setSubType(response?.data?.data?.sub_type)
          setdata(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((response?.data?.data[0]?.total_amount) ? (response?.data?.data[0]?.total_amount) : 0.0))
          // window.location.reload();
        }
      }
    );

  }, []);



  // $currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(100000000)


  return (
    <>
      <div className="relative md:pt-12 pb-2 pt-8 md:border md:rounded md:shadow-md md:m-3" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full  bg-transparent md:flex-row md:flex-nowrap md:justify-end flex items-center p-2">
          <div className="flex justify-between px-4 lg:w-full">
            {/* Brand */}
            <a
              className="text-black font-bold text-md uppercase hidden mt-2 lg:inline-block"
              href=""
              onClick={(e) => e.preventDefault()}
            >
              {title}
            </a>
            <h2 className="mt-2 flex md:hidden "><span className="text-[14px]" style={{color:color}}>Subscription expires in <b>{daysLeft}</b> days. ({subType}) </span></h2>


            {/* Form */}
            <span className="flex justify-end">

              <span className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div className="relative flex justify-end w-full flex-wrap items-stretch gap-5">

                  {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <div class="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" /></svg>
                </div>
                <input type="text" style={{backgroundColor:'#F4FBFF'}} id="simple-search" placeholder="Search" class=" border border-gray-300 text-gray-500 text-sm rounded-full block w-full pl-4 p-2  " required />

              </div>
            </form> */}
                  <h2 className="mt-2"><span className="text-[14px]" style={{color:color}}>Subscription expires in <b>{daysLeft}</b> days. ({subType}) </span></h2>
                  {/* <NavLink to='/proplan'>
            <h2 className=""><SvgElement type={icontypesEnum.UPGRADE} /></h2>
            </NavLink> */}
                  {/* <h2 className="pt-2"><SvgElement type={icontypesEnum.NOTIFICATION} /></h2> */}
                  <span className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                    <NavLink to='/subscription'>
                      <div className="relative bg-blue-200 flex w-full font-bold rounded-lg border-[2px] p-1 flex-wrap items-stretch">
                        👑 Upgrade
                      </div>
                    </NavLink>

                  </span>
                  <NavLink to='/editprofile'>
                    <h2 className=" pt-2"><SvgElement type={icontypesEnum.SETTINGS} /></h2>
                  </NavLink>
                </div>


              </span>
            </span>

            {/* User */}

          </div>
        </nav>
      </div>
      {/* End Navbar */}
    </>
  );
}

Navbar.defaultProps = {
  title: " ",
};
