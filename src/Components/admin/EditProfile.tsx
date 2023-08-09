import React from "react";

// components

import CardUpdateProfile from "../Cards/CardUpdateProfile";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateLink() {
  return (
    <>
      <Sidebar title="Profile"/>
      <div className="relative md:ml-64 bg-white">
        <AdminNavbar title="Profile" />
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4">
            <CardUpdateProfile />
          </div>
        </div>
      </div>
    </>
  );
}
