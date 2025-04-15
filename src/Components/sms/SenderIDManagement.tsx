import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { FaTrash, FaUpload, FaCheck, FaTimesCircle } from "react-icons/fa";
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
    }
  };

  const toggleUploadModal = (senderID:any) => {
    setSelectedSenderID(senderID);
    setUploadVisible(!uploadVisible);
    if (!uploadVisible) {
      setSelectedFile(null);
    }
  };

  const toggleDeleteModal = (senderID:any) => {
    setSelectedSenderID(senderID);
    setDeleteVisible(!deleteVisible);
  };

  // Handler for file input change
  const handleFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  // Create new sender ID
  const createSenderID = async (e:any) => {
    e.preventDefault();
    
    try {
      const response = await SmsApis.createSenderId({
        sender_id: newSenderID
      });
      
      if (response?.data) {
        toast.success("Sender ID created successfully");
        fetchSenderIDs();
        toggleCreateModal();
      } else {
        toast.error("Failed to create sender ID");
      }
    } catch (error:any) {
      console.error("Error creating sender ID:", error);
      toast.error(error?.response?.data?.message || "An error occurred while creating sender ID");
    }
  };

  // Upload verification document
  const uploadDocument = async (e:any) => {
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
  const checkStatus = async (id:any) => {
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

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
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

  return (
    <>
      <Sidebar title="Sender IDs" />
      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar title="SenderIDs Management"/>
        <div className="px-4 md:px-5 mx-auto w-full min-h-screen bg-gray-100">
          <div >
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-gray-700">Sender IDs</h3>
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
                       Key
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
                        <td colSpan={4} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          </div>
                          <p className="text-gray-500 mt-2">Loading sender IDs...</p>
                        </td>
                      </tr>
                    ) : senderIDs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No sender IDs found. Create your first one by clicking the "New Sender ID" button.
                        </td>
                      </tr>
                    ) : (
                      senderIDs.map((senderID:any) => (
                        <tr key={senderID.id} className="border-b">
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-semibold text-left">
                            {senderID.sender_id}
                          </td>

                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-semibold text-left">
                            {senderID.external_id}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <StatusBadge status={senderID.status} />
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
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
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
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
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

      {/* Create Sender ID Modal */}
      <Modal
        visible={visible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={toggleCreateModal}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Sender ID</h2>
          <form onSubmit={createSenderID}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderID">
                Sender ID
              </label>
              <input
                id="senderID"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., COMPANY"
                value={newSenderID}
                onChange={(e) => setNewSenderID(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Sender ID should be 3-11 characters long, uppercase, alphanumeric.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={toggleCreateModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
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