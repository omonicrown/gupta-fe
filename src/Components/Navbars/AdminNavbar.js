import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { NavLink } from "react-router-dom";

export default function Navbar({ title }) {
  const dispatch = useDispatch();
  const userLoginData = useSelector((state) => state.data.login.value);
  return (
    <>
    <div className="relative md:pt-12 pb-2 pt-8 md:border md:rounded md:shadow-md md:m-3" style={{backgroundColor:'#FFFFFF'}}>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-2">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-4 px-4">
          {/* Brand */}
          <a
            className="text-black font-bold text-md uppercase hidden lg:inline-block"
            href=""
            onClick={(e) => e.preventDefault()}
          >
            {title}
          </a>

       
          {/* Form */}
          <span className="flex justify-end">
          {/* <span className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
            <h2 className=""><SvgElement type={icontypesEnum.UPGRADE} /></h2>
            </div>
          </span> */}
          <span className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch gap-5">

            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <div class="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" /></svg>
                </div>
                <input type="text" style={{backgroundColor:'#F4FBFF'}} id="simple-search" placeholder="Search" class=" border border-gray-300 text-gray-500 text-sm rounded-full block w-full pl-4 p-2  " required />

              </div>
            </form>
            {/* <NavLink to='/proplan'>
            <h2 className=""><SvgElement type={icontypesEnum.UPGRADE} /></h2>
            </NavLink> */}
            <h2 className="pt-2"><SvgElement type={icontypesEnum.NOTIFICATION} /></h2>
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
