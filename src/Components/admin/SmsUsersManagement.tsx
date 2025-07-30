import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSmsApi } from '../../apis/AdminSmsApi';
//@ts-ignore
import Modal from 'react-awesome-modal';

function SmsUsersManagement() {
    const [users, setUsers] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // Modal states
    const [visible, setVisible] = React.useState<boolean>(false);
    const [selectedUser, setSelectedUser] = React.useState<any>(null);
    const [modalType, setModalType] = React.useState<'status' | 'funds'>('status');
    const [newStatus, setNewStatus] = React.useState('');
    const [fundAmount, setFundAmount] = React.useState('');
    const [fundDescription, setFundDescription] = React.useState('');

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = React.useCallback(() => {
        setLoading(true);
        const query: any = {
            search: searchText,
        };

        AdminSmsApi.getAllSmsUsers('', query).then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setUsers(response?.data);
                }
                setLoading(false);
            }
        ).catch(function (error: any) {
            console.log(error);
            setLoading(false);
        });
    }, [searchText]);

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
            };

            AdminSmsApi.getAllSmsUsers(value2, query).then(
                (response: AxiosResponse<any>) => {
                    if (response?.data) {
                        setUsers(response?.data);
                    }
                    setLoading(false);
                }
            ).catch(function (error: any) {
                console.log(error.response?.data);
                setLoading(false);
            });
        }, [searchText]);

    const openStatusModal = (user: any) => {
        setSelectedUser(user);
        setModalType('status');
        setNewStatus(user.sms_wallet?.status === 'active' ? 'suspended' : 'active');
        setVisible(true);
    };

    const openFundsModal = (user: any) => {
        setSelectedUser(user);
        setModalType('funds');
        setFundAmount('');
        setFundDescription('');
        setVisible(true);
    };

    const handleStatusUpdate = () => {
        if (!selectedUser) return;

        AdminSmsApi.updateUserWalletStatus(selectedUser.id, { status: newStatus }).then(
            (response: any) => {
                if (response?.data) {
                    toast.success(`User wallet ${newStatus} successfully`);
                    setVisible(false);
                    fetchUsers(); // Refresh the list
                } else {
                    toast.error(response?.response?.data?.message || 'Status update failed');
                }
            }
        ).catch(function (error: any) {
            console.log(error.response);
            toast.error(error.response?.data?.message || 'Status update failed');
        });
    };

    const handleAddFunds = () => {
        if (!selectedUser || !fundAmount || parseFloat(fundAmount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        const data = {
            amount: parseFloat(fundAmount),
            description: fundDescription || 'Admin manual funding'
        };

        AdminSmsApi.addFundsToUser(selectedUser.id, data).then(
            (response: any) => {
                if (response?.data) {
                    toast.success(`₦${fundAmount} added to user wallet successfully`);
                    setVisible(false);
                    fetchUsers(); // Refresh the list
                } else {
                    toast.error(response?.response?.data?.message || 'Failed to add funds');
                }
            }
        ).catch(function (error: any) {
            console.log(error.response);
            toast.error(error.response?.data?.message || 'Failed to add funds');
        });
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            active: 'bg-green-100 text-green-800',
            suspended: 'bg-red-100 text-red-800',
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
                    <h1 className='text-[30px] font-semibold'>SMS Users Management</h1>

                    {/* Search and Stats */}
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
                                    placeholder='Search by name or email...'
                                    className="border border-gray-300 text-gray-500 text-sm rounded-md block w-64 pl-4 pr-10 p-2"
                                />
                            </div>

                            <button
                                type='button'
                                onClick={fetchUsers}
                                disabled={loading}
                                className="font-normal text-white bg-[#0071BC] px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Search'}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 text-sm">
                            <div className="bg-green-50 px-3 py-1 rounded">
                                Active: {users?.data?.filter((u: any) => u.sms_wallet?.status === 'active').length || 0}
                            </div>
                            <div className="bg-red-50 px-3 py-1 rounded">
                                Suspended: {users?.data?.filter((u: any) => u.sms_wallet?.status === 'suspended').length || 0}
                            </div>
                            <div className="bg-blue-50 px-3 py-1 rounded">
                                Total: {users?.data?.length || 0}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">S/N</th>
                                    <th scope="col" className="px-6 py-3">User Details</th>
                                    <th scope="col" className="px-6 py-3">Wallet Balance</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Messages Sent</th>
                                    <th scope="col" className="px-6 py-3">Sender IDs</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            Loading SMS users...
                                        </td>
                                    </tr>
                                ) : users?.data?.length > 0 ? (
                                    users.data.map((user: any, index: any) => (
                                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-gray-500 text-xs">{user.email}</div>
                                                    <div className="text-gray-400 text-xs">
                                                        Joined: {new Date(user.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-green-600">
                                                    ₦{user.sms_wallet?.balance || 0}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {user.sms_wallet?.currency || 'NGN'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(user.sms_wallet?.status || 'inactive')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="font-medium">{user.messages_count || 0}</div>
                                                <div className="text-xs text-gray-500">messages</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="font-medium">{user.sender_ids_count || 0}</div>
                                                <div className="text-xs text-gray-500">sender IDs</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col space-y-1">
                                                    <button
                                                        onClick={() => openStatusModal(user)}
                                                        className={`text-xs font-medium px-2 py-1 rounded ${user.sms_wallet?.status === 'active'
                                                            ? 'text-red-600 hover:text-red-800 hover:bg-red-50'
                                                            : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                                                            }`}
                                                    >
                                                        {user.sms_wallet?.status === 'active' ? 'Suspend' : 'Activate'}
                                                    </button>
                                                    <button
                                                        onClick={() => openFundsModal(user)}
                                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs font-medium px-2 py-1 rounded"
                                                    >
                                                        Add Funds
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            No SMS users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users?.links && (
                        <div className='m-4'>
                            {users.links.filter((item: any, idx: any) => idx < 1000).map((data: any, index: any) => (
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

            {/* Modal */}
            <Modal
                visible={visible}
                width="500"
                height={modalType === 'funds' ? "400" : "300"}
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
                        {modalType === 'status' ? (
                            <>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    {newStatus === 'active' ? 'Activate' : 'Suspend'} User Wallet
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to {newStatus === 'active' ? 'activate' : 'suspend'} the
                                    SMS wallet for user "{selectedUser?.name}"?
                                </p>

                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setVisible(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleStatusUpdate}
                                        className={`px-4 py-2 rounded-md text-white font-medium ${newStatus === 'active'
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                    >
                                        {newStatus === 'active' ? 'Activate' : 'Suspend'} Wallet
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Add Funds to User Wallet
                                </h2>

                                <p className="text-gray-600 mb-4">
                                    Add funds to "{selectedUser?.name}"'s SMS wallet
                                </p>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Amount (₦) *
                                    </label>
                                    <input
                                        type="number"
                                        value={fundAmount}
                                        onChange={(e) => setFundAmount(e.target.value)}
                                        placeholder="Enter amount to add"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="1"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={fundDescription}
                                        onChange={(e) => setFundDescription(e.target.value)}
                                        placeholder="Reason for adding funds"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setVisible(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddFunds}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
                                    >
                                        Add Funds
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SmsUsersManagement