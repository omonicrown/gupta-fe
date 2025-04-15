import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { FiSave, FiArrowLeft, FiSearch, FiUser, FiPlus, FiX } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateContactGroup() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contacts: [] as number[],
  });

  const [availableContacts, setAvailableContacts] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    fetchContacts();
    
    if (isEditMode) {
      fetchGroupDetails();
    }
  }, [id]);

  const fetchGroupDetails = () => {
    setIsFetching(true);
    SmsApis.getGroup(Number(id))
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          const groupData = response.data;
          setFormData({
            name: groupData.name,
            description: groupData.description || "",
            contacts: groupData.contacts.map((contact: any) => contact.id),
          });
          
          // Set selected contacts
          setSelectedContacts(groupData.contacts);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching group details:", error);
        toast.error("Failed to load group details");
        navigate("/contact-groups");
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const fetchContacts = () => {
    SmsApis.getContacts(100, searchTerm)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setAvailableContacts(response.data.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts");
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchContacts();
  };

  const handleContactSelect = (contact: any) => {
    // Check if contact is already selected
    if (!formData.contacts.includes(contact.id)) {
      setFormData({
        ...formData,
        contacts: [...formData.contacts, contact.id],
      });
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleContactRemove = (contactId: number) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter(id => id !== contactId),
    });
    setSelectedContacts(selectedContacts.filter(contact => contact.id !== contactId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error("Group name is required");
      return;
    }
    
    setIsLoading(true);
    
    const apiCall = isEditMode
      ? SmsApis.updateGroup(Number(id), formData)
      : SmsApis.createGroup(formData);
    
    apiCall
      .then((response: AxiosResponse<any>) => {
        toast.success(`Group ${isEditMode ? "updated" : "created"} successfully`);
        setTimeout(() => {
          navigate("/contact-groups");
        }, 2000);
      })
      .catch((error: any) => {
        console.error(`Error ${isEditMode ? "updating" : "creating"} group:`, error);
        toast.error(error.response?.data?.message || `Failed to ${isEditMode ? "update" : "create"} group`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isFetching) {
    return (
      <>
        <Sidebar title={`${isEditMode ? "Edit" : "Create"} Contact Group`} />
        <div className="relative md:ml-64 bg-gray-50 min-h-screen">
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar title={`${isEditMode ? "Edit" : "Create"} Contact Group`} />
      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
        <div className="px-4 md:px-10 mx-auto w-full pt-20">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/contact-groups")}
                className="mr-2 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {isEditMode ? "Edit" : "Create"} Contact Group
                </h1>
                <p className="text-sm text-gray-600">
                  {isEditMode ? "Update group details and members" : "Create a new contact group"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter a description for this group"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Contacts
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                {/* Available Contacts */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Contacts</h3>
                  <div className="border border-gray-300 rounded-md h-48 overflow-y-auto">
                    {availableContacts.length === 0 ? (
                      <div className="text-center py-5 text-gray-500">No contacts found</div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {availableContacts
                          .filter(contact => !formData.contacts.includes(contact.id))
                          .map(contact => (
                            <li 
                              key={contact.id} 
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                              onClick={() => handleContactSelect(contact)}
                            >
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <FiUser className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {contact.first_name} {contact.last_name}
                                  </p>
                                  <p className="text-xs text-gray-500">{contact.phone}</p>
                                </div>
                              </div>
                              <FiPlus className="h-5 w-5 text-blue-600" />
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Selected Contacts */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Contacts ({selectedContacts.length})
                  </h3>
                  {selectedContacts.length === 0 ? (
                    <div className="border border-gray-300 border-dashed rounded-md p-4 text-center text-gray-500">
                      No contacts selected
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-md h-48 overflow-y-auto">
                      <ul className="divide-y divide-gray-200">
                        {selectedContacts.map(contact => (
                          <li 
                            key={contact.id} 
                            className="px-4 py-2 hover:bg-gray-50 flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <FiUser className="h-4 w-4 text-gray-500" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {contact.first_name} {contact.last_name}
                                </p>
                                <p className="text-xs text-gray-500">{contact.phone}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleContactRemove(contact.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiX className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/contact-groups")}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2 -ml-1" />
                        {isEditMode ? "Update Group" : "Create Group"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}