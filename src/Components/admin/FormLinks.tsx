import React from "react";

// components

import CardTiredLink from "../Cards/CardTiredLinks";
import CardPage from "../Cards/CardFormLinks";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";


export default function FormLinks() {
  return (
    <>
       <Sidebar title="Form Links"/>
      <div className="relative md:ml-64 bg-white">
        <AdminNavbar title="Form Links" />
        <div className="flex flex-wrap mt-1">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
            <CardPage />
          </div>
        </div>
    </div>
    </>
  );
}
