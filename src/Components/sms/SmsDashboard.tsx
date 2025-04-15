import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import AdminNavbar from "../Navbars/AdminNavbar.js";
import {
  FiBarChart2,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiCalendar,
  FiHash,
  FiKey,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";

import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SmsDashboard() {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setIsLoading(true);
    SmsApis.getDashboardStatistics()
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {

          // console?.log(response?.data)
          setDashboardStats(response.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching dashboard statistics:", error);
        toast.error("Failed to load dashboard data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  //   console?.log(dashboardStats)

  // Modules for the SMS platform
  const modules = [
    {
      name: "Analytics",
      description: "View messaging stats and reports",
      icon: <FiBarChart2 className="h-6 w-6 text-blue-500" />,
      link: "/analytics",
      count: dashboardStats?.total_messages || 0,
      label: "Messages"
    },
    {
      name: "Contacts",
      description: "Manage your contact list",
      icon: <FiUsers className="h-6 w-6 text-green-500" />,
      link: "/contacts",
      count: dashboardStats?.contacts_count || 0,
      label: "Contacts"
    },
    {
      name: "Contact Groups",
      description: "Organize contacts into groups",
      icon: <FiUsers className="h-6 w-6 text-indigo-500" />,
      link: "/contact-groups",
      count: dashboardStats?.groups_count || 0,
      label: "Groups"
    },
    {
      name: "Messages",
      description: "Send and schedule messages",
      icon: <FiMessageSquare className="h-6 w-6 text-yellow-500" />,
      link: "/messages",
      count: (dashboardStats?.messages_stats?.delivered + (dashboardStats?.messages_stats?.draft ? dashboardStats?.messages_stats?.draft : 0) + (dashboardStats?.messages_stats?.queued ? dashboardStats?.messages_stats?.queued : 0) + (dashboardStats?.messages_stats?.sent ? dashboardStats?.messages_stats?.sent : 0)) || 0,
      label: "Messages"
    },
    {
      name: "Templates",
      description: "Create reusable message templates",
      icon: <FiFileText className="h-6 w-6 text-purple-500" />,
      link: "/templates",
      count: dashboardStats?.templates_count || 0,
      label: "Templates"
    },
    {
      name: "Campaigns",
      description: "Create and manage marketing campaigns",
      icon: <FiCalendar className="h-6 w-6 text-red-500" />,
      link: "/campaigns",
      count: dashboardStats?.campaigns_count || 0,
      label: "Campaigns"
    },
    {
      name: "Sender IDs",
      description: "Manage your sender identities",
      icon: <FiHash className="h-6 w-6 text-teal-500" />,
      link: "/sender-ids",
      count: dashboardStats?.sender_ids_count || 0,
      label: "Sender IDs"
    },
    {
      name: "API Keys",
      description: "Generate API keys for integration",
      icon: <FiKey className="h-6 w-6 text-gray-500" />,
      link: "/api-keys",
      count: dashboardStats?.api_key_count || 0,
      label: "API Keys"
    }
  ];

  return (
    <>
      <Sidebar title="SMS Platform" />

      <div className="ml-10">

      </div>

      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
        <AdminNavbar title="" />
        <div className="px-4 md:px-10 mx-auto w-full">

          <div className="flex flex-wrap items-center justify-between mb-6">

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">SMS Platform Dashboard</h1>
              <p className="text-sm text-gray-600">Manage all your SMS messaging needs</p>
            </div>
          </div>

          {/* Quick Stats Row */}
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4 mb-8">
              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Messages Sent</h3>
                    <div className="p-2 rounded-lg bg-blue-50">
                      <FiMessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {(dashboardStats?.messages_stats?.delivered + (dashboardStats?.messages_stats?.draft ? dashboardStats?.messages_stats?.draft : 0) + (dashboardStats?.messages_stats?.queued ? dashboardStats?.messages_stats?.queued : 0) + (dashboardStats?.messages_stats?.sent ? dashboardStats?.messages_stats?.sent : 0)) || 0}
                      </p>
                      {dashboardStats?.message_growth !== undefined && (
                        <div className="flex items-center mt-2">
                          {dashboardStats?.message_growth >= 0 ? (
                            <FiArrowUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <FiArrowDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <p
                            className={`text-xs ${dashboardStats?.message_growth >= 0
                                ? "text-green-500"
                                : "text-red-500"
                              }`}
                          >
                            {Math.abs(dashboardStats?.message_growth)?.toFixed(1)}% since last month
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Contacts</h3>
                    <div className="p-2 rounded-lg bg-green-50">
                      <FiUsers className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {dashboardStats?.contacts_count || 0}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        In {dashboardStats?.groups_count || 0} groups
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Delivery Rate</h3>
                    <div className="p-2 rounded-lg bg-indigo-50">
                      <FiBarChart2 className="h-6 w-6 text-indigo-500" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {dashboardStats?.delivery_rate ? `${dashboardStats?.delivery_rate?.toFixed(1)}%` : "0%"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {dashboardStats?.delivered_messages || 0} delivered of {dashboardStats?.total_messages || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Balance</h3>
                    <div className="p-2 rounded-lg bg-yellow-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        ₦{dashboardStats?.wallet_balance || "0.00"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {dashboardStats?.messages_remaining || 0} messages remaining
                      </p>
                    </div>
                    <Link to="/sms-wallet" className="text-xs text-blue-600 hover:text-blue-800">
                      Manage &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules?.map((module, index) => (
              <Link
                key={index}
                to={module?.link}
                className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-gray-100 mr-4">
                    {module?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{module?.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{module?.description}</p>
                    <div className="mt-3">
                      <span className="text-sm font-medium text-gray-700">
                        {module?.count} {module?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}