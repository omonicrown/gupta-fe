import React from "react";

// components

// import CardTiredLink from "../Cards/CardTiredLinks";
import CardTiredLinks from "../Cards/CardTiredLinks";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";


export default function TieredLink() {
  return (
    <>
      <Sidebar title="Multi Links"/>
      <div className="relative md:ml-64 bg-white">
        <AdminNavbar title="Multi Links" />
        {/* <div className="flex flex-wrap ">
        <div >
          <CardPage />
        </div>
      </div> */}

        <div className="flex flex-wrap mt-1">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
            <CardTiredLinks />
          </div>
        </div>
      
    </div>
    </>
  );
}
