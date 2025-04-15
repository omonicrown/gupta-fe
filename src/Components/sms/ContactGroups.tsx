import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { FiPlus, FiSearch, FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";
// import Sidebar from "../Sidebar";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbars/AdminNavbar.js";

export default function ContactGroups() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 15,
  });

  useEffect(() => {
    fetchGroups();
  }, [pagination.currentPage, searchTerm]);

  const fetchGroups = () => {
    setIsLoading(true);
    SmsApis.getGroups(pagination.perPage, searchTerm)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setGroups(response.data.data);
          setPagination({
            ...pagination,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page,
          });
        }
      })
      .catch((error: any) => {
        console.error("Error fetching groups:", error);
        toast.error("Failed to load contact groups");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const handleDeleteGroup = (id: number) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      SmsApis.deleteGroup(id)
        .then(() => {
          toast.success("Group deleted successfully");
          fetchGroups();
        })
        .catch((error) => {
          console.error("Error deleting group:", error);
          toast.error("Failed to delete group");
        });
    }
  };

  const navigateToCreateGroup = () => {
    navigate("/create-contact-group");
  };

  return (
    <>
      <Sidebar title="Contact Groups" />
      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
      <AdminNavbar title=""/>
        <div className="px-4 md:px-10 mx-auto w-full ">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Contact Groups</h1>
              <p className="text-sm text-gray-600">Manage your contact groups</p>
            </div>
            <button
              onClick={navigateToCreateGroup}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <FiPlus className="mr-2" />
              Create Group
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Groups List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {groups.length === 0 ? (
                <div className="text-center py-16">
                  <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No groups found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new contact group.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={navigateToCreateGroup}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiPlus className="mr-2" />
                      Create Group
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Contacts
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Created
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {groups.map((group) => (
                          <tr key={group.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <FiUsers className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {group.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {group.description || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {group.contacts_count || 0} contacts
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(group.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => navigate(`/edit-contact-group/${group.id}`)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FiEdit2 className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteGroup(group.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing page <span className="font-medium">{pagination.currentPage}</span> of{" "}
                            <span className="font-medium">{pagination.totalPages}</span>
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                              onClick={() => handlePageChange(pagination.currentPage - 1)}
                              disabled={pagination.currentPage === 1}
                              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                                pagination.currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                              }`}
                            >
                              <span className="sr-only">Previous</span>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            
                            {/* Page numbers would go here */}
                            {Array.from({ length: pagination.totalPages }, (_, index) => (
                              <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                  pagination.currentPage === index + 1
                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {index + 1}
                              </button>
                            ))}
                            
                            <button
                              onClick={() => handlePageChange(pagination.currentPage + 1)}
                              disabled={pagination.currentPage === pagination.totalPages}
                              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                                pagination.currentPage === pagination.totalPages ? "cursor-not-allowed opacity-50" : ""
                              }`}
                            >
                              <span className="sr-only">Next</span>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}