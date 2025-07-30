import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSmsApi } from '../../apis/AdminSmsApi';

function SmsMessagesManagement() {
    const [messages, setMessages] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = React.useCallback(() => {
        setLoading(true);
        const query: any = {
            status: statusFilter,
            start_date: startDate,
            end_date: endDate,
        };

        AdminSmsApi.getAllMessages('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setMessages(response?.data);
                }
                setLoading(false);
            }
        ).catch(function (error: any) {
            console.log(error);
            setLoading(false);
        });
    }, [statusFilter, startDate, endDate]);

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
                status: statusFilter,
                start_date: startDate,
                end_date: endDate,
            };

            AdminSmsApi.getAllMessages(value2, query).then(
                (response: AxiosResponse<any>) => {
                    if (response?.data) {
                        setMessages(response?.data);
                    }
                    setLoading(false);
                }
            ).catch(function (error: any) {
                console.log(error.response?.data);
                setLoading(false);
            });
        }, [statusFilter, startDate, endDate]);

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            draft: 'bg-gray-100 text-gray-800',
            queued: 'bg-blue-100 text-blue-800',
            sent: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getDeliveryRate = (successful: number, failed: number) => {
        const total = successful + failed;
        if (total === 0) return '0%';
        return `${Math.round((successful / total) * 100)}%`;
    };

    // Set default date range (last 30 days) on component mount
    React.useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

        setEndDate(today.toISOString().split('T')[0]);
        setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    }, []);

    return (
        <>
            <AdminSidebar />
            <ToastContainer />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6'>
                    <h1 className='text-[30px] font-semibold'>SMS Messages Management</h1>

                    {/* Filters */}
                    <div className='flex flex-wrap justify-between items-center mt-6 mb-4'>
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-2"
                            >
                                <option value="">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="queued">Queued</option>
                                <option value="sent">Sent</option>
                                <option value="delivered">Delivered</option>
                                <option value="failed">Failed</option>
                            </select>

                            {/* Date Range */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className="border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-2"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className="border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-2"
                                />
                            </div>

                            <button
                                type='button'
                                onClick={fetchMessages}
                                disabled={loading}
                                className="font-normal text-white bg-[#0071BC] px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Filter'}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 text-sm">
                            <div className="bg-blue-50 px-3 py-1 rounded">
                                Sent: {messages?.data?.filter((m: any) => m.status === 'sent').length || 0}
                            </div>
                            <div className="bg-green-50 px-3 py-1 rounded">
                                Delivered: {messages?.data?.filter((m: any) => m.status === 'delivered').length || 0}
                            </div>
                            <div className="bg-red-50 px-3 py-1 rounded">
                                Failed: {messages?.data?.filter((m: any) => m.status === 'failed').length || 0}
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Total Messages</h3>
                            <p className="text-2xl font-bold">{messages?.total || 0}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Total SMS Sent</h3>
                            <p className="text-2xl font-bold">
                                {messages?.data?.reduce((sum: number, msg: any) => sum + (msg.total_recipients || 0), 0) || 0}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Total Cost</h3>
                            <p className="text-2xl font-bold">
                                ₦{messages?.data?.reduce((sum: number, msg: any) => sum + (parseFloat(msg.cost) || 0), 0).toFixed(2) || '0.00'}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Avg Delivery Rate</h3>
                            <p className="text-2xl font-bold">
                                {messages?.data?.length > 0 ?
                                    Math.round(
                                        messages.data.reduce((sum: number, msg: any) => {
                                            const total = (msg.successful_sends || 0) + (msg.failed_sends || 0);
                                            return sum + (total > 0 ? (msg.successful_sends || 0) / total : 0);
                                        }, 0) / messages.data.length * 100
                                    ) + '%' : '0%'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">User</th>
                                    <th scope="col" className="px-6 py-3">Sender ID</th>
                                    <th scope="col" className="px-6 py-3">Recipients</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Delivery</th>
                                    <th scope="col" className="px-6 py-3">Cost</th>
                                    <th scope="col" className="px-6 py-3">Campaign</th>
                                    <th scope="col" className="px-6 py-3">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center">
                                            Loading messages...
                                        </td>
                                    </tr>
                                ) : messages?.data?.length > 0 ? (
                                    messages.data.map((message: any) => (
                                        <tr key={message.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{message.id}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{message.user?.name}</div>
                                                    <div className="text-gray-500 text-xs">{message.user?.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                    {message.sender?.sender_id || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="font-medium">{message.total_recipients || 0}</div>
                                                <div className="text-xs text-gray-500">recipients</div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(message.status)}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">
                                                    <div className="text-green-600">✓ {message.successful_sends || 0}</div>
                                                    <div className="text-red-600">✗ {message.failed_sends || 0}</div>
                                                    <div className="text-gray-500">
                                                        {getDeliveryRate(message.successful_sends || 0, message.failed_sends || 0)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-green-600">
                                                    ₦{parseFloat(message.cost || 0).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {message.campaign ? (
                                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                                        {message.campaign.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">
                                                    <div>{new Date(message.created_at).toLocaleDateString()}</div>
                                                    <div className="text-gray-500">{new Date(message.created_at).toLocaleTimeString()}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center">
                                            No messages found for the selected criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {messages?.links && (
                        <div className='m-4'>
                            {messages.links.filter((item: any, idx: any) => idx < 1000).map((data: any, index: any) => (
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
                </div>
            </div>
        </>
    )
}

export default SmsMessagesManagement