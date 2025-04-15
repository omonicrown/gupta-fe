import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { FaTrash, FaEye, FaEyeSlash, FaCopy, FaPowerOff } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import AdminNavbar from "../Navbars/AdminNavbar.js";


export default function ApiKeyManagement() {
  // State management
  const [apiKeys, setApiKeys] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const [expiryDate, setExpiryDate] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<any>(null);
  const [showApiKey, setShowApiKey] = useState<any>({});
  const [successVisible, setSuccessVisible] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

  // Fetch API keys when component mounts
  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Function to fetch API keys
  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const response: any = await SmsApis.getApiKeys();

      if (response?.data) {
        setApiKeys(response.data?.data);
        console?.log(response.data)
        const initialShowState: any = {};
        response.data?.data?.forEach((key: any) => {
          initialShowState[key.id] = false;
        });
        setShowApiKey(initialShowState);
      } else {
        toast.error("Failed to fetch API keys");
      }
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      toast.error("An error occurred while fetching API keys");
    } finally {
      setLoading(false);
    }
  };

  // Toggle visibility of API key
  const toggleKeyVisibility = (id: any) => {
    setShowApiKey((prev: any) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle modal functions
  const toggleCreateModal = () => {
    setVisible(!visible);
    if (!visible) {
      setNewApiKeyName("");
      setExpiryDate('');
    }
  };

  const toggleSuccessModal = () => {
    setSuccessVisible(!successVisible);
  };

  const toggleDeleteModal = (apiKey: any) => {
    setSelectedApiKey(apiKey);
    setDeleteVisible(!deleteVisible);
  };

  // Copy API key to clipboard
  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("API key copied to clipboard");
    }).catch(err => {
      toast.error("Failed to copy API key");
      console.error('Failed to copy: ', err);
    });
  };

  // Format date for display
  const formatDate = (dateString: any) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Create new API key
  const createApiKey = async (e: any) => {
    e.preventDefault();

    try {
      const response = await SmsApis.createApiKey(
        newApiKeyName,
        expiryDate == '' ? '' : expiryDate.toISOString().split('T')[0]
      );

      if (response?.data) {
        setNewApiKey(response?.data?.data?.key);
        toggleCreateModal();
        toggleSuccessModal();
        fetchApiKeys();
      } else {
        toast.error("Failed to create API key");
      }
    } catch (error: any) {
      console.error("Error creating API key:", error);
      toast.error(error?.response?.data?.message || "An error occurred while creating API key");
    }
  };

  // Toggle API key (enable/disable)
  const toggleApiKey = async (id: any) => {
    try {
      const response = await SmsApis.toggleApiKey(id);

      if (response?.data) {
        toast.success("API key status updated successfully");
        fetchApiKeys();
      } else {
        toast.error("Failed to update API key status");
      }
    } catch (error) {
      console.error("Error toggling API key:", error);
      toast.error("An error occurred while updating API key status");
    }
  };

  // Delete API key
  const deleteApiKey = async () => {
    try {
      const response = await SmsApis.deleteApiKey(selectedApiKey.id);

      if (response?.data) {
        toast.success("API key deleted successfully");
        fetchApiKeys();
        toggleDeleteModal(null);
      } else {
        toast.error("Failed to delete API key");
      }
    } catch (error) {
      console.error("Error deleting API key:", error);
      toast.error("An error occurred while deleting API key");
    }
  };

  return (
    <>
      <Sidebar title="API Keys" />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title="API Keys Managements" />
        <div className="px-4 md:px-5 mx-auto w-full min-h-screen bg-gray-100">
          <div className="">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-gray-700">API Keys</h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-[#0071BC] text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleCreateModal}
                    >
                      <IoAddCircleOutline className="text-white inline mr-1" size={16} />
                      New API Key
                    </button>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Name
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        API Key
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Expires
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Status
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          </div>
                          <p className="text-gray-500 mt-2">Loading API keys...</p>
                        </td>
                      </tr>
                    ) : apiKeys?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No API keys found. Create your first one by clicking the "New API Key" button.
                        </td>
                      </tr>
                    ) : (
                      apiKeys?.map((apiKey: any) => (
                        <tr key={apiKey?.id} className="border-b">
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-semibold text-left">
                            {apiKey?.name}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <div className="flex items-center">
                              <span className="font-mono">
                                {showApiKey[apiKey?.id] ? apiKey?.key : apiKey?.key?.substring(0, 8) + '•••••••••••••••••'}
                              </span>
                              <button
                                onClick={() => toggleKeyVisibility(apiKey?.id)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                                title={showApiKey[apiKey.id] ? "Hide API Key" : "Show API Key"}
                              >
                                {showApiKey[apiKey?.id] ? <FaEyeSlash /> : <FaEye />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(apiKey.key)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                                title="Copy to Clipboard"
                              >
                                <FaCopy />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            {formatDate(apiKey?.expires_at)}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${apiKey?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {apiKey.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => toggleApiKey(apiKey?.id)}
                                className={`${apiKey.active ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
                                title={apiKey.active ? 'Disable API Key' : 'Enable API Key'}
                              >
                                <FaPowerOff />
                              </button>
                              <button
                                onClick={() => toggleDeleteModal(apiKey)}
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
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      <Modal
        visible={visible}
        width="400"
        height="350"
        effect="fadeInUp"
        onClickAway={toggleCreateModal}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
          <form onSubmit={createApiKey}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKeyName">
                API Key Name
              </label>
              <input
                id="apiKeyName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Development, Production"
                value={newApiKeyName}
                onChange={(e) => setNewApiKeyName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                Expiry Date
              </label>
              <DatePicker
                id="expiryDate"
                selected={expiryDate}
                onChange={(date: any) => setExpiryDate(date)}
                // minDate={new Date()}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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

      {/* New API Key Success Modal */}
      <Modal
        visible={successVisible}
        width="500"
        height="300"
        effect="fadeInUp"
        onClickAway={toggleSuccessModal}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">API Key Created Successfully</h2>
          <p className="mb-2 text-sm text-gray-600">
            Please copy your API key now. For security reasons, we won't show it again.
          </p>
          <div className="mb-4">
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm break-all">
              {newApiKey}
            </div>
            <button
              onClick={() => copyToClipboard(newApiKey)}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
            >
              <FaCopy className="mr-1" /> Copy to Clipboard
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleSuccessModal}
              className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Done
            </button>
          </div>
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
            Are you sure you want to delete the API key <strong>{selectedApiKey?.name}</strong>? This action cannot be undone.
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
              onClick={deleteApiKey}
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