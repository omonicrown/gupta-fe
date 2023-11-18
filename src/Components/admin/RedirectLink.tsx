import React from "react";

// components

import CardRedirectLink from "../Cards/CardRedirectLink";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function RedirectLink() {
  return (
    <>
  <Sidebar title="My Redirect Links"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="My Redirect Links" />
      <div className="flex flex-wrap mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
          <CardRedirectLink />
        </div>
      </div>
      </div>
    </>
  );
}
