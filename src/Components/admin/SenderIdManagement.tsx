import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSmsApi } from '../../apis/AdminSmsApi';
//@ts-ignore
import Modal from 'react-awesome-modal';

function SenderIdManagement() {
    const [senderIds, setSenderIds] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // Modal states
    const [visible, setVisible] = React.useState<boolean>(false);
    const [selectedSenderId, setSelectedSenderId] = React.useState<any>(null);
    const [actionType, setActionType] = React.useState<'approve' | 'reject'>('approve');
    const [rejectionReason, setRejectionReason] = React.useState('');

    React.useEffect(() => {
        fetchSenderIds();
    }, []);

    const fetchSenderIds = React.useCallback(() => {
        setLoading(true);
        const query: any = {
            search: searchText,
            status: statusFilter,
        };

        AdminSmsApi.getAllSenderIds('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setSenderIds(response?.data);
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

            AdminSmsApi.getAllSenderIds(value2, query).then(
                (response: AxiosResponse<any>) => {
                    if (response?.data) {
                        setSenderIds(response?.data);
                    }
                    setLoading(false);
                }
            ).catch(function (error: any) {
                console.log(error.response?.data);
                setLoading(false);
            });
        }, [searchText, statusFilter]);

    const openActionModal = (senderId: any, action: 'approve' | 'reject') => {
        setSelectedSenderId(senderId);
        setActionType(action);
        setRejectionReason('');
        setVisible(true);
    };

    const handleAction = () => {
        if (!selectedSenderId) return;

        const data: any = {
            status: actionType === 'approve' ? 'approved' : 'rejected'
        };

        if (actionType === 'reject' && rejectionReason.trim()) {
            data.rejection_reason = rejectionReason.trim();
        } else if (actionType === 'reject' && !rejectionReason.trim()) {
            toast.error('Please provide a rejection reason');
            return;
        }

        AdminSmsApi.updateSenderIdStatus(selectedSenderId.id, data).then(
            (response: any) => {
                if (response?.data) {
                    toast.success(`Sender ID ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`);
                    setVisible(false);
                    fetchSenderIds(); // Refresh the list
                } else {
                    toast.error(response?.response?.data?.message || 'Action failed');
                }
            }
        ).catch(function (error: any) {
            console.log(error.response);
            toast.error(error.response?.data?.message || 'Action failed');
        });
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <AdminSidebar />
            <ToastContainer />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6'>
                    <h1 className='text-[30px] font-semibold'>Sender ID Management</h1>

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
                                    placeholder='Search by user or sender ID...'
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
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <button
                                type='button'
                                onClick={fetchSenderIds}
                                disabled={loading}
                                className="font-normal text-white bg-[#0071BC] px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Search'}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 text-sm">
                            <div className="bg-yellow-50 px-3 py-1 rounded">
                                Pending: {senderIds?.data?.filter((s: any) => s.status === 'pending').length || 0}
                            </div>
                            <div className="bg-green-50 px-3 py-1 rounded">
                                Approved: {senderIds?.data?.filter((s: any) => s.status === 'approved').length || 0}
                            </div>
                            <div className="bg-red-50 px-3 py-1 rounded">
                                Rejected: {senderIds?.data?.filter((s: any) => s.status === 'rejected').length || 0}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">S/N</th>
                                    <th scope="col" className="px-6 py-3">User</th>
                                    <th scope="col" className="px-6 py-3">Sender ID</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Created Date</th>
                                    <th scope="col" className="px-6 py-3">Rejection Reason</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            Loading sender IDs...
                                        </td>
                                    </tr>
                                ) : senderIds?.data?.length > 0 ? (
                                    senderIds.data.map((senderId: any, index: any) => (
                                        <tr key={senderId.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{senderId.user?.name}</div>
                                                    <div className="text-gray-500 text-xs">{senderId.user?.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{senderId.sender_id}</td>
                                            <td className="px-6 py-4">{getStatusBadge(senderId.status)}</td>
                                            <td className="px-6 py-4">{new Date(senderId.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                {senderId.rejection_reason ? (
                                                    <span className="text-red-600 text-xs">{senderId.rejection_reason}</span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    {senderId.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => openActionModal(senderId, 'approve')}
                                                                className="text-green-600 hover:text-green-800 text-xs font-medium"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => openActionModal(senderId, 'reject')}
                                                                className="text-red-600 hover:text-red-800 text-xs font-medium"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {senderId.status === 'approved' && (
                                                        <button
                                                            onClick={() => openActionModal(senderId, 'reject')}
                                                            className="text-red-600 hover:text-red-800 text-xs font-medium"
                                                        >
                                                            Revoke
                                                        </button>
                                                    )}
                                                    {senderId.status === 'rejected' && (
                                                        <button
                                                            onClick={() => openActionModal(senderId, 'approve')}
                                                            className="text-green-600 hover:text-green-800 text-xs font-medium"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            No sender IDs found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {senderIds?.links && (
                        <div className='m-4'>
                            {senderIds.links.filter((item: any, idx: any) => idx < 1000).map((data: any, index: any) => (
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

            {/* Action Modal */}
            <Modal
                visible={visible}
                width="500"
                height={actionType === 'reject' ? "350" : "250"}
                effect="fadeInUp"
                onClickAway={() => setVisible(false)}
            >
                <div className="h-full overflow-auto">
                    <div className="flex justify-end pr-2 pt-2">
                        <button
                            className="cursor-pointer font-bold text-gray-500 hover:text-gray-700"
                            onClick={() => setVisible(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="bg-white items-center rounded-lg p-4 px-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            {actionType === 'approve' ? 'Approve' : 'Reject'} Sender ID
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Are you sure you want to {actionType} the sender ID "{selectedSenderId?.sender_id}"
                            for user {selectedSenderId?.user?.name}?
                        </p>

                        {actionType === 'reject' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rejection Reason *
                                </label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Please provide a reason for rejection..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    required
                                />
                            </div>
                        )}

                        <div className="flex justify-center space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setVisible(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAction}
                                className={`px-4 py-2 rounded-md text-white font-medium ${actionType === 'approve'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-red-500 hover:bg-red-600'
                                    }`}
                            >
                                {actionType === 'approve' ? 'Approve' : 'Reject'} Sender ID
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SenderIdManagement