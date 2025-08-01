import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';
import { FaTrash, FaEye, FaEyeSlash, FaCopy, FaPowerOff, FaCode, FaBook, FaInfoCircle } from "react-icons/fa";
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

  // New state for developer guide modal
  const [developerGuideVisible, setDeveloperGuideVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  // New function for developer guide modal
  const toggleDeveloperGuideModal = () => {
    setDeveloperGuideVisible(!developerGuideVisible);
    if (!developerGuideVisible) {
      setActiveTab("overview");
    }
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

  // Copy code snippet to clipboard
  const copyCodeSnippet = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Code snippet copied to clipboard");
    }).catch(err => {
      toast.error("Failed to copy code snippet");
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

  // Code snippets for different programming languages
  const codeSnippets = {
    php: `<?php
$apiKey = 'YOUR_API_KEY_HERE';
$senderId = 'YOUR_SENDER_ID'; // e.g., SND-688a930f7ed41

$payload = [
    'sender_id' => $senderId,
    'recipients' => ['+2348012345678'],
    'message' => 'Your verification code is: 123456. Valid for 60 seconds.'
];

$response = Http::withHeaders([
    'Accept' => 'application/json',
    'Content-Type' => 'application/json',
    'X-API-Key' => $apiKey
])->post('https://api.nygupya.co/api/sms/send', $payload);

if ($response->successful()) {
    $data = $response->json();
    echo "Message sent successfully: " . $data['message_id'];
} else {
    echo "Error: " . $response->body();
}
?>`,

    javascript: `const apiKey = 'YOUR_API_KEY_HERE';
const senderId = 'YOUR_SENDER_ID'; // e.g., SND-688a930f7ed41

const payload = {
    sender_id: senderId,
    recipients: ['+2348012345678'],
    message: 'Your verification code is: 123456. Valid for 60 seconds.'
};

fetch('https://api.nygupya.co/api/sms/send', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log('Message sent successfully:', data.message_id);
    } else {
        console.error('Error:', data.message);
    }
})
.catch(error => {
    console.error('Network error:', error);
});`,

    python: `import requests
import json

api_key = 'YOUR_API_KEY_HERE'
sender_id = 'YOUR_SENDER_ID'  # e.g., SND-688a930f7ed41

payload = {
    'sender_id': sender_id,
    'recipients': ['+2348012345678'],
    'message': 'Your verification code is: 123456. Valid for 60 seconds.'
}

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': api_key
}

response = requests.post(
    'https://api.nygupya.co/api/sms/send', 
    headers=headers,
    data=json.dumps(payload)
)

if response.status_code == 200:
    data = response.json()
    print(f"Message sent successfully: {data['message_id']}")
else:
    print(f"Error: {response.text}")`,

    curl: `curl -X POST "https://api.nygupya.co/api/sms/send" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: YOUR_API_KEY_HERE" \\
     -d '{
       "sender_id": "YOUR_SENDER_ID",
       "recipients": ["+2348012345678"],
       "message": "Your verification code is: 123456. Valid for 60 seconds."
     }'`
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
                      className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleDeveloperGuideModal}
                    >
                      <FaCode className="text-white inline mr-1" size={16} />
                      Developer Guide
                    </button>
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

              {/* Info Banner */}
              <div className="mx-4 mb-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Quick Start:</strong> Create an API key, get your Sender ID from the Sender IDs page, and start sending SMS messages.
                      <button
                        onClick={toggleDeveloperGuideModal}
                        className="ml-2 underline hover:text-blue-800"
                      >
                        View Developer Guide
                      </button>
                    </p>
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

      {/* Developer Guide Modal */}
      <Modal
        visible={developerGuideVisible}
        width="900"
        height="700"
        effect="fadeInUp"
        onClickAway={toggleDeveloperGuideModal}
      >
        <div className="p-6 max-h-[650px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <FaBook className="mr-3 text-blue-500" />
              Developer Integration Guide
            </h2>
            <button
              onClick={toggleDeveloperGuideModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'php', label: 'PHP' },
                { id: 'javascript', label: 'JavaScript' },
                { id: 'python', label: 'Python' },
                { id: 'curl', label: 'cURL' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Create an API key from the "New API Key" button above</li>
                      <li>Get your Sender ID from the <strong>Sender IDs Management</strong> page</li>
                      <li>Format phone numbers correctly (see Phone Number Format section below)</li>
                      <li>Use the API endpoint to send SMS messages</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">API Endpoint</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <code className="text-sm font-mono">
                      POST https://api.mygupta.co/api/sms/send
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Headers</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Header</th>
                          <th className="text-left py-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">Accept</td>
                          <td className="py-2">application/json</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono">Content-Type</td>
                          <td className="py-2">application/json</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono">X-API-Key</td>
                          <td className="py-2">YOUR_API_KEY_HERE</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Request Body Parameters</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Parameter</th>
                          <th className="text-left py-2">Type</th>
                          <th className="text-left py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">sender_id</td>
                          <td className="py-2">string</td>
                          <td className="py-2">Your approved Sender ID (e.g., SND-67c776468e6a3)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono">recipients</td>
                          <td className="py-2">array</td>
                          <td className="py-2">Array of phone numbers (see formatting below)</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono">message</td>
                          <td className="py-2">string</td>
                          <td className="py-2">The SMS message content</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Phone Number Format Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Phone Number Format</h3>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                    <div className="mb-3">
                      <h4 className="font-medium text-orange-800 mb-2">Required Format:</h4>
                      <p className="text-sm text-orange-700">
                        Phone numbers must be in Nigerian format without the "+" prefix (e.g., <code className="bg-orange-100 px-1 rounded">2348012345678</code>)
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-orange-800">Valid Examples:</h5>
                          <ul className="text-orange-700 space-y-1 mt-1">
                            <li>• <code className="bg-orange-100 px-1 rounded">2348012345678</code> ✓</li>
                            <li>• <code className="bg-orange-100 px-1 rounded">2347012345678</code> ✓</li>
                            <li>• <code className="bg-orange-100 px-1 rounded">2349012345678</code> ✓</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-800">Input Formats Accepted:</h5>
                          <ul className="text-orange-700 space-y-1 mt-1">
                            <li>• <code className="bg-orange-100 px-1 rounded">08012345678</code> → <code>2348012345678</code></li>
                            <li>• <code className="bg-orange-100 px-1 rounded">8012345678</code> → <code>2348012345678</code></li>
                            <li>• <code className="bg-orange-100 px-1 rounded">+2348012345678</code> → <code>2348012345678</code></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Response Format</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm font-mono">{`{
  "status": "success",
  "message": "SMS sent successfully",
  "message_id": "msg_12345678",
  "data": {
    "sent_count": 1,
    "failed_count": 0
  }
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'php' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">PHP Example</h3>
                  <button
                    onClick={() => copyCodeSnippet(`<?php
// Phone number formatting function
private function formatPhoneNumber($phoneNumber)
{
    // Strip any non-numeric characters
    $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);
    
    // If doesn't start with country code, add Nigeria's country code (234)
    if (substr($phoneNumber, 0, 3) !== '234' && substr($phoneNumber, 0, 1) === '0') {
        $phoneNumber = '234' . substr($phoneNumber, 1);
    } elseif (substr($phoneNumber, 0, 1) !== '+' && substr($phoneNumber, 0, 3) !== '234') {
        $phoneNumber = '234' . $phoneNumber;
    }
    
    return $phoneNumber;
}

// Usage example
$apiKey = 'YOUR_API_KEY_HERE';
$senderId = 'YOUR_SENDER_ID'; // e.g., SND-67c776468e6a3
$phoneNumber = '08012345678'; // or any format
$otp = '123456';

$formattedPhone = $this->formatPhoneNumber($phoneNumber);

$payload = [
    'sender_id' => $senderId,
    'recipients' => [$formattedPhone],
    'message' => "Your verification code is: $otp. Valid for 60 seconds.",
];

$response = Http::withHeaders([
    'Accept' => 'application/json',
    'Content-Type' => 'application/json',
    'X-API-Key' => $apiKey
])->post('https://api.mygupta.co/api/sms/send', $payload);

if ($response->successful() && $response->json('status') == 'success') {
    $data = $response->json();
    echo "Message sent successfully: " . $data['message_id'];
} else {
    echo "Error: " . $response->body();
}
?>`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                  >
                    <FaCopy className="mr-1" size={12} />
                    Copy Code
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{`<?php
// Phone number formatting function
private function formatPhoneNumber($phoneNumber)
{
    // Strip any non-numeric characters
    $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);
    
    // If doesn't start with country code, add Nigeria's country code (234)
    if (substr($phoneNumber, 0, 3) !== '234' && substr($phoneNumber, 0, 1) === '0') {
        $phoneNumber = '234' . substr($phoneNumber, 1);
    } elseif (substr($phoneNumber, 0, 1) !== '+' && substr($phoneNumber, 0, 3) !== '234') {
        $phoneNumber = '234' . $phoneNumber;
    }
    
    return $phoneNumber;
}

// Usage example
$apiKey = 'YOUR_API_KEY_HERE';
$senderId = 'YOUR_SENDER_ID'; // e.g., SND-67c776468e6a3
$phoneNumber = '08012345678'; // or any format
$otp = '123456';

$formattedPhone = $this->formatPhoneNumber($phoneNumber);

$payload = [
    'sender_id' => $senderId,
    'recipients' => [$formattedPhone],
    'message' => "Your verification code is: $otp. Valid for 60 seconds.",
];

$response = Http::withHeaders([
    'Accept' => 'application/json',
    'Content-Type' => 'application/json',
    'X-API-Key' => $apiKey
])->post('https://api.mygupta.co/api/sms/send', $payload);

if ($response->successful() && $response->json('status') == 'success') {
    $data = $response->json();
    echo "Message sent successfully: " . $data['message_id'];
} else {
    echo "Error: " . $response->body();
}
?>`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Replace <code>YOUR_API_KEY_HERE</code> with your actual API key and <code>YOUR_SENDER_ID</code> with your approved Sender ID from the Sender IDs page.
                        Phone numbers are automatically formatted to Nigerian format (234xxxxxxxxx) by the formatPhoneNumber function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'javascript' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">JavaScript Example</h3>
                  <button
                    onClick={() => copyCodeSnippet(`// Phone number formatting function
function formatPhoneNumber(phoneNumber) {
    // Strip any non-numeric characters
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    // If doesn't start with country code, add Nigeria's country code (234)
    if (!phoneNumber.startsWith('234') && phoneNumber.startsWith('0')) {
        phoneNumber = '234' + phoneNumber.substring(1);
    } else if (!phoneNumber.startsWith('234')) {
        phoneNumber = '234' + phoneNumber;
    }
    
    return phoneNumber;
}

// Usage example
const apiKey = 'YOUR_API_KEY_HERE';
const senderId = 'YOUR_SENDER_ID'; // e.g., SND-67c776468e6a3
const phoneNumber = '08012345678'; // or any format
const otp = '123456';

const formattedPhone = formatPhoneNumber(phoneNumber);

const payload = {
    sender_id: senderId,
    recipients: [formattedPhone],
    message: \`Your verification code is: \${otp}. Valid for 60 seconds.\`
};

fetch('https://api.mygupta.co/api/sms/send', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        console.log('Message sent successfully:', data.message_id);
    } else {
        console.error('Error:', data.message);
    }
})
.catch(error => {
    console.error('Network error:', error);
});`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                  >
                    <FaCopy className="mr-1" size={12} />
                    Copy Code
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{`// Phone number formatting function
function formatPhoneNumber(phoneNumber) {
    // Strip any non-numeric characters
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    // If doesn't start with country code, add Nigeria's country code (234)
    if (!phoneNumber.startsWith('234') && phoneNumber.startsWith('0')) {
        phoneNumber = '234' + phoneNumber.substring(1);
    } else if (!phoneNumber.startsWith('234')) {
        phoneNumber = '234' + phoneNumber;
    }
    
    return phoneNumber;
}

// Usage example
const apiKey = 'YOUR_API_KEY_HERE';
const senderId = 'YOUR_SENDER_ID'; // e.g., SND-67c776468e6a3
const phoneNumber = '08012345678'; // or any format
const otp = '123456';

const formattedPhone = formatPhoneNumber(phoneNumber);

const payload = {
    sender_id: senderId,
    recipients: [formattedPhone],
    message: \`Your verification code is: \${otp}. Valid for 60 seconds.\`
};

fetch('https://api.mygupta.co/api/sms/send', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        console.log('Message sent successfully:', data.message_id);
    } else {
        console.error('Error:', data.message);
    }
})
.catch(error => {
    console.error('Network error:', error);
});`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Replace <code>YOUR_API_KEY_HERE</code> with your actual API key and <code>YOUR_SENDER_ID</code> with your approved Sender ID from the Sender IDs page.
                        Phone numbers are automatically formatted to Nigerian format (234xxxxxxxxx) by the formatPhoneNumber function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'python' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Python Example</h3>
                  <button
                    onClick={() => copyCodeSnippet(`import requests
import json
import re

def format_phone_number(phone_number):
    """Format phone number to Nigerian format (234xxxxxxxxx)"""
    # Strip any non-numeric characters
    phone_number = re.sub(r'[^0-9]', '', phone_number)
    
    # If doesn't start with country code, add Nigeria's country code (234)
    if not phone_number.startswith('234') and phone_number.startswith('0'):
        phone_number = '234' + phone_number[1:]
    elif not phone_number.startswith('234'):
        phone_number = '234' + phone_number
    
    return phone_number

# Usage example
api_key = 'YOUR_API_KEY_HERE'
sender_id = 'YOUR_SENDER_ID'  # e.g., SND-67c776468e6a3
phone_number = '08012345678'  # or any format
otp = '123456'

formatted_phone = format_phone_number(phone_number)

payload = {
    'sender_id': sender_id,
    'recipients': [formatted_phone],
    'message': f'Your verification code is: {otp}. Valid for 60 seconds.'
}

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': api_key
}

response = requests.post(
    'https://api.mygupta.co/api/sms/send', 
    headers=headers,
    data=json.dumps(payload)
)

if response.status_code == 200:
    data = response.json()
    if data.get('status') == 'success':
        print(f"Message sent successfully: {data.get('message_id')}")
    else:
        print(f"Error: {data.get('message')}")
else:
    print(f"HTTP Error: {response.text}")`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                  >
                    <FaCopy className="mr-1" size={12} />
                    Copy Code
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{`import requests
import json
import re

def format_phone_number(phone_number):
    """Format phone number to Nigerian format (234xxxxxxxxx)"""
    # Strip any non-numeric characters
    phone_number = re.sub(r'[^0-9]', '', phone_number)
    
    # If doesn't start with country code, add Nigeria's country code (234)
    if not phone_number.startswith('234') and phone_number.startswith('0'):
        phone_number = '234' + phone_number[1:]
    elif not phone_number.startswith('234'):
        phone_number = '234' + phone_number
    
    return phone_number

# Usage example
api_key = 'YOUR_API_KEY_HERE'
sender_id = 'YOUR_SENDER_ID'  # e.g., SND-67c776468e6a3
phone_number = '08012345678'  # or any format
otp = '123456'

formatted_phone = format_phone_number(phone_number)

payload = {
    'sender_id': sender_id,
    'recipients': [formatted_phone],
    'message': f'Your verification code is: {otp}. Valid for 60 seconds.'
}

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': api_key
}

response = requests.post(
    'https://api.mygupta.co/api/sms/send', 
    headers=headers,
    data=json.dumps(payload)
)

if response.status_code == 200:
    data = response.json()
    if data.get('status') == 'success':
        print(f"Message sent successfully: {data.get('message_id')}")
    else:
        print(f"Error: {data.get('message')}")
else:
    print(f"HTTP Error: {response.text}")`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Replace <code>YOUR_API_KEY_HERE</code> with your actual API key and <code>YOUR_SENDER_ID</code> with your approved Sender ID from the Sender IDs page.
                        Phone numbers are automatically formatted to Nigerian format (234xxxxxxxxx) by the format_phone_number function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curl' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">cURL Example</h3>
                  <button
                    onClick={() => copyCodeSnippet(`curl -X POST "https://api.mygupta.co/api/sms/send" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: YOUR_API_KEY_HERE" \\
     -d '{
       "sender_id": "YOUR_SENDER_ID",
       "recipients": ["2348012345678"],
       "message": "Your verification code is: 123456. Valid for 60 seconds."
     }'

# Note: Phone number must be formatted as 234xxxxxxxxx
# Examples of accepted input formats:
# 08012345678 -> 2348012345678
# 8012345678 -> 2348012345678  
# +2348012345678 -> 2348012345678`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                  >
                    <FaCopy className="mr-1" size={12} />
                    Copy Code
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{`curl -X POST "https://api.mygupta.co/api/sms/send" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: YOUR_API_KEY_HERE" \\
     -d '{
       "sender_id": "YOUR_SENDER_ID",
       "recipients": ["2348012345678"],
       "message": "Your verification code is: 123456. Valid for 60 seconds."
     }'

# Note: Phone number must be formatted as 234xxxxxxxxx
# Examples of accepted input formats:
# 08012345678 -> 2348012345678
# 8012345678 -> 2348012345678  
# +2348012345678 -> 2348012345678`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Replace <code>YOUR_API_KEY_HERE</code> with your actual API key and <code>YOUR_SENDER_ID</code> with your approved Sender ID from the Sender IDs page.
                        Phone numbers must be in Nigerian format (234xxxxxxxxx) - see examples above for accepted input formats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Need help? Contact support at <strong>hello@mygupta.co</strong>
              </div>
              <button
                onClick={toggleDeveloperGuideModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>



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