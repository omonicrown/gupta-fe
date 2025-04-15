import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { FiPlus, FiSearch, FiUpload, FiFilter } from "react-icons/fi";
// import Sidebar from "../Sidebar";
import Sidebar from "../Sidebar/Sidebar";
import ContactsList from "./ContactComponent/ContactsList";
import ContactFilters from "./ContactComponent/ContactFilters";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbars/AdminNavbar.js";

export default function Contacts() {
  const navigate = useNavigate();
  const userLoginData = useSelector((state: any) => state.data.login.value);

  const [contacts, setContacts] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 15,
  });

  useEffect(() => {
    fetchGroups();
    fetchContacts();
  }, [pagination.currentPage, searchTerm, selectedGroupId]);

  const fetchContacts = () => {
    setIsLoading(true);
    SmsApis.getContacts(pagination.perPage, searchTerm, selectedGroupId)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setContacts(response.data.data);
          setPagination({
            ...pagination,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page,
          });
        }
      })
      .catch((error: any) => {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchGroups = () => {
    SmsApis.getGroups()
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setGroups(response.data.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching groups:", error);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGroupFilter = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const handleDeleteContact = (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      SmsApis.deleteContact(id)
        .then(() => {
          toast.success("Contact deleted successfully");
          fetchContacts();
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          toast.error("Failed to delete contact");
        });
    }
  };

  const navigateToCreateContact = () => {
    navigate("/create-contact");
  };

  const navigateToImportContacts = () => {
    navigate("/import-contacts");
  };

  return (
    <>
      <Sidebar title="Contacts" />
      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
      <AdminNavbar title=""/>
        <div className="px-4 md:px-10 mx-auto w-full  ">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Contacts</h1>
              <p className="text-sm text-gray-600">Manage your contact list</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={navigateToCreateContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <FiPlus className="mr-2" />
                Add Contact
              </button>
              <button
                onClick={navigateToImportContacts}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <FiUpload className="mr-2" />
                Import
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-2">
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
            <div className="w-full md:w-1/3 md:pl-2">
              <ContactFilters
                groups={groups}
                selectedGroupId={selectedGroupId}
                onGroupFilterChange={handleGroupFilter}
              />
            </div>
          </div>

          {/* Contacts List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <ContactsList
              contacts={contacts}
              onDeleteContact={handleDeleteContact}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}