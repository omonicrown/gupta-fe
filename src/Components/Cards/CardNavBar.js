import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";
// components

export default function CardNavBar() {

  return (
    <form className="flex justify-between">
      {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
      <div class="relative invisible md:visible">
        <input type="search" style={{ borderColor: '#61A24F' }} id="default-search" class="block p-4 pl-4 w-full h-4 text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-green-500 focus:border-green-500 " placeholder="Search " />
        <svg aria-hidden="true" class="w-5 h-5 right-2.5 bottom-3 absolute text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

    <NavLink to='/createlink' className="flex justify-center">
        < span className="flex justify-center ">
          <button
            type="button"
            style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
            className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center "
          >
            + Create New
          </button>
        </span>
      </NavLink>
    </form>

  );
}
