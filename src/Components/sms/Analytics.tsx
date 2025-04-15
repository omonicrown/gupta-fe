import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios";
import AdminNavbar from "../Navbars/AdminNavbar.js";
// import Sidebar from "../Sidebar";

import Sidebar from "../Sidebar/Sidebar";
import StatisticCard from "./AnalyticsConponent/StatisticCard";
import MessageStatusChart from "./AnalyticsConponent/MessageStatusChart";
import SenderIdPerformance from "./AnalyticsConponent/SenderIdPerformance";
import MessageTimeline from "./AnalyticsConponent/MessageTimeline";
import DateRangePicker from "./AnalyticsConponent/DateRangePicker";
import { FiCalendar, FiBarChart2, FiPieChart, FiActivity } from "react-icons/fi";
import { SmsApis } from "../../apis/smsApis";

export default function Analytics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoginData = useSelector((state: any) => state.data.login.value);
  
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [messageStats, setMessageStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });

  useEffect(() => {
    fetchDashboardData();
    fetchMessageAnalytics();
  }, [dateRange]);

  const fetchDashboardData = () => {
    setIsLoading(true);
    SmsApis.getDashboardStatistics()
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setDashboardStats(response.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching dashboard statistics:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMessageAnalytics = () => {
    setIsLoading(true);
    SmsApis.getMessageAnalytics(dateRange.startDate, dateRange.endDate)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setMessageStats(response.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching message analytics:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDateRangeChange = (newRange: {startDate: string, endDate: string}) => {
    setDateRange(newRange);
  };


  return (
    <>
      <Sidebar title="Analytics" />
      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
      <AdminNavbar title=""/>
        <div className="px-4 md:px-10 mx-auto w-full ">
          <div className="flex flex-wrap">
            <div className="w-full mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Message Analytics</h1>
              <p className="text-sm text-gray-600">Overview of your SMS messaging statistics</p>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="mb-6">
            <DateRangePicker 
              startDate={dateRange.startDate} 
              endDate={dateRange.endDate} 
              onDateRangeChange={handleDateRangeChange}
            />
          </div>

          {/* Stats Cards Row */}
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4">
              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <StatisticCard 
                  title="Total Messages" 
                  value={messageStats?.delivery_stats?.delivered + messageStats?.delivery_stats?.draft + messageStats?.delivery_stats?.queued + messageStats?.delivery_stats?.sent || 0} 
                  icon={<FiBarChart2 className="h-6 w-6 text-blue-500" />} 
                  change={messageStats?.message_growth || 0} 
                  changeType={messageStats?.message_growth >= 0 ? "positive" : "negative"}
                />
              </div>
              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <StatisticCard 
                  title="Delivered" 
                  value={messageStats?.delivery_stats?.delivered || 0} 
                  icon={<FiActivity className="h-6 w-6 text-green-500" />} 
                  change={messageStats?.delivery_rate || 0} 
                  changeLabel="delivery rate"
                  changeType="neutral"
                />
              </div>
              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <StatisticCard 
                  title="Sent" 
                  value={messageStats?.delivery_stats?.sent || 0} 
                  icon={<FiActivity className="h-6 w-6 text-red-500" />} 
                  change={messageStats?.failure_rate || 0} 
                  changeLabel="failure rate"
                  changeType="neutral"
                />
              </div>
              <div className="w-full xl:w-1/4 md:w-1/2 px-4 mb-6">
                <StatisticCard 
                  title="Pending" 
                  value={messageStats?.delivery_stats?.queued || 0} 
                  icon={<FiActivity className="h-6 w-6 text-yellow-500" />} 
                  change={messageStats?.pending_rate || 0} 
                  changeLabel="pending rate"
                  changeType="neutral"
                />
              </div>
            </div>
          )}

          {/* Charts Row */}
          <div className="flex flex-wrap -mx-4">
            {/* Message Timeline */}
            <div className="w-full xl:w-2/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4 h-96">
                <h2 className="text-lg font-semibold text-gray-700 mb-4"> Top Sender IDs</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                  </div>
                ) : (
                  <SenderIdPerformance data={messageStats?.top_sender_ids || []} />
                  // <MessageTimeline data={messageStats?.daily_stats || []} />
                )}
              </div>
            </div>

            {/* Message Status Distribution */}
            <div className="w-full xl:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4 h-96">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Message Status</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                  </div>
                ) : (
                  <MessageStatusChart data={messageStats?.status_distribution || []} />
                )}
              </div>
            </div>
          </div>

          {/* Sender ID Performance */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Message Timeline </h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                  </div>
                ) : (
                  <MessageTimeline data={messageStats?.daily_stats || []} />
                  
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}