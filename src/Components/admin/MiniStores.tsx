import React from "react";

// components

import CardMiniStore from "../Cards/CardMiniStore ";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function MiniStores() {
  return (
    <>
  <Sidebar title="Mini Store"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Mini Store" />
      <div className="flex flex-wrap mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
          <CardMiniStore />
        </div>
      </div>
      </div>
    </>
  );
}
