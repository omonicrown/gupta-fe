import React from "react";

// components

import CardViewProductPage from "../Cards/CardViewProductPage";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function ViewProductPage() {
  return (
    <>
  {/* <Sidebar title="Edit Multi Link"/> */}
      
      {/* <AdminNavbar title="Edit Multi Link"/> */}
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardViewProductPage />
        </div>
     
      </div>
    </>
  );
}
