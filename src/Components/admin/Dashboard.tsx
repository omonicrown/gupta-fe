import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { SuperAdminApis } from '../../apis/superAdminApi';
import { AdminSmsApi } from '../../apis/AdminSmsApi';
import { AxiosResponse } from 'axios';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {

  const dispatch: Dispatch = useDispatch();
  const [userCount, setUserCount] = React.useState<any>([]);
  const [smsStats, setSmsStats] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch existing stats
        const linksResponse: any = await SuperAdminApis.getlinksCount();
        if (linksResponse?.data) {
          setUserCount(linksResponse?.data?.data);
        }

        // Fetch SMS stats
        const smsResponse = await AdminSmsApi.getSmsDashboard();
        if (smsResponse?.data) {
          setSmsStats(smsResponse?.data);
        }

      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <AdminSidebar />
        <div className="relative md:ml-64 bg-white">
          <div className='py-10 lg:py-20 lg:px-10 px-6 '>
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading dashboard...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />
      <div className="relative md:ml-64 bg-white">
        <div className='py-10 lg:py-20 lg:px-10 px-6 '>
          <h1 className='text-[30px] font-semibold mb-8'>Admin Dashboard</h1>

          {/* Links Statistics */}
          <div className="mb-8">
            <h2 className='text-[24px] font-semibold mb-4'>Links & Users Statistics</h2>
            <div className="space-y-2 lg:grid lg:grid-cols-4 sm:gap-5 lg:space-y-0">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Total Users</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_users || 0}</h5>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-blue-600 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Total Clicks</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_Clicks || 0}</h5>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Whatsapp Links</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_whatsapp_link || 0}</h5>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Redirect Links</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_redirect_link || 0}</h5>
              </div>
            </div>
          </div>

          {/* SMS Statistics */}
          <div className="mb-8">
            <h2 className='text-[24px] font-semibold mb-4'>SMS Platform Statistics</h2>
            <div className="space-y-2 lg:grid lg:grid-cols-4 sm:gap-5 lg:space-y-0">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Total SMS Sent</h3>
                <h5 className='text-[28px] font-bold'>{smsStats?.total_sms_sent || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Last 7 days: {smsStats?.recent_sms_activity || 0}
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>SMS Revenue</h3>
                <h5 className='text-[28px] font-bold'>₦{smsStats?.total_amount_spent || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Platform earnings
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>SMS Users</h3>
                <h5 className='text-[28px] font-bold'>{smsStats?.total_sms_users || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Active wallets
                </p>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Delivery Rate</h3>
                <h5 className='text-[28px] font-bold'>{smsStats?.delivery_rate || 0}%</h5>
                <p className='text-[12px] opacity-75'>
                  Success rate
                </p>
              </div>
            </div>
          </div>

          {/* Sender IDs & Wallet Stats */}
          <div className="mb-8">
            <h2 className='text-[24px] font-semibold mb-4'>Sender IDs & Wallets</h2>
            <div className="space-y-2 lg:grid lg:grid-cols-3 sm:gap-5 lg:space-y-0">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Active Sender IDs</h3>
                <h5 className='text-[28px] font-bold'>{smsStats?.active_sender_ids || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Approved for use
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Pending Approvals</h3>
                <h5 className='text-[28px] font-bold'>{smsStats?.pending_sender_ids || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Awaiting review
                </p>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-normal'>Total Wallet Balance</h3>
                <h5 className='text-[28px] font-bold'>₦{smsStats?.total_wallet_balance || 0}</h5>
                <p className='text-[12px] opacity-75'>
                  Platform total
                </p>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="mb-8">
            <h2 className='text-[24px] font-semibold mb-4'>Additional Statistics</h2>
            <div className="space-y-2 lg:grid lg:grid-cols-3 sm:gap-5 lg:space-y-0">
              <div className="bg-gradient-to-r from-teal-200 to-lime-200 text-gray-800 border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-semibold'>Multi Links</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_multi_link || 0}</h5>
              </div>
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-800 border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-semibold'>Market Links</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_market_link || 0}</h5>
              </div>
              <div className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800 border border-[#D8D8D8] rounded-lg shadow-md px-4 py-4">
                <h3 className='text-[18px] font-semibold'>Total Products</h3>
                <h5 className='text-[28px] font-bold'>{userCount?.total_products || 0}</h5>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className='text-[24px] font-semibold mb-4'>Quick Actions</h2>
            <div className="space-y-2 lg:grid lg:grid-cols-4 sm:gap-5 lg:space-y-0">
              <button className="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors rounded-lg shadow-md px-4 py-4 text-left">
                <h3 className='text-[16px] font-semibold'>Manage Sender IDs</h3>
                <p className='text-[12px] mt-1'>Review pending requests</p>
              </button>
              <button className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors rounded-lg shadow-md px-4 py-4 text-left">
                <h3 className='text-[16px] font-semibold'>SMS Users</h3>
                <p className='text-[12px] mt-1'>Manage user wallets</p>
              </button>
              <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors rounded-lg shadow-md px-4 py-4 text-left">
                <h3 className='text-[16px] font-semibold'>SMS Settings</h3>
                <p className='text-[12px] mt-1'>Configure platform</p>
              </button>
              <button className="bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors rounded-lg shadow-md px-4 py-4 text-left">
                <h3 className='text-[16px] font-semibold'>View Messages</h3>
                <p className='text-[12px] mt-1'>Platform activity</p>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard