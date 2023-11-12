import React from "react";

// components

import CardEditProduct from "../Cards/CardEditProduct";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function EditProduct() {
  return (
    <>
  <Sidebar title="Edit Product"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Edit Product"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardEditProduct />
        </div>
      </div>
      </div>
    </>
  );
}
