import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { FiArrowLeft, FiUpload, FiDownload, FiFile } from "react-icons/fi";
// import Sidebar from "../Sidebar";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImportContacts() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    SmsApis.getGroups()
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          setGroups(response.data.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching groups:", error);
        toast.error("Failed to load contact groups");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith('.csv')) {
        toast.error("Please upload a CSV file");
        return;
      }
      setFile(selectedFile);

      // Parse headers for mapping
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const firstLine = content.split("\n")[0];
        const headers = firstLine.split(",").map(header => header.trim().replace(/"/g, ""));
        setCsvHeaders(headers);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value);
  };

  const handleMappingChange = (field: string, csvHeader: string) => {
    setMappings({
      ...mappings,
      [field]: csvHeader,
    });
  };

  const downloadTemplate = () => {
    // Create a template CSV content
    const headers = ["first_name", "last_name", "phone", "email"];
    const sampleRow = ["John", "Doe", "+2348012345678", "john.doe@example.com"];
    
    const csvContent = [
      headers.join(","),
      sampleRow.join(",")
    ].join("\n");
    
    // Create a Blob and initiate download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact_import_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a CSV file to import");
      return;
    }

    if (!mappings.phone) {
      toast.error("Phone number mapping is required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    
    // Add mappings to FormData
    Object.entries(mappings).forEach(([field, header]) => {
      if (header) {
        formData.append(`mapping[${field}]`, header);
      }
    });

    // Add group ID if selected
    if (selectedGroup) {
      formData.append("group_id", selectedGroup);
    }

    SmsApis.importContacts(formData)
      .then((response: AxiosResponse<any>) => {
        toast.success(`${response.data.imported || 0} contacts imported successfully`);
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      })
      .catch((error: any) => {
        console.error("Error importing contacts:", error);
        toast.error(error.response?.data?.message || "Failed to import contacts");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Sidebar title="Import Contacts" />
      <div className="relative md:ml-64 bg-gray-50 min-h-screen">
        <div className="px-4 md:px-10 mx-auto w-full pt-20">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/contacts")}
                className="mr-2 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Import Contacts</h1>
                <p className="text-sm text-gray-600">Import contacts from a CSV file</p>
              </div>
            </div>
            <button
              onClick={downloadTemplate}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <FiDownload className="mr-2" />
              Download Template
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select CSV File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".csv"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">CSV files only</p>
                  </div>
                </div>
                {file && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <FiFile className="mr-2" />
                    {file.name}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="group"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Group (Optional)
                </label>
                <select
                  id="group"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  <option value="">No Group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {csvHeaders.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Map CSV Columns</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Match your CSV columns to contact fields
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={mappings.first_name}
                        onChange={(e) => handleMappingChange("first_name", e.target.value)}
                      >
                        <option value="">Select column</option>
                        {csvHeaders.map((header, index) => (
                          <option key={index} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={mappings.last_name}
                        onChange={(e) => handleMappingChange("last_name", e.target.value)}
                      >
                        <option value="">Select column</option>
                        {csvHeaders.map((header, index) => (
                          <option key={index} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={mappings.phone}
                        onChange={(e) => handleMappingChange("phone", e.target.value)}
                        required
                      >
                        <option value="">Select column</option>
                        {csvHeaders.map((header, index) => (
                          <option key={index} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={mappings.email}
                        onChange={(e) => handleMappingChange("email", e.target.value)}
                      >
                        <option value="">Select column</option>
                        {csvHeaders.map((header, index) => (
                          <option key={index} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/contacts")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !file || !mappings.phone}
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
                      Importing...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2 -ml-1" />
                      Import Contacts
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}