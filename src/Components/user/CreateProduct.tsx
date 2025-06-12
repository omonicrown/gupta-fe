import React from "react";

// components

import CardCreateProduct from "../Cards/CardCreateProduct";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateProduct() {
  return (
    <>
  <Sidebar title="Create Product"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Create Product"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-12 px-4">
          <CardCreateProduct />
        </div>
      </div>
      </div>
    </>
  );
}
