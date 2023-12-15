import React from "react";

// components

import CardEditMultiLink from "../Cards/CardEditMultiLink";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateLink() {
  return (
    <>
  <Sidebar title="Edit Multi Link"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Edit Multi Link"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardEditMultiLink />
        </div>
      </div>
      </div>
    </>
  );
}
