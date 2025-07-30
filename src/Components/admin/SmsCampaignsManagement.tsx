import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSmsApi } from '../../apis/AdminSmsApi';

function SmsCampaignsManagement() {
    const [campaigns, setCampaigns] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = React.useCallback(() => {
        setLoading(true);
        const query: any = {
            search: searchText,
            status: statusFilter,
        };

        AdminSmsApi.getAllCampaigns('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setCampaigns(response?.data);
                }
                setLoading(false);
            }
        ).catch(function (error: any) {
            console.log(error);
            setLoading(false);
        });
    }, [searchText, statusFilter]);

    const paginator = React.useCallback(
        (value: any) => {
            setLoading(true);
            let value2 = '';
            if (value !== null) {
                value2 = value;
            } else {
                value2 = ''
            }
            const query: any = {
                search: searchText,
                status: statusFilter,
            };

            AdminSmsApi.getAllCampaigns(value2, query).then(
                (response: AxiosResponse<any>) => {
                    if (response?.data) {
                        setCampaigns(response?.data);
                    }
                    setLoading(false);
                }
            ).catch(function (error: any) {
                console.log(error.response?.data);
                setLoading(false);
            });
        }, [searchText, statusFilter]);

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            draft: 'bg-gray-100 text-gray-800',
            scheduled: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            canceled: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
                {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <>
            <AdminSidebar />
            <ToastContainer />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6'>
                    <h1 className='text-[30px] font-semibold'>SMS Campaigns Management</h1>

                    {/* Filters */}
                    <div className='flex flex-wrap justify-between items-center mt-6 mb-4'>
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Search */}
                            <div className="relative flex items-stretch">
                                <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                    placeholder='Search campaigns or users...'
                                    className="border border-gray-300 text-gray-500 text-sm rounded-md block w-64 pl-4 pr-10 p-2"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-2"
                            >
                                <option value="">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>

                            <button
                                type='button'
                                onClick={fetchCampaigns}
                                disabled={loading}
                                className="font-normal text-white bg-[#0071BC] px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Search'}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 text-sm">
                            <div className="bg-blue-50 px-3 py-1 rounded">
                                Active: {campaigns?.data?.filter((c: any) => ['scheduled', 'in_progress'].includes(c.status)).length || 0}
                            </div>
                            <div className="bg-green-50 px-3 py-1 rounded">
                                Completed: {campaigns?.data?.filter((c: any) => c.status === 'completed').length || 0}
                            </div>
                            <div className="bg-gray-50 px-3 py-1 rounded">
                                Total: {campaigns?.data?.length || 0}
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Total Campaigns</h3>
                            <p className="text-2xl font-bold">{campaigns?.total || 0}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Active Campaigns</h3>
                            <p className="text-2xl font-bold">
                                {campaigns?.data?.filter((c: any) => ['scheduled', 'in_progress'].includes(c.status)).length || 0}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Completed</h3>
                            <p className="text-2xl font-bold">
                                {campaigns?.data?.filter((c: any) => c.status === 'completed').length || 0}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Total Messages</h3>
                            <p className="text-2xl font-bold">
                                {campaigns?.data?.reduce((sum: number, campaign: any) => sum + (campaign.messages_count || 0), 0) || 0}
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Campaign Details</th>
                                    <th scope="col" className="px-6 py-3">User</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Messages</th>
                                    <th scope="col" className="px-6 py-3">Scheduled</th>
                                    <th scope="col" className="px-6 py-3">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            Loading campaigns...
                                        </td>
                                    </tr>
                                ) : campaigns?.data?.length > 0 ? (
                                    campaigns.data.map((campaign: any) => (
                                        <tr key={campaign.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{campaign.id}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{campaign.name}</div>
                                                    <div className="text-gray-500 text-xs mt-1">
                                                        {campaign.description ?
                                                            (campaign.description.length > 50 ?
                                                                campaign.description.substring(0, 50) + '...' :
                                                                campaign.description
                                                            ) :
                                                            'No description'
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{campaign.user?.name}</div>
                                                    <div className="text-gray-500 text-xs">{campaign.user?.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="font-medium">{campaign.messages_count || 0}</div>
                                                <div className="text-xs text-gray-500">messages</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">
                                                    {campaign.scheduled_at ? (
                                                        <>
                                                            <div>{new Date(campaign.scheduled_at).toLocaleDateString()}</div>
                                                            <div className="text-gray-500">{new Date(campaign.scheduled_at).toLocaleTimeString()}</div>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">Not scheduled</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">
                                                    <div>{new Date(campaign.created_at).toLocaleDateString()}</div>
                                                    <div className="text-gray-500">{new Date(campaign.created_at).toLocaleTimeString()}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            No campaigns found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {campaigns?.links && (
                        <div className='m-4'>
                            {campaigns.links.filter((item: any, idx: any) => idx < 1000).map((data: any, index: any) => (
                                <button
                                    key={index}
                                    onClick={() => paginator(data?.label === 'Next &raquo;' ? data?.url.charAt(data?.url.length - 1) : (data?.label === '&laquo; Previous') ? data?.url.charAt(data?.url.length - 1) : data?.label)}
                                    disabled={data?.active || loading}
                                    className={'mx-1 py-1 px-2 ' + (data?.active === false ? 'bg-gray-300 text-black ' : 'bg-[#0071BC] text-white')}
                                >
                                    {data?.label === '&laquo; Previous' ? '< Previous' : (data?.label === 'Next &raquo;') ? 'Next >' : data?.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Campaign Performance Insights */}
                    {campaigns?.data?.length > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Performance Insights</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-medium text-gray-700 mb-2">Most Active User</h3>
                                    {(() => {
                                        const userCounts = campaigns.data.reduce((acc: any, campaign: any) => {
                                            const userId = campaign.user?.id;
                                            if (userId) {
                                                acc[userId] = {
                                                    name: campaign.user.name,
                                                    email: campaign.user.email,
                                                    count: (acc[userId]?.count || 0) + 1
                                                };
                                            }
                                            return acc;
                                        }, {});

                                        const topUser = Object.values(userCounts).sort((a: any, b: any) => b.count - a.count)[0] as any;

                                        return topUser ? (
                                            <div>
                                                <div className="font-semibold text-indigo-600">{topUser.name}</div>
                                                <div className="text-sm text-gray-500">{topUser.count} campaigns</div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500">No data available</div>
                                        );
                                    })()}
                                </div>

                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-medium text-gray-700 mb-2">Completion Rate</h3>
                                    {(() => {
                                        const completed = campaigns.data.filter((c: any) => c.status === 'completed').length;
                                        const total = campaigns.data.length;
                                        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

                                        return (
                                            <div>
                                                <div className="font-semibold text-green-600">{rate}%</div>
                                                <div className="text-sm text-gray-500">{completed} of {total} completed</div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-medium text-gray-700 mb-2">Avg Messages per Campaign</h3>
                                    {(() => {
                                        const totalMessages = campaigns.data.reduce((sum: number, campaign: any) => sum + (campaign.messages_count || 0), 0);
                                        const avgMessages = campaigns.data.length > 0 ? Math.round(totalMessages / campaigns.data.length) : 0;

                                        return (
                                            <div>
                                                <div className="font-semibold text-blue-600">{avgMessages}</div>
                                                <div className="text-sm text-gray-500">messages per campaign</div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SmsCampaignsManagement