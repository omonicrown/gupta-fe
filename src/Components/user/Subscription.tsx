import React from "react";

// components

import CardSubscription from "../Cards/CardSubscription";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar";

export default function Subscription() {
  return (
    <>
  <Sidebar title="Subscriptions"/>
      <div className="relative md:ml-64 bg-white">
      <AdminNavbar title="Subscription"/>
      <div className="flex flex-wrap md:mt-4 mt-1">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardSubscription />
        </div>
      </div>
      </div>
    </>
  );
}
