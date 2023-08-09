import React from "react";

// components

import CardCreateLink from "../Cards/CardCreateLink";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateLink() {
  return (
    <>
      <Sidebar title="My Links"/>
      <div className="relative md:ml-64 bg-white">
        <AdminNavbar title="My Links" />
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
            <CardCreateLink />
          </div>
        </div>
      </div>
    </>
  );
}
