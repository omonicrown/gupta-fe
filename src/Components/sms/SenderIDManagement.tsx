import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { FaTrash, FaUpload, FaCheck, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import AdminNavbar from "../Navbars/AdminNavbar.js";

export default function SenderIDManagement() {
  // State management
  const [senderIDs, setSenderIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSenderID, setNewSenderID] = useState("");
  const [visible, setVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedSenderID, setSelectedSenderID] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  // Enhanced modal states
  const [messageType, setMessageType] = useState(""); // 'transactional' or 'promotional'
  const [purpose, setPurpose] = useState(""); // What they'll be sending
  const [registrationOption, setRegistrationOption] = useState(""); // 'useGupta' or 'customSender'
  const [confirmGupta, setConfirmGupta] = useState(false); // Confirmation for using GUPTA

  // Fetch sender IDs when component mounts
  useEffect(() => {
    fetchSenderIDs();
  }, [currentPage, statusFilter]);

  // Function to fetch sender IDs
  const fetchSenderIDs = async () => {
    setLoading(true);
    try {
      const response = await SmsApis.getSenderIds(perPage, statusFilter);

      if (response?.data) {
        setSenderIDs(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      } else {
        toast.error("Failed to fetch sender IDs");
      }
    } catch (error) {
      console.error("Error fetching sender IDs:", error);
      toast.error("An error occurred while fetching sender IDs");
    } finally {
      setLoading(false);
    }
  };

  // Toggle modal functions
  const toggleCreateModal = () => {
    setVisible(!visible);
    if (!visible) {
      setNewSenderID("");
      setMessageType("");
      setPurpose("");
      setRegistrationOption("");
      setConfirmGupta(false);
    }
  };

  const toggleUploadModal = (senderID: any) => {
    setSelectedSenderID(senderID);
    setUploadVisible(!uploadVisible);
    if (!uploadVisible) {
      setSelectedFile(null);
    }
  };

  const toggleDeleteModal = (senderID: any) => {
    setSelectedSenderID(senderID);
    setDeleteVisible(!deleteVisible);
  };

  // Handler for file input change
  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  // Enhanced create sender ID function
  const createSenderID = async (e: any) => {
    e.preventDefault();

    try {
      // Determine the actual sender ID to use
      let senderIdToSubmit = newSenderID;

      // If transactional and using GUPTA option
      if (messageType === 'transactional' && registrationOption === 'useGupta') {
        senderIdToSubmit = 'gupta';
      }

      // Validate sender ID format for custom/promotional
      if (messageType === 'promotional' || registrationOption === 'customSender') {
        if (!newSenderID || newSenderID.length < 3 || newSenderID.length > 11) {
          toast.error("Sender ID must be 3-11 characters long");
          return;
        }

        // if (!/^[A-Z0-9]+$/.test(newSenderID)) {
        //   toast.error("Sender ID must contain only uppercase letters and numbers");
        //   return;
        // }
      }

      const payload = {
        sender_id: senderIdToSubmit,
        message_type: messageType,
        purpose: purpose,
        registration_option: messageType === 'transactional' ? registrationOption : 'standard',
      };

      const response = await SmsApis.createSenderId(payload);

      if (response?.data) {
        // Different success messages based on type
        if (messageType === 'promotional') {
          toast.success("Promotional Sender ID created successfully! Pending admin approval.");
        } else if (registrationOption === 'useGupta') {
          toast.success("Gupta sender ID request submitted! Please email your CAC certificate to hello@mygupta.co");
        } else {
          toast.success("Custom sender ID request submitted! Please email all required documents to hello@mygupta.co");
        }

        fetchSenderIDs();
        toggleCreateModal();

        // Show email instruction toast
        setTimeout(() => {
          toast.info("📧 Remember to email your documents to hello@mygupta.co with your request details", {
            autoClose: 8000,
          });
        }, 2000);

      } else {
        toast.error("Failed to create sender ID");
      }
    } catch (error: any) {
      console.error("Error creating sender ID:", error);
      toast.error(error?.response?.data?.message || "An error occurred while creating sender ID");
    }
  };

  // Upload verification document
  const uploadDocument = async (e: any) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      const response = await SmsApis.uploadSenderIdDocument(selectedSenderID.id, selectedFile);

      if (response?.data) {
        toast.success("Document uploaded successfully");
        fetchSenderIDs();
        toggleUploadModal(null);
      } else {
        toast.error("Failed to upload document");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("An error occurred while uploading document");
    }
  };

  // Delete sender ID
  const deleteSenderID = async () => {
    try {
      const response = await SmsApis.deleteSenderId(selectedSenderID.id);

      if (response?.data) {
        toast.success("Sender ID deleted successfully");
        fetchSenderIDs();
        toggleDeleteModal(null);
      } else {
        toast.error("Failed to delete sender ID");
      }
    } catch (error) {
      console.error("Error deleting sender ID:", error);
      toast.error("An error occurred while deleting sender ID");
    }
  };

  // Check sender ID status
  const checkStatus = async (id: any) => {
    try {
      const response = await SmsApis.checkSenderIdStatus(id);

      if (response?.data) {
        toast.info(`Status: ${response.data.status}`);
        fetchSenderIDs();
      } else {
        toast.error("Failed to check status");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast.error("An error occurred while checking status");
    }
  };

  // Pagination functions
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

  // Enhanced status badge component
  const StatusBadge = ({ status, messageType }: { status: string, messageType?: string }) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          <FaCheck className="inline mr-1" /> Approved
        </span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <MdPending className="inline mr-1" /> Pending
        </span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          <FaTimesCircle className="inline mr-1" /> Rejected
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  // Message type badge component
  const MessageTypeBadge = ({ type }: { type: string }) => {
    if (type === 'transactional') {
      return <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
        Transactional
      </span>;
    }
    return <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800">
      Promotional
    </span>;
  };

  return (
    <>
      <Sidebar title="Sender IDs" />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title="SenderIDs Management" />
        <div className="px-4 md:px-5 mx-auto w-full min-h-screen bg-gray-100">
          <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-gray-700">Sender IDs</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage your SMS sender identities for different message types
                    </p>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-[#0071BC] text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleCreateModal}
                    >
                      <IoAddCircleOutline className="text-white inline mr-1" size={16} />
                      New Sender ID
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="mx-4 mb-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Quick Start:</strong> Use "gupta" for transactional messages (OTPs, alerts) with just your CAC certificate.
                      For promotional messages or custom sender IDs, additional documentation may be required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex px-4 py-2 border-b">
                <div className="w-1/4">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Sender ID
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Type
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Purpose
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Status
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Created At
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          </div>
                          <p className="text-gray-500 mt-2">Loading sender IDs...</p>
                        </td>
                      </tr>
                    ) : senderIDs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No sender IDs found. Create your first one by clicking the "New Sender ID" button.
                        </td>
                      </tr>
                    ) : (
                      senderIDs.map((senderID: any) => (
                        <tr key={senderID.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-semibold text-left">
                            <div className="flex flex-col">
                              <span className="font-medium">{senderID.sender_id}</span>
                              {senderID.external_id && (
                                <span className="text-gray-400 text-xs">ID: {senderID.external_id}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <MessageTypeBadge type={senderID.message_type || 'promotional'} />
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left max-w-xs">
                            <div className="truncate" title={senderID.purpose}>
                              {senderID.purpose || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <StatusBadge status={senderID.status} messageType={senderID.message_type} />
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            {new Date(senderID.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <div className="flex space-x-2">
                              {senderID.status === 'pending' && (
                                <button
                                  onClick={() => toggleUploadModal(senderID)}
                                  className="text-blue-500 hover:text-blue-700"
                                  title="Upload Verification Document"
                                >
                                  <FaUpload />
                                </button>
                              )}
                              <button
                                onClick={() => checkStatus(senderID.id)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Check Status"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => toggleDeleteModal(senderID)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && senderIDs.length > 0 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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

      {/* Enhanced Create Sender ID Modal */}
      <Modal
        visible={visible}
        width="600"
        height="700"
        effect="fadeInUp"
        onClickAway={toggleCreateModal}
      >
        <div className="p-6 max-h-[650px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Create New Sender ID</h2>

          <form onSubmit={createSenderID}>
            {/* Message Type Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Message Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <input
                    type="radio"
                    id="transactional"
                    name="messageType"
                    value="transactional"
                    checked={messageType === 'transactional'}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1">
                    <label htmlFor="transactional" className="font-medium text-gray-900 cursor-pointer">
                      Transactional Messages
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      OTPs, financial notifications, account alerts. Can bypass DND numbers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <input
                    type="radio"
                    id="promotional"
                    name="messageType"
                    value="promotional"
                    checked={messageType === 'promotional'}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1">
                    <label htmlFor="promotional" className="font-medium text-gray-900 cursor-pointer">
                      Promotional Messages
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Marketing messages, announcements. Cannot contain numbers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose/Use Case */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purpose">
                What will you be sending? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="purpose"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Account verification OTPs, Transaction alerts, Marketing promotions"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe the type of messages you'll be sending using this sender ID.
              </p>
            </div>

            {/* Network Availability */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Network Availability
              </label>
              <div className="bg-blue-50 p-3 rounded-lg">
                {messageType === 'transactional' ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ MTN</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ GLO</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ 9MOBILE</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">⚠ AIRTEL*</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      *AIRTEL requires valid financial operating license (CBN/PENCOM/NAICOM/NLRC)
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ MTN</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ GLO</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ 9MOBILE</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ AIRTEL</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Available on all networks for promotional messages
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Conditional Content Based on Message Type */}
            {messageType === 'transactional' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-3">
                  Registration Option <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <input
                      type="radio"
                      id="useGupta"
                      name="registrationOption"
                      value="useGupta"
                      checked={registrationOption === 'useGupta'}
                      onChange={(e) => setRegistrationOption(e.target.value)}
                      className="mt-1"
                      required
                    />
                    <div className="flex-1">
                      <label htmlFor="useGupta" className="font-medium text-gray-900 cursor-pointer">
                        Use "gupta" (Recommended)
                      </label>
                      <p className="text-xs text-gray-600 mt-1">
                        Only CAC certificate required. Quick approval process.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <input
                      type="radio"
                      id="customSender"
                      name="registrationOption"
                      value="customSender"
                      checked={registrationOption === 'customSender'}
                      onChange={(e) => setRegistrationOption(e.target.value)}
                      className="mt-1"
                      required
                    />
                    <div className="flex-1">
                      <label htmlFor="customSender" className="font-medium text-gray-900 cursor-pointer">
                        Custom Sender ID
                      </label>
                      <p className="text-xs text-gray-600 mt-1">
                        Requires full documentation. Longer approval process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sender ID Input */}
            {(messageType === 'promotional' || registrationOption === 'customSender') && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderID">
                  Sender ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="senderID"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g., COMPANY, BRAND"
                  value={newSenderID}
                  onChange={(e) => setNewSenderID(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  3-11 characters, uppercase, alphanumeric only.
                </p>
              </div>
            )}

            {/* GUPTA Confirmation */}
            {messageType === 'transactional' && registrationOption === 'useGupta' && (
              <div className="mb-4 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="confirmGupta"
                    checked={confirmGupta}
                    onChange={(e) => setConfirmGupta(e.target.checked)}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="confirmGupta" className="text-sm font-medium text-gray-900">
                    I confirm using "gupta" as my sender ID
                  </label>
                </div>
                <p className="text-xs text-gray-600">
                  Your messages will appear from "gupta". Only your CAC certificate is required.
                </p>
              </div>
            )}

            {/* Documentation Requirements */}
            <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Required Documents
              </h4>

              {messageType === 'transactional' ? (
                <div>
                  {registrationOption === 'useGupta' ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        CAC Certificate
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Four signed authorization letters (MTN, GLO, AIRTEL, 9MOBILE)
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        CAC Certificate
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Website URL
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Financial operating license (for AIRTEL network)
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    CAC Certificate (recommended)
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Promotional sender IDs can be created immediately but require admin approval.
                  </p>
                </div>
              )}

              <div className="mt-3 p-3 bg-white rounded border-l-4 border-blue-500">
                <p className="text-sm font-medium text-gray-900">📧 Document Submission</p>
                <p className="text-xs text-gray-600 mt-1">
                  Email all required documents to: <strong>hello@mygupta.co</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Include your sender ID request details in the email.
                </p>
              </div>
            </div>

            {/* Special Notes */}
            {messageType === 'transactional' && (
              <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Important Notes:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• GLO requires company address and phone number in authorization letter</li>
                  <li>• 9MOBILE requires sender ID mentioned in sample message content</li>
                  <li>• AIRTEL prioritizes financial institutions with valid licenses</li>
                  <li>• Transactional messages can bypass DND restrictions</li>
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={toggleCreateModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={messageType === 'transactional' && registrationOption === 'useGupta' && !confirmGupta}
                className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {messageType === 'promotional' ? 'Create Sender ID' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        visible={uploadVisible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => toggleUploadModal(null)}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Verification Document</h2>
          <form onSubmit={uploadDocument}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document">
                Verification Document
              </label>
              <input
                id="document"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a business registration document or company letterhead. PDF, JPG, or PNG formats accepted.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => toggleUploadModal(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteVisible}
        width="400"
        height="250"
        effect="fadeInUp"
        onClickAway={() => toggleDeleteModal(null)}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-6">
            Are you sure you want to delete the sender ID <strong>{selectedSenderID?.sender_id}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => toggleDeleteModal(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteSenderID}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}