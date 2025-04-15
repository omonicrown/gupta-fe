import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { FiSave, FiArrowLeft, FiPlus, FiX } from "react-icons/fi";
// import Sidebar from "../Sidebar";
import Sidebar from "../Sidebar/Sidebar";
import { SmsApis } from "../../apis/smsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateContact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    groups: [] as number[],
    custom_fields: {} as Record<string, string>,
  });

  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customFields, setCustomFields] = useState<{key: string, value: string}[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData({
      ...formData,
      groups: selectedOptions,
    });
  };

  const handleCustomFieldKeyChange = (index: number, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index].key = value;
    setCustomFields(updatedFields);
  };

  const handleCustomFieldValueChange = (index: number, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate the form
    if (!formData.first_name || !formData.phone_number) {
      toast.error("First name and phone number are required");
      setIsLoading(false);
      return;
    }

    // Convert custom fields array to object
    const customFieldsObject = customFields.reduce((obj, field) => {
      if (field.key.trim() !== "") {
        obj[field.key] = field.value;
      }
      return obj;
    }, {} as Record<string, string>);

    // Prepare data for API
    const contactData = new FormData();
    contactData.append("first_name", formData.first_name);
    contactData.append("last_name", formData.last_name);
    contactData.append("phone_number", formData.phone_number);
    contactData.append("email", formData.email);
    
    // Add groups
    formData.groups.forEach((groupId) => {
      contactData.append("groups[]", groupId.toString());
    });
    
    // Add custom fields
    contactData.append("custom_fields", JSON.stringify(customFieldsObject));

    SmsApis.createContact(contactData)
      .then((response: AxiosResponse<any>) => {
        toast.success("Contact created successfully");
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      })
      .catch((error: any) => {
        console.error("Error creating contact:", error);
        toast.error(error.response?.data?.message || "Failed to create contact");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Sidebar title="Create Contact" />
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
                <h1 className="text-2xl font-semibold text-gray-800">Create New Contact</h1>
                <p className="text-sm text-gray-600">Add a new contact to your list</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="col-span-2">
                  <h2 className="text-lg font-medium text-gray-700 mb-3">Basic Information</h2>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    placeholder="+2348012345678"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label htmlFor="groups" className="block text-sm font-medium text-gray-700 mb-1">
                    Groups
                  </label>
                  <select
                    id="groups"
                    name="groups"
                    multiple
                    value={formData.groups.map(g => g.toString())}
                    onChange={handleGroupChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple groups</p>
                </div>

                {/* Custom Fields */}
                <div className="col-span-2 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-medium text-gray-700">Custom Fields</h2>
                    <button
                      type="button"
                      onClick={addCustomField}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiPlus className="mr-1" /> Add Field
                    </button>
                  </div>

                  {customFields.length === 0 ? (
                    <p className="text-sm text-gray-500 mb-4">No custom fields added yet.</p>
                  ) : (
                    customFields.map((field, index) => (
                      <div key={index} className="flex mb-3 gap-3">
                        <div className="w-1/3">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => handleCustomFieldKeyChange(index, e.target.value)}
                            placeholder="Field name"
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => handleCustomFieldValueChange(index, e.target.value)}
                            placeholder="Field value"
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCustomField(index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <FiX />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/contacts")}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2 -ml-1" />
                        Save Contact
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