import React from "react";

// components

import CardCreateRedirectLink from "../Cards/CardCreateRedirectLink";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateRedirectLink() {
  return (
    <>
  <Sidebar title="Create Redirect Link"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Create Redirect Link"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardCreateRedirectLink />
        </div>
      </div>
      </div>
    </>
  );
}
