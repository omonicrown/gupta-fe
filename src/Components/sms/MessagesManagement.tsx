import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import Modal from 'react-awesome-modal';

import {
  FaTrash,
  FaPaperPlane,
  FaEye,
  FaClock,
  FaCalendarAlt,
  FaBan,
  FaUserFriends,
  FaUsers
} from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import AdminNavbar from "../Navbars/AdminNavbar.js";

// Define TypeScript interfaces for our data
interface Message {
  id: number;
  sender_id: string | number;
  content: string;
  message_type: string;
  status: string;
  scheduled_at: string | null;
  created_at: string;
  sent_at: string | null;
  total_recipients: number;
  successful_sends: number;
  failed_sends: number;
  cost: string;
  campaign_id: number | null;
  message_template_id: number | null;
  delivery_status: string;
  delivery_status_time: string | null;
  sender: {
    id: number;
    sender_id: string;
    status: string;
  };
  campaign: any;
}

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
}

interface Group {
  id: number;
  name: string;
  description: string | null;
  contact_count: number;
}

interface SenderID {
  id: number;
  sender_id: string;
  status: string;
}

interface MessageTemplate {
  id: number;
  name: string;
  content: string;
  message_type: string;
  variables: string[];
}

export default function MessagesManagement() {
  const navigate = useNavigate();

  // State for messages list and pagination
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [fromItem, setFromItem] = useState(0);
  const [toItem, setToItem] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");

  // State for message creation
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<number | string>("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("sms");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);

  // State for scheduling modal
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(new Date());
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

  // State for message details modal
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null | any>(null);

  // State for delete confirmation modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Reference data
  const [senderIDs, setSenderIDs] = useState<SenderID[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loadingReferences, setLoadingReferences] = useState(true);

  // Modal for contact selection
  const [contactSelectionModalVisible, setContactSelectionModalVisible] = useState(false);
  const [contactSearchQuery, setContactSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  // Modal for group selection
  const [groupSelectionModalVisible, setGroupSelectionModalVisible] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  // Fetch messages when component mounts or filters change
  useEffect(() => {
    fetchMessages();
  }, [currentPage, statusFilter, searchQuery, campaignFilter]);

  // Fetch reference data when component mounts
  useEffect(() => {
    fetchReferenceData();
  }, []);

  // Filter contacts when search query changes
  useEffect(() => {
    if (contacts.length > 0) {
      const filtered = contacts.filter(contact =>
        `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
        contact.phone.includes(contactSearchQuery)
      );
      setFilteredContacts(filtered);
    }
  }, [contactSearchQuery, contacts]);

  // Filter groups when search query changes
  useEffect(() => {
    if (groups.length > 0) {
      const filtered = groups.filter(group =>
        group.name.toLowerCase().includes(groupSearchQuery.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  }, [groupSearchQuery, groups]);

  // Function to fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await SmsApis.getMessages(
        perPage,
        statusFilter,
        searchQuery,
        campaignFilter,
        currentPage
      );

      if (response?.data) {
        setMessages(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
        setTotalItems(response.data.total);
        setFromItem(response.data.from || 0);
        setToItem(response.data.to || 0);
      } else {
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("An error occurred while fetching messages");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch reference data (sender IDs, contacts, groups, templates)
  const fetchReferenceData = async () => {
    setLoadingReferences(true);
    try {
      // Fetch sender IDs
      const senderIDsResponse = await SmsApis.getSenderIds(100, "approved");
      if (senderIDsResponse?.data) {
        setSenderIDs(senderIDsResponse.data.data);
      }

      // Fetch contacts
      const contactsResponse = await SmsApis.getContacts(100);
      if (contactsResponse?.data) {
        setContacts(contactsResponse.data.data);
        setFilteredContacts(contactsResponse.data.data);
      }

      // Fetch groups
      const groupsResponse = await SmsApis.getGroups(100);
      if (groupsResponse?.data) {
        setGroups(groupsResponse.data.data);
        setFilteredGroups(groupsResponse.data.data);
      }

      // Fetch templates
      const templatesResponse = await SmsApis.getTemplates(100);
      if (templatesResponse?.data) {
        setTemplates(templatesResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching reference data:", error);
      toast.error("An error occurred while fetching reference data");
    } finally {
      setLoadingReferences(false);
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

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

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Toggle modals
  const toggleCreateModal = () => {
    setCreateModalVisible(!createModalVisible);
    if (!createModalVisible) {
      resetCreateForm();
    }
  };

  const toggleScheduleModal = (messageId: number | null = null) => {
    setSelectedMessageId(messageId);
    setScheduleModalVisible(!scheduleModalVisible);
    if (!scheduleModalVisible) {
      setScheduledTime(new Date());
    }
  };

  const toggleDetailsModal = (message: Message | null = null) => {
    setSelectedMessage(message);
    setDetailsModalVisible(!detailsModalVisible);
  };

  const toggleDeleteModal = (message: Message | null = null) => {
    setSelectedMessage(message);
    setDeleteModalVisible(!deleteModalVisible);
  };

  const toggleContactSelectionModal = () => {
    setContactSelectionModalVisible(!contactSelectionModalVisible);
    if (!contactSelectionModalVisible) {
      setContactSearchQuery("");
    }
  };

  const toggleGroupSelectionModal = () => {
    setGroupSelectionModalVisible(!groupSelectionModalVisible);
    if (!groupSelectionModalVisible) {
      setGroupSearchQuery("");
    }
  };

  // Helper function to reset create form
  const resetCreateForm = () => {
    setSelectedSenderId("");
    setMessageContent("");
    setMessageType("sms");
    setSelectedContacts([]);
    setSelectedGroups([]);
    setSelectedTemplateId(null);
    setSelectedCampaignId(null);
    setScheduledAt(null);
  };

  // Handle form submission for creating a new message
  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedContacts.length === 0 && selectedGroups.length === 0) {
      toast.error("Please select at least one contact or group");
      return;
    }

    if (!selectedSenderId) {
      toast.error("Please select a sender ID");
      return;
    }

    if (!messageContent) {
      toast.error("Please enter message content");
      return;
    }

    try {
      const messageData = {
        sender_id: selectedSenderId,
        content: messageContent,
        message_type: messageType,
        contacts: selectedContacts,
        groups: selectedGroups,
        message_template_id: selectedTemplateId,
        campaign_id: selectedCampaignId,
        scheduled_at: scheduledAt ? scheduledAt.toISOString() : null
      };

      const response = await SmsApis.createMessage(messageData);

      if (response?.data) {
        toast.success("Message created successfully");
        fetchMessages();
        toggleCreateModal();
      } else {
        toast.error("Failed to create message");
      }
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("An error occurred while creating message");
    }
  };

  // Handle scheduling a message
  const handleScheduleMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduledTime) {
      toast.error("Please select a scheduled time");
      return;
    }

    try {
      const response = await SmsApis.scheduleMessage(
        selectedMessageId!,
        scheduledTime.toISOString()
      );

      if (response?.data) {
        toast.success("Message scheduled successfully");
        fetchMessages();
        toggleScheduleModal();
      } else {
        toast.error("Failed to schedule message");
      }
    } catch (error) {
      console.error("Error scheduling message:", error);
      toast.error("An error occurred while scheduling message");
    }
  };

  // Handle sending a message
  const handleSendMessage = async (messageId: number) => {
    try {
      const response = await SmsApis.sendMessage(messageId);

      if (response?.data) {
        toast.success("Message sent successfully");
        fetchMessages();
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending message");
    }
  };

  // Handle canceling a scheduled message
  const handleCancelScheduledMessage = async (messageId: number) => {
    try {
      const response = await SmsApis.cancelScheduledMessage(messageId);

      if (response?.data) {
        toast.success("Scheduled message canceled successfully");
        fetchMessages();
      } else {
        toast.error("Failed to cancel scheduled message");
      }
    } catch (error) {
      console.error("Error canceling scheduled message:", error);
      toast.error("An error occurred while canceling scheduled message");
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async () => {
    try {
      const response = await SmsApis.deleteMessage(selectedMessage!.id);

      if (response?.data) {
        toast.success("Message deleted successfully");
        fetchMessages();
        toggleDeleteModal();
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred while deleting message");
    }
  };

  // Handlers for contact selection
  const handleContactSelect = (contactId: number) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  // Handlers for group selection
  const handleGroupSelect = (groupId: number) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: number | null) => {
    setSelectedTemplateId(templateId);
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setMessageContent(template.content);
        setMessageType(template.message_type);
      }
    }
  };

  // Handle filter changes (reset to page 1)
  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    setCurrentPage(1);
  };

  const handleCampaignFilterChange = (newCampaign: string) => {
    setCampaignFilter(newCampaign);
    setCurrentPage(1);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800">
          {'Sent'}
        </span>;
      case 'delivered':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
          {status === 'delivered' ? 'Delivered' : 'Sent'}
        </span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          Draft
        </span>;
      case 'scheduled':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          Scheduled
        </span>;
      case 'sending':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Sending
        </span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Failed
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  return (
    <>
      <Sidebar title="Messages" />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title="" />
        <div className="px-4 md:px-10 mx-auto w-full min-h-screen bg-gray-100">
          <div className="pt-2">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-gray-700">Messages</h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-[#0071BC] text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleCreateModal}
                    >
                      <IoAddCircleOutline className="text-white inline mr-1" size={16} />
                      New Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap px-4 py-2 border-b">
                <div className="w-full md:w-1/4 px-2 mb-2 md:mb-0">
                  <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="statusFilter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={statusFilter}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="sending">Sending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="w-full md:w-1/4 px-2 mb-2 md:mb-0">
                  <label htmlFor="campaignFilter" className="block text-xs font-medium text-gray-700 mb-1">
                    Campaign
                  </label>
                  <select
                    id="campaignFilter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={campaignFilter}
                    onChange={(e) => handleCampaignFilterChange(e.target.value)}
                  >
                    <option value="">All Campaigns</option>
                    {/* Add campaign options here */}
                  </select>
                </div>

                <div className="w-full md:w-2/4 px-2">
                  <label htmlFor="searchQuery" className="block text-xs font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="searchQuery"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Content
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Sender ID
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Recipients
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Cost
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Status
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Created
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          </div>
                          <p className="text-gray-500 mt-2">Loading messages...</p>
                        </td>
                      </tr>
                    ) : messages.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          No messages found. Create your first one by clicking the "New Message" button.
                        </td>
                      </tr>
                    ) : (
                      messages.map((message: any) => (
                        <tr key={message.id} className="border-b">
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-normal text-left">
                            <div className="max-w-xs truncate">{message.content}</div>
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-normal text-left">
                            {message.sender.sender_id}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-normal text-left">
                            {message.total_recipients}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-normal text-left">
                            ₦{message.cost}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <StatusBadge status={message.status} />
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap font-normal text-left">
                            {new Date(message.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 align-middle py-3 text-xs whitespace-nowrap text-left">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => toggleDetailsModal(message)}
                                className="text-blue-500 hover:text-blue-700"
                                title="View Details"
                              >
                                <FaEye />
                              </button>

                              {message.status === 'draft' && (
                                <>
                                  <button
                                    onClick={() => handleSendMessage(message.id)}
                                    className="text-green-500 hover:text-green-700"
                                    title="Send Now"
                                  >
                                    <FaPaperPlane />
                                  </button>
                                  <button
                                    onClick={() => toggleScheduleModal(message.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Schedule"
                                  >
                                    <FaCalendarAlt />
                                  </button>
                                </>
                              )}

                              {message.status === 'scheduled' && (
                                <button
                                  onClick={() => handleCancelScheduledMessage(message.id)}
                                  className="text-yellow-500 hover:text-yellow-700"
                                  title="Cancel Schedule"
                                >
                                  <FaBan />
                                </button>
                              )}

                              {['draft', 'scheduled'].includes(message.status) && (
                                <button
                                  onClick={() => toggleDeleteModal(message)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete"
                                >
                                  <FaTrash />
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

              {/* Numbered Pagination - Continuation */}
              {!loading && messages.length > 0 && (
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
                        Showing <span className="font-medium">{fromItem}</span> to{' '}
                        <span className="font-medium">{toItem}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                      </p>
                    </div>

                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {/* Previous Button */}
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'
                            }`}
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>

                        {/* First Page */}
                        {generatePageNumbers()[0] > 1 && (
                          <>
                            <button
                              onClick={() => handlePageChange(1)}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              1
                            </button>
                            {generatePageNumbers()[0] > 2 && (
                              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                              </span>
                            )}
                          </>
                        )}

                        {/* Page Numbers */}
                        {generatePageNumbers().map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                              ? 'z-10 bg-[#0071BC] border-[#0071BC] text-white'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {page}
                          </button>
                        ))}

                        {/* Last Page */}
                        {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages && (
                          <>
                            {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages - 1 && (
                              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => handlePageChange(totalPages)}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              {totalPages}
                            </button>
                          </>
                        )}

                        {/* Next Button */}
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'
                            }`}
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
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

      {/* Create Message Modal */}
      <Modal
        visible={createModalVisible}
        width="600"
        height="600"
        effect="fadeInUp"
        onClickAway={toggleCreateModal}
      >
        <div className="p-6 max-h-full overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Create New Message</h2>
          <form onSubmit={handleCreateMessage}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderID">
                Sender ID
              </label>
              <select
                id="senderID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedSenderId}
                onChange={(e) => setSelectedSenderId(e.target.value)}
                required
              >
                <option value="">Select Sender ID</option>
                {senderIDs.map((sender) => (
                  <option key={sender.id} value={sender.id}>
                    {sender.sender_id}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="messageContent">
                Message Content
              </label>
              <textarea
                id="messageContent"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your message..."
                rows={4}
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {messageContent.length} characters
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="messageType"
                    value="sms"
                    checked={messageType === "sms"}
                    onChange={() => setMessageType("sms")}
                  />
                  <span className="ml-2">SMS</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="messageType"
                    value="voice"
                    checked={messageType === "voice"}
                    onChange={() => setMessageType("voice")}
                  />
                  <span className="ml-2">Voice</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Recipients
              </label>
              <div className="space-y-2">
                <div>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={toggleContactSelectionModal}
                  >
                    <FaUserFriends className="mr-1" />
                    Select Contacts ({selectedContacts.length} selected)
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={toggleGroupSelectionModal}
                  >
                    <FaUsers className="mr-1" />
                    Select Groups ({selectedGroups.length} selected)
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="template">
                Message Template (Optional)
              </label>
              <select
                id="template"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedTemplateId || ""}
                onChange={(e) => handleTemplateSelect(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">No Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduledAt">
                Schedule (Optional)
              </label>
              <DatePicker
                id="scheduledAt"
                selected={scheduledAt}
                onChange={(date: any) => setScheduledAt(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholderText="Click to select date and time"
                minDate={new Date()}
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

      {/* Schedule Message Modal */}
      <Modal
        visible={scheduleModalVisible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => toggleScheduleModal()}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule Message</h2>
          <form onSubmit={handleScheduleMessage}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduledTime">
                Scheduled Time
              </label>
              <DatePicker
                id="scheduledTime"
                selected={scheduledTime}
                onChange={(date: any) => setScheduledTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholderText="Click to select date and time"
                minDate={new Date()}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => toggleScheduleModal()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Message Details Modal */}
      <Modal
        visible={detailsModalVisible}
        width="600"
        height="500"
        effect="fadeInUp"
        onClickAway={() => toggleDetailsModal()}
      >
        {selectedMessage && (
          <div className="p-6 max-h-full overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Message Details</h2>
              <button
                onClick={() => toggleDetailsModal()}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Status</h3>
              <StatusBadge status={selectedMessage.status} />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Sender ID</h3>
              <p className="text-sm">{selectedMessage.sender.sender_id}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Message Content</h3>
              <p className="text-sm bg-gray-50 p-3 rounded">{selectedMessage.content}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Type</h3>
              <p className="text-sm capitalize">{selectedMessage.message_type}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Recipients</h3>
              <p className="text-sm">{selectedMessage.total_recipients} recipient(s)</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Cost</h3>
              <p className="text-sm">₦{selectedMessage.cost}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Delivery Status</h3>
              <p className="text-sm">{selectedMessage.delivery_status || 'Pending'}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700">Created</h3>
              <p className="text-sm">{new Date(selectedMessage.created_at).toLocaleString()}</p>
            </div>

            {selectedMessage.scheduled_at && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-700">Scheduled For</h3>
                <p className="text-sm">{new Date(selectedMessage.scheduled_at).toLocaleString()}</p>
              </div>
            )}

            {selectedMessage.sent_at && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-700">Sent</h3>
                <p className="text-sm">{new Date(selectedMessage.sent_at).toLocaleString()}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              {selectedMessage.status === 'draft' && (
                <>
                  <button
                    onClick={() => {
                      handleSendMessage(selectedMessage.id);
                      toggleDetailsModal();
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex items-center"
                  >
                    <FaPaperPlane className="mr-1" /> Send Now
                  </button>
                  <button
                    onClick={() => {
                      toggleDetailsModal();
                      toggleScheduleModal(selectedMessage.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex items-center"
                  >
                    <FaCalendarAlt className="mr-1" /> Schedule
                  </button>
                </>
              )}

              {selectedMessage.status === 'scheduled' && (
                <button
                  onClick={() => {
                    handleCancelScheduledMessage(selectedMessage.id);
                    toggleDetailsModal();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex items-center"
                >
                  <FaBan className="mr-1" /> Cancel Schedule
                </button>
              )}

              {['draft', 'scheduled'].includes(selectedMessage.status) && (
                <button
                  onClick={() => {
                    toggleDetailsModal();
                    toggleDeleteModal(selectedMessage);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        width="400"
        height="250"
        effect="fadeInUp"
        onClickAway={() => toggleDeleteModal()}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-6">
            Are you sure you want to delete this message? This action cannot be undone.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => toggleDeleteModal()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteMessage}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Contact Selection Modal */}
      <Modal
        visible={contactSelectionModalVisible}
        width="600"
        height="500"
        effect="fadeInUp"
        onClickAway={toggleContactSelectionModal}
      >
        <div className="p-6 max-h-full overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Select Contacts</h2>
            <button
              onClick={toggleContactSelectionModal}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search contacts..."
              value={contactSearchQuery}
              onChange={(e) => setContactSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-4 max-h-72 overflow-y-auto">
            {loadingReferences ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No contacts found</p>
            ) : (
              <div className="divide-y">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="py-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleContactSelect(contact.id)}
                      />
                      <span className="ml-2 text-sm">
                        {contact.first_name} {contact.last_name} ({contact.phone})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={toggleContactSelectionModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={toggleContactSelectionModal}
              className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Done ({selectedContacts.length} selected)
            </button>
          </div>
        </div>
      </Modal>

      {/* Group Selection Modal */}
      <Modal
        visible={groupSelectionModalVisible}
        width="600"
        height="500"
        effect="fadeInUp"
        onClickAway={toggleGroupSelectionModal}
      >
        <div className="p-6 max-h-full overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Select Groups</h2>
            <button
              onClick={toggleGroupSelectionModal}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search groups..."
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-4 max-h-72 overflow-y-auto">
            {loadingReferences ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredGroups.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No groups found</p>
            ) : (
              <div className="divide-y">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="py-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => handleGroupSelect(group.id)}
                      />
                      <span className="ml-2 text-sm">
                        {group.name} ({group.contact_count} contacts)
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={toggleGroupSelectionModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={toggleGroupSelectionModal}
              className="bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Done ({selectedGroups.length} selected)
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