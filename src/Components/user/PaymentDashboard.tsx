import React from "react";

// components

import CardPaymentDashboard from "../Cards/CardPaymentDashboard";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function PaymentDashboard() {
  return (
    <>
  <Sidebar title="Payment Dashboard"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Payment Dashboard" />
      <div className="flex flex-wrap mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-1">
          <CardPaymentDashboard />
        </div>
      </div>
      </div>
    </>
  );
}
