import React from "react";

// components

import CardTiredLink from "../Cards/CardTiredLinks";
import CardPage from "../Cards/CardTired";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";


export default function Dashboard() {
  return (
    <>
      <Sidebar title="Tiered Links"/>
      <div className="relative md:ml-64 bg-white">
        <AdminNavbar title="Tiered Links" />
        {/* <div className="flex flex-wrap ">
        <div >
          <CardPage />
        </div>
      </div> */}

        <div className="flex flex-wrap mt-1">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
            <CardPage />
          </div>
        </div>
      
    </div>
    </>
  );
}
