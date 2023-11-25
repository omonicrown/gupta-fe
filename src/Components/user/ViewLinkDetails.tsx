import React from "react";

// components

import CardViewLinkDetails from "../Cards/CardViewLinkDetails";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateLink() {
  return (
    <>
  <Sidebar title="Link Details"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Link Details"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardViewLinkDetails />
        </div>
      </div>
      </div>
    </>
  );
}
