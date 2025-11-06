import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from './CustomModal'; // Import the new custom modal
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit, FaPlus, FaImage, FaStore, FaExternalLinkAlt } from "react-icons/fa";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import { AiOutlineWarning, AiOutlineInfoCircle } from "react-icons/ai";
import { Oval } from 'react-loader-spinner';
import InputColor from 'react-input-color';

export default function CardCreateProduct() {
  const navigate = useNavigate();

  // Modal states
  const [modals, setModals] = useState({
    createMarketLink: false,
    editMarketLink: false,
    deleteMarketLink: false
  });

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    phoneNumber: '',
    discountedPrice: '',
    category: 'all',
    location: '',
    price: '',
    marketLinkId: '',
    whatsappLink: ''
  });

  const [marketLinkForm, setMarketLinkForm] = useState({
    name: '',
    color: { hex: '#0071BC' },
    description: '',
    facebookUrl: '',
    instagramUrl: '',
    tiktokUrl: '',
    logo: 'No selected file'
  });

  // Data states
  const [productLinks, setProductLinks] = useState([]);
  const [whatsappLinks, setWhatsappLinks] = useState([]);
  const [userData, setUserData] = useState({});

  // Image states
  const [productImages, setProductImages] = useState({
    image1: { file: 'No selected file', preview: 'empty' },
    image2: { file: 'No selected file', preview: 'empty' },
    image3: { file: 'No selected file', preview: 'empty' }
  });

  const [logoPreview, setLogoPreview] = useState('empty');

  // UI states
  const [loading, setLoading] = useState(false);
  const [linkAvailability, setLinkAvailability] = useState({ available: null, checking: false });
  const [selectedLinkId, setSelectedLinkId] = useState('');
  const [editingMarketLink, setEditingMarketLink] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Categories and locations data
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'women fashion', label: "Women's Fashion" },
    { value: 'men fashion', label: "Men's Fashion" },
    { value: 'beauty&cosmetics', label: 'Beauty and Cosmetics' },
    { value: 'bags', label: 'Bags' },
    { value: 'sport/outdoor', label: 'Sport/Outdoor' },
    { value: 'home/kitchen', label: 'Home/Kitchen' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'watches', label: 'Watches' },
    { value: 'keyboard & mice', label: 'Keyboard & Mice' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'phones', label: 'Phones' }
  ];

  const nigerianStates = [
    'Abuja FCT', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
    'Kwara', 'Lagos', 'Nassarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  // Fetch initial data
  useEffect(() => {
    fetchWhatsappLinks();
    fetchMarketLinks();
  }, [refresh]);

  // Check link availability
  useEffect(() => {
    if (marketLinkForm.name.length > 0) {
      setLinkAvailability({ available: null, checking: true });
      const timeoutId = setTimeout(() => {
        checkLinkAvailability();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [marketLinkForm.name]);

  const fetchWhatsappLinks = async () => {
    try {
      const response = await AdminApis.getlinks();
      if (response?.data) {
        setWhatsappLinks(response.data.link || []);
      }
    } catch (error) {
      console.error('Error fetching WhatsApp links:', error);
    }
  };

  const fetchMarketLinks = async () => {
    try {
      const response = await AdminApis.getMarketLink();
      if (response?.data) {
        setProductLinks(response.data.link || []);
        setUserData(response.data.user_data || {});
      }
    } catch (error) {
      console.error('Error fetching market links:', error);
    }
  };

  const checkLinkAvailability = async () => {
    try {
      const cleanLinkName = marketLinkForm.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]/g, '');

      const response = await AdminApis.checkMarketLink({ link_name: cleanLinkName });
      setLinkAvailability({
        available: response?.data?.link === 0,
        checking: false
      });
    } catch (error) {
      setLinkAvailability({ available: false, checking: false });
    }
  };

  // Modal handlers
  const toggleModal = (modalName, state = null) => {
    setModals(prev => ({
      ...prev,
      [modalName]: state !== null ? state : !prev[modalName]
    }));
  };

  const openCreateMarketLinkModal = () => {
    if (parseInt(userData?.no_of_malink || 0) > productLinks.length) {
      toggleModal('createMarketLink', true);
    } else {
      toast.error("Market Link limit exceeded");
    }
  };

  const openEditMarketLinkModal = (linkData) => {
    setEditingMarketLink(linkData);
    setMarketLinkForm({
      name: linkData.link_name,
      color: { hex: linkData.brand_primary_color || '#0071BC' },
      description: linkData.brand_description || '',
      facebookUrl: linkData.facebook_url || '',
      instagramUrl: linkData.instagram_url || '',
      tiktokUrl: linkData.tiktok_url || '',
      logo: 'No selected file'
    });
    toggleModal('editMarketLink', true);
  };

  const openDeleteMarketLinkModal = (linkId) => {
    setSelectedLinkId(linkId);
    toggleModal('deleteMarketLink', true);
  };

  // Image upload handlers
  const handleImageUpload = (e, imageKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const size = file.size / 1048576.0; // Convert to MB

    if (size > 4) {
      e.target.value = '';
      toast.warn('Image too large. Maximum size is 4MB.');
      return;
    }

    const preview = URL.createObjectURL(file);

    if (imageKey === 'logo') {
      setMarketLinkForm(prev => ({ ...prev, logo: file }));
      setLogoPreview(preview);
    } else {
      setProductImages(prev => ({
        ...prev,
        [imageKey]: { file, preview }
      }));
    }
  };

  // Form handlers
  const handleProductFormChange = (field, value) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMarketLinkFormChange = (field, value) => {
    setMarketLinkForm(prev => ({ ...prev, [field]: value }));
  };

  // API calls
  const createProduct = async (e) => {
    e.preventDefault();

    if (productImages.image1.file === 'No selected file') {
      toast.error("Please upload at least one product image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const linkData = productForm.marketLinkId.split(' ');

      formData.append('link_name', linkData[0]);
      formData.append('link_id', linkData[1]);
      formData.append('product_name', productForm.name);
      formData.append('product_description', productForm.description);
      formData.append('phone_number', productForm.whatsappLink);
      formData.append('no_of_items', productForm.discountedPrice);
      formData.append('product_price', productForm.price);
      formData.append('category', productForm.category);
      formData.append('location', productForm.location);
      formData.append('product_image_1', productImages.image1.file);
      formData.append('product_image_2', productImages.image2.file);
      formData.append('product_image_3', productImages.image3.file);

      const response = await AdminApis.createProduct(formData);

      if (response?.data) {
        toast.success(response.data.message);
        navigate('/mini-store');
      } else {
        toast.error(response?.response?.data?.message || 'Failed to create product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const createMarketLink = async (e) => {
    e.preventDefault();

    if (!linkAvailability.available) {
      toast.error("Please choose an available link name");
      return;
    }

    try {
      const formData = new FormData();
      const cleanLinkName = marketLinkForm.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]/g, '');

      formData.append('link_name', cleanLinkName);
      formData.append('brand_primary_color', marketLinkForm.color.hex);
      formData.append('brand_description', marketLinkForm.description);
      formData.append('facebook_url', marketLinkForm.facebookUrl);
      formData.append('instagram_url', marketLinkForm.instagramUrl);
      formData.append('tiktok_url', marketLinkForm.tiktokUrl);
      formData.append('brand_logo', marketLinkForm.logo);

      const response = await AdminApis.createMarketLink(formData);

      if (response?.data) {
        toast.success(response.data.message);
        setRefresh(!refresh);
        toggleModal('createMarketLink', false);
        resetMarketLinkForm();
      } else {
        toast.error(response?.response?.data?.message || 'Failed to create market link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create market link');
    }
  };

  const updateMarketLink = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('link_name', editingMarketLink.link_name);
      formData.append('brand_primary_color', marketLinkForm.color.hex);
      formData.append('brand_description', marketLinkForm.description || editingMarketLink.brand_description);
      formData.append('facebook_url', marketLinkForm.facebookUrl || editingMarketLink.facebook_url);
      formData.append('instagram_url', marketLinkForm.instagramUrl || editingMarketLink.instagram_url);
      formData.append('tiktok_url', marketLinkForm.tiktokUrl || editingMarketLink.tiktok_url);
      formData.append('brand_logo', marketLinkForm.logo);
      formData.append('id', editingMarketLink.id);

      const response = await AdminApis.updateMarketLink(formData);

      if (response?.data) {
        toast.success(response.data.message);
        setRefresh(!refresh);
        toggleModal('editMarketLink', false);
        resetMarketLinkForm();
      } else {
        toast.error(response?.response?.data?.message || 'Failed to update market link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update market link');
    }
  };

  const deleteMarketLink = async () => {
    setLoading(true);

    try {
      const response = await AdminApis.deleteMarketLink(selectedLinkId);

      if (response?.data) {
        toast.success(response.data.message);
        setRefresh(!refresh);
        toggleModal('deleteMarketLink', false);
      } else {
        toast.error(response?.response?.data?.message || 'Failed to delete market link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete market link');
    } finally {
      setLoading(false);
    }
  };

  const resetMarketLinkForm = () => {
    setMarketLinkForm({
      name: '',
      color: { hex: '#0071BC' },
      description: '',
      facebookUrl: '',
      instagramUrl: '',
      tiktokUrl: '',
      logo: 'No selected file'
    });
    setLogoPreview('empty');
  };

  // Render helper components
  const ImageUploadCard = ({ imageKey, preview, placeholder = "Upload Image" }) => (
    <div className="relative group">
      <label className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
        {preview === 'empty' ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaImage className="w-8 h-8 mb-4 text-gray-500" />
            <p className="text-sm text-gray-500">{placeholder}</p>
          </div>
        ) : (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, imageKey)}
        />
      </label>
      {preview !== 'empty' && (
        <button
          type="button"
          onClick={() => {
            if (imageKey === 'logo') {
              setLogoPreview('empty');
              setMarketLinkForm(prev => ({ ...prev, logo: 'No selected file' }));
            } else {
              setProductImages(prev => ({
                ...prev,
                [imageKey]: { file: 'No selected file', preview: 'empty' }
              }));
            }
          }}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <IoMdClose size={16} />
        </button>
      )}
      <p className="text-xs text-gray-500 mt-1">Max 4MB</p>
    </div>
  );

  const InfoAlert = ({ children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex">
        <AiOutlineInfoCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-blue-700">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create and manage your product listings</p>
      </div>

      {/* Info Alert */}
      <InfoAlert>
        <strong>Note:</strong> Market links are custom URLs where your customers can view all your products.
        Create a market link first, then add products to it.
      </InfoAlert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          type="button"
          onClick={openCreateMarketLinkModal}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaStore className="mr-2" />
          Add Market Link
        </button>

        {loading && (
          <div className="flex items-center">
            <Oval height={32} width={32} color="#2563eb" secondaryColor="#93c5fd" />
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={createProduct} className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Product Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => handleProductFormChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={productForm.description}
                    onChange={(e) => handleProductFormChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your product, including size, features, etc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => handleProductFormChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={productForm.location}
                      onChange={(e) => handleProductFormChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {nigerianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sales Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => handleProductFormChange('price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discounted Price (Optional)
                    </label>
                    <input
                      type="number"
                      value={productForm.discountedPrice}
                      onChange={(e) => handleProductFormChange('discountedPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      Market Link *
                      <button
                        type="button"
                        onClick={openCreateMarketLinkModal}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <IoIosAddCircle size={20} />
                      </button>
                    </label>
                    <select
                      required
                      value={productForm.marketLinkId}
                      onChange={(e) => handleProductFormChange('marketLinkId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select market link</option>
                      {productLinks.map(link => (
                        <option key={link.id} value={`${link.link_name} ${link.id}`}>
                          mygupta.co/store/{link.link_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Contact *
                      <Link to="/mylinks" className="ml-2 text-blue-600 hover:text-blue-800">
                        <IoIosAddCircle size={20} />
                      </Link>
                    </label>
                    <select
                      required
                      value={productForm.whatsappLink}
                      onChange={(e) => handleProductFormChange('whatsappLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select WhatsApp contact</option>
                      {whatsappLinks.map(link => (
                        <option key={link.id} value={link.name}>{link.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Product Images</h3>
              <div className="space-y-4">
                <ImageUploadCard
                  imageKey="image1"
                  preview={productImages.image1.preview}
                  placeholder="Main Product Image *"
                />

                <div className="grid grid-cols-2 gap-4">
                  <ImageUploadCard
                    imageKey="image2"
                    preview={productImages.image2.preview}
                    placeholder="Additional Image"
                  />
                  <ImageUploadCard
                    imageKey="image3"
                    preview={productImages.image3.preview}
                    placeholder="Additional Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>

      {/* Market Links Section */}
      <div className="mt-12">
        <hr className="mb-8" />
        <h3 className="text-xl font-semibold mb-6">Your Market Links</h3>

        {productLinks.length > 0 ? (
          <div className="space-y-3">
            {productLinks.map((link, index) => (
              <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div>
                    <p className="font-medium">mygupta.co/s/{link.link_name}</p>
                    <p className="text-sm text-gray-500">{link.brand_description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => window.open(`https://mygupta.co/s/${link.link_name}`, '_blank')}
                    className="p-2 text-gray-600 hover:text-blue-600"
                    title="View Link"
                  >
                    <FaExternalLinkAlt size={16} />
                  </button>

                  {(userData?.sub_type === 'premium' || userData?.sub_type === 'free') && (
                    <button
                      type="button"
                      onClick={() => openEditMarketLinkModal(link)}
                      className="p-2 text-gray-600 hover:text-blue-600"
                      title="Edit Link"
                    >
                      <FaEdit size={16} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openDeleteMarketLinkModal(link.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                    title="Delete Link"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No market links created yet. Create your first market link to start adding products.
          </div>
        )}
      </div>

      {/* Create Market Link Modal */}
      <CustomModal
        isOpen={modals.createMarketLink}
        onClose={() => toggleModal('createMarketLink', false)}
        title="Create Market Link"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={createMarketLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Link Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={marketLinkForm.name}
                onChange={(e) => handleMarketLinkFormChange('name', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. john-stores"
              />
              {linkAvailability.checking && (
                <div className="absolute right-3 top-3">
                  <Oval height={16} width={16} color="#2563eb" />
                </div>
              )}
              {!linkAvailability.checking && linkAvailability.available === true && (
                <div className="absolute right-3 top-3 text-green-500">✓</div>
              )}
              {!linkAvailability.checking && linkAvailability.available === false && (
                <div className="absolute right-3 top-3 text-red-500">✗</div>
              )}
            </div>

            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">
                https://www.mygupta.co/store/{marketLinkForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')}
              </p>
              {!linkAvailability.checking && linkAvailability.available === true && (
                <p className="text-xs text-green-600">✓ Available</p>
              )}
              {!linkAvailability.checking && linkAvailability.available === false && (
                <p className="text-xs text-red-600">✗ Link is taken</p>
              )}
            </div>
          </div>

          {/* Premium Features */}
          {(userData?.sub_type === 'premium' || userData?.sub_type === 'popular' || userData?.sub_type === 'free') && (
            <div className="space-y-4">
              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <InputColor
                    initialValue="#0071BC"
                    onChange={(color) => handleMarketLinkFormChange('color', color)}
                    placement="right"
                  />
                  <div
                    className="flex-1 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: marketLinkForm.color.hex }}
                  >
                    {marketLinkForm.color.hex}
                  </div>
                </div>
              </div>

              {/* Social Media URLs */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={marketLinkForm.facebookUrl}
                    onChange={(e) => handleMarketLinkFormChange('facebookUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={marketLinkForm.instagramUrl}
                    onChange={(e) => handleMarketLinkFormChange('instagramUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    value={marketLinkForm.tiktokUrl}
                    onChange={(e) => handleMarketLinkFormChange('tiktokUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.tiktok.com/..."
                  />
                </div>
              </div>

              {/* Brand Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Description
                </label>
                <textarea
                  rows={3}
                  value={marketLinkForm.description}
                  onChange={(e) => handleMarketLinkFormChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your brand"
                />
              </div>

              {/* Brand Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Logo
                </label>
                <ImageUploadCard
                  imageKey="logo"
                  preview={logoPreview}
                  placeholder="Upload Brand Logo"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => toggleModal('createMarketLink', false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!linkAvailability.available}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${linkAvailability.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {linkAvailability.available ? 'Create Link' : 'Unavailable'}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Edit Market Link Modal */}
      <CustomModal
        isOpen={modals.editMarketLink}
        onClose={() => toggleModal('editMarketLink', false)}
        title="Edit Market Link"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={updateMarketLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Link Name (Cannot be changed)
            </label>
            <input
              type="text"
              disabled
              value={editingMarketLink?.link_name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              https://www.mygupta.co/store/{editingMarketLink?.link_name}
            </p>
          </div>

          {/* Premium Features for Edit */}
          {(userData?.sub_type === 'premium' || userData?.sub_type === 'popular' || userData?.sub_type === 'free') && (
            <div className="space-y-4">
              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <InputColor
                    initialValue={editingMarketLink?.brand_primary_color || '#0071BC'}
                    onChange={(color) => handleMarketLinkFormChange('color', color)}
                    placement="right"
                  />
                  <div
                    className="flex-1 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: marketLinkForm.color.hex }}
                  >
                    {marketLinkForm.color.hex}
                  </div>
                </div>
              </div>

              {/* Social Media URLs */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    defaultValue={editingMarketLink?.facebook_url}
                    onChange={(e) => handleMarketLinkFormChange('facebookUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    defaultValue={editingMarketLink?.instagram_url}
                    onChange={(e) => handleMarketLinkFormChange('instagramUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    defaultValue={editingMarketLink?.tiktok_url}
                    onChange={(e) => handleMarketLinkFormChange('tiktokUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.tiktok.com/..."
                  />
                </div>
              </div>

              {/* Brand Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Description
                </label>
                <textarea
                  rows={3}
                  defaultValue={editingMarketLink?.brand_description}
                  onChange={(e) => handleMarketLinkFormChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your brand"
                />
              </div>

              {/* Brand Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Logo
                </label>
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <ImageUploadCard
                      imageKey="logo"
                      preview={logoPreview}
                      placeholder="Upload New Logo"
                    />
                  </div>
                  {editingMarketLink?.brand_logo && (
                    <div className="w-24 h-24">
                      <img
                        src={editingMarketLink.brand_logo}
                        alt="Current logo"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current logo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => toggleModal('editMarketLink', false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Link
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Delete Market Link Modal */}
      <CustomModal
        isOpen={modals.deleteMarketLink}
        onClose={() => toggleModal('deleteMarketLink', false)}
        title="Delete Market Link"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AiOutlineWarning size={24} />
            <p className="text-sm font-medium">
              You are about to delete this market link permanently.
            </p>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium">Please note that:</p>
            <ul className="space-y-1 list-disc list-inside ml-4">
              <li>The link will stop working immediately</li>
              <li>All link data will be permanently lost</li>
              <li>The link name will become available to others</li>
              <li className="font-bold text-red-600">All products attached to this market link will be lost</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => toggleModal('deleteMarketLink', false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteMarketLink}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Deleting...' : 'Delete Link'}
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}