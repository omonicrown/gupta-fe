import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { FaMoneyBillWave, FaHistory, FaFileInvoice, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../Navbars/AdminNavbar.js";
// import { SmsWalletApis } from "../../../apis/SmsWalletApis";
import { SmsWalletApis, SmsApis } from "../../apis/smsApis";

export default function SmsWallet() {
    const navigate = useNavigate();

    // State for wallet details
    const [wallet, setWallet] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<any>([]);
    const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

    // State for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);

    // State for filtering
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");

    // Modal states
    const [fundModalVisible, setFundModalVisible] = useState<boolean>(false);
    const [fundAmount, setFundAmount] = useState<string>("");
    const [fundingLoading, setFundingLoading] = useState<boolean>(false);
    const [transactionModalVisible, setTransactionModalVisible] = useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [paymentSuccessModalVisible, setPaymentSuccessModalVisible] = useState<boolean>(false);
    const [paymentLink, setPaymentLink] = useState<string>("");

    // Fetch wallet details and transactions on component mount
    useEffect(() => {
        fetchWalletDetails();
        fetchTransactions();
    }, [currentPage, typeFilter, statusFilter]);

    // Function to fetch wallet details
    const fetchWalletDetails = async () => {
        setLoading(true);
        try {
            const response = await SmsWalletApis.getWalletDetails();
            if (response?.data?.wallet) {
                setWallet(response.data.wallet);
            } else {
                toast.error("Failed to fetch wallet details");
            }
        } catch (error: any) {
            console.error("Error fetching wallet details:", error);
            toast.error(error?.response?.data?.message || "An error occurred while fetching wallet details");
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch transactions
    const fetchTransactions = async () => {
        setTransactionsLoading(true);
        try {
            const response = await SmsWalletApis.getTransactions(
                perPage,
                typeFilter,
                statusFilter
            );

            if (response?.data?.data) {
                console?.log(response?.data?.data)
                setTransactions(response?.data?.data);
                setTotalPages(Math.ceil(response.data.data?.total / response.data?.data?.per_page));
            } else {
                toast.error("Failed to fetch transactions");
            }
        } catch (error: any) {
            console.error("Error fetching transactions:", error);
            toast.error(error?.response?.data?.message || "An error occurred while fetching transactions");
        } finally {
            setTransactionsLoading(false);
        }
    };

    // Handle fund wallet
    const handleFundWallet = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate amount
        const amount = parseFloat(fundAmount);
        if (isNaN(amount) || amount < 1000) {
            toast.error("Minimum amount is 1000 NGN");
            return;
        }

        setFundingLoading(true);
        try {
            const response = await SmsWalletApis.initiatePayment({
                amount: amount,
                currency: "NGN",
                description: "SMS Wallet Top-up"
            });

            if (response?.data?.payment_link) {
                setPaymentLink(response.data.payment_link);
                toggleFundModal();
                togglePaymentSuccessModal();
            } else {
                toast.error("Failed to initiate payment");
            }
        } catch (error: any) {
            console.error("Error initiating payment:", error);
            toast.error(error?.response?.data?.message || "An error occurred while initiating payment");
        } finally {
            setFundingLoading(false);
        }
    };

    // Function to view transaction details
    const viewTransactionDetails = async (transaction: any) => {
        setSelectedTransaction(transaction);
        toggleTransactionModal();
    };

    // Generate invoice for a transaction
    const generateInvoice = async (id: number) => {
        try {
            const response = await SmsWalletApis.generateInvoice(id);

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Invoice downloaded successfully");
        } catch (error: any) {
            console.error("Error generating invoice:", error);
            toast.error("Failed to generate invoice");
        }
    };

    // Toggle modals
    const toggleFundModal = () => {
        setFundModalVisible(!fundModalVisible);
        if (!fundModalVisible) {
            setFundAmount("");
        }
    };

    const toggleTransactionModal = () => {
        setTransactionModalVisible(!transactionModalVisible);
    };

    const togglePaymentSuccessModal = () => {
        setPaymentSuccessModalVisible(!paymentSuccessModalVisible);
    };

    // Handle pagination
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount);
    };

    // Transaction type badge
    const getTransactionTypeBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case 'deposit':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Deposit</span>;
            case 'withdrawal':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Withdrawal</span>;
            case 'message_payment':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Message</span>;
            case 'refund':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Refund</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{type}</span>;
        }
    };

    // Transaction status badge
    const getTransactionStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
            case 'pending':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
            case 'failed':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Failed</span>;
            case 'reversed':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Reversed</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <>
            <Sidebar title="SMS Wallet" />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar title="SMS Wallet" />
                <div className="px-4 md:px-10 mx-auto w-full min-h-screen bg-gray-100">
                    <div className="pt-6">
                        {/* Wallet Overview Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Overview</h2>

                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-2 bg-blue-100 rounded-full mr-3">
                                                <FaMoneyBillWave className="text-blue-600 text-lg" />
                                            </div>
                                            <span className="text-sm text-gray-600">Current Balance</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {wallet ? formatCurrency(wallet.balance) : "₦0.00"}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Available for sending messages
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-2 bg-green-100 rounded-full mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Messages Available</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {wallet ? Math.floor(wallet.balance / 4.99) : "0"}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Approx. at ₦5.55/message
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={toggleFundModal}
                                            className="bg-[#0071BC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                                        >
                                            Fund Wallet
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Transaction History */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-wrap items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>

                                <div className="flex space-x-2 mt-2 md:mt-0">
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                        value={typeFilter}
                                        onChange={(e) => {
                                            setTypeFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">All Types</option>
                                        <option value="deposit">Deposit</option>
                                        <option value="message_payment">Message Payment</option>
                                        <option value="withdrawal">Withdrawal</option>
                                        <option value="refund">Refund</option>
                                    </select>

                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                        value={statusFilter}
                                        onChange={(e) => {
                                            setStatusFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-50 border-b">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Reference
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {transactionsLoading ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center">
                                                    <div className="flex justify-center">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                                    </div>
                                                    <p className="text-gray-500 mt-2">Loading transactions...</p>
                                                </td>
                                            </tr>
                                        ) : transactions?.data?.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                    No transactions found. Fund your wallet to get started.
                                                </td>
                                            </tr>
                                        ) : (
                                            transactions?.data?.map((transaction: any) => (
                                                <tr key={transaction.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {transaction.reference.substring(0, 8)}...
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {getTransactionTypeBadge(transaction.type)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(transaction.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {getTransactionStatusBadge(transaction.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(transaction.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => viewTransactionDetails(transaction)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="View Details"
                                                            >
                                                                <FaEye />
                                                            </button>

                                                            {transaction.status === 'completed' && (
                                                                <button
                                                                    onClick={() => generateInvoice(transaction.id)}
                                                                    className="text-green-600 hover:text-green-900"
                                                                    title="Download Invoice"
                                                                >
                                                                    <FaFileInvoice />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {!transactionsLoading && transactions?.data?.length > 0 && (
                                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                                                <span className="font-medium">{totalPages}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={handlePrevPage}
                                                    disabled={currentPage === 1}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fund Wallet Modal */}
            <Modal
                visible={fundModalVisible}
                width="400"
                height="350"
                effect="fadeInUp"
                onClickAway={toggleFundModal}
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Fund SMS Wallet</h2>
                    <form onSubmit={handleFundWallet}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Amount (NGN)
                            </label>
                            <input
                                id="amount"
                                type="number"
                                min="1000"
                                step="100"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Minimum: ₦1,000"
                                value={fundAmount}
                                onChange={(e) => setFundAmount(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Minimum funding amount is ₦1,000
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Payment Method
                            </label>
                            <div className="flex items-center space-x-2 p-3 border rounded">
                                <input
                                    type="radio"
                                    id="flutterwave"
                                    name="paymentMethod"
                                    value="flutterwave"
                                    checked
                                    readOnly
                                />
                                <label htmlFor="flutterwave" className="text-sm">
                                    Flutterwave (Card, Bank Transfer, USSD)
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={toggleFundModal}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                disabled={fundingLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={fundingLoading}
                            >
                                {fundingLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Proceed to Payment"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Payment Success Modal */}
            <Modal
                visible={paymentSuccessModalVisible}
                width="400"
                height="300"
                effect="fadeInUp"
                onClickAway={togglePaymentSuccessModal}
            >
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-center mb-2">Payment Initiated</h2>
                    <p className="text-gray-600 text-center mb-4">
                        You will be redirected to complete your payment.
                    </p>

                    <div className="flex justify-center mt-6">
                        <a
                            href={paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        >
                            <FaExternalLinkAlt className="mr-2" />
                            Proceed to Payment
                        </a>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        Your wallet will be credited once payment is confirmed.
                    </p>
                </div>
            </Modal>

            {/* Transaction Details Modal */}
            <Modal
                visible={transactionModalVisible}
                width="500"
                height="500"
                effect="fadeInUp"
                onClickAway={toggleTransactionModal}
            >
                {selectedTransaction && (
                    <div className="p-6">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Transaction Details</h2>
                            <button
                                onClick={toggleTransactionModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Reference:</span>
                                <span className="text-sm font-medium">{selectedTransaction.reference}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Amount:</span>
                                <span className="text-sm font-bold">{formatCurrency(selectedTransaction.amount)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Type:</span>
                                <span className="text-sm">{getTransactionTypeBadge(selectedTransaction.type)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Status:</span>
                                <span className="text-sm">{getTransactionStatusBadge(selectedTransaction.status)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Date:</span>
                                <span className="text-sm">{formatDate(selectedTransaction.created_at)}</span>
                            </div>
                            {selectedTransaction.payment_method && (
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Payment Method:</span>
                                    <span className="text-sm capitalize">{selectedTransaction.payment_method}</span>
                                </div>
                            )}
                        </div>

                        {selectedTransaction.description && (
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-600">Description:</span>
                                <p className="text-sm mt-1">{selectedTransaction.description}</p>
                            </div>
                        )}

                        {selectedTransaction.payment_details && Object.keys(selectedTransaction.payment_details).length > 0 && (
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-600">Payment Details:</span>
                                <div className="bg-gray-50 p-3 rounded-lg mt-1 text-sm">
                                    {Object.entries(selectedTransaction.payment_details).map(([key, value]: [string, any]) => (
                                        <div key={key} className="flex justify-between items-center mb-1">
                                            <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>
                                            <span className="font-medium">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end mt-6">
                            {selectedTransaction.status === 'completed' && (
                                <button
                                    onClick={() => {
                                        generateInvoice(selectedTransaction.id);
                                        toggleTransactionModal();
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                >
                                    <FaFileInvoice className="mr-2" /> Download Invoice
                                </button>
                            )}
                        </div>

                    </div>
                )}
            </Modal>
        </>
    );
}
