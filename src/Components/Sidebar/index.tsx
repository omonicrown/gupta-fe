import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaClipboardCheck, FaCircle, FaUserAlt, FaArrowCircleLeft } from "react-icons/fa";
import Navbar from '../../Components/Navbars/Navbar'

function SideBar() {

    const [open, setOpen] = useState(false)
    const location = useLocation()

    const Menus = [
        { title: 'Dashboard', path: '/dashboard', icon: <FaBox /> },
        { title: 'Add House', path: '/addhouse', icon: <FaClipboardCheck /> },
        { title: 'View Houses', path: '/profile', icon: <FaUserAlt /> },
        { title: 'Manage Houses', path: '/login', icon: <FaCircle /> },
    ]
    return (
        <>
        <Navbar/>
            <div
                className={`${open ? 'w-60' : 'w-fit'
                    } hidden sm:block relative h-screen duration-300 bg-[#171f4e] border-r border-gray-200 mt-16`}
            >
                <FaArrowCircleLeft
                    className={`${!open && 'rotate-180'
                        } absolute text-3xl bg-white fill-[#335ef7]  rounded-full cursor-pointer top-3 -right-4`}
                    onClick={() => setOpen(!open)}
                />
                <Link to='/'>
                    <div className="text-center">
                        {open && (
                            <span className='text-xl font-medium whitespace-nowrap text-white '>
                                HouseNg
                            </span>
                        )}
                    </div>
                </Link>

                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-[#335ef7] mt-2
                         ${location.pathname === menu.path &&
                                    'bg-gray-200'
                                    }`}
                            >
                                <span className='text-2xl text-white'>{menu.icon}</span>
                                <span
                                    className={`${!open && 'hidden'
                                        } origin-left duration-300 hover:block text-white`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SideBar