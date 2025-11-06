import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from './CustomModal'; // Import the custom modal
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaArrowLeft, FaImage, FaStore, FaSave, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Oval } from 'react-loader-spinner';

export default function CardEditProduct() {
  const navigate = useNavigate();
  const params = useParams();

  // Modal states
  const [showCreateMarketLinkModal, setShowCreateMarketLinkModal] = useState(false);

  // Form states
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    description: '',
    phoneNumber: '',
    discountedPrice: '',
    category: '',
    location: '',
    price: '',
    marketLinkId: ''
  });

  const [marketLinkForm, setMarketLinkForm] = useState({
    name: '',
    available: null,
    checking: false
  });

  // Data states
  const [productLinks, setProductLinks] = useState([]);
  const [whatsappLinks, setWhatsappLinks] = useState([]);

  // Image states
  const [productImages, setProductImages] = useState({
    image1: { file: 'No selected file', preview: '', id: '' },
    image2: { file: 'No selected file', preview: '', id: '' },
    image3: { file: 'No selected file', preview: '', id: '' }
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
    fetchInitialData();
  }, []);

  // Check market link availability
  useEffect(() => {
    if (marketLinkForm.name.length > 0) {
      setMarketLinkForm(prev => ({ ...prev, available: null, checking: true }));
      const timeoutId = setTimeout(() => {
        checkLinkAvailability();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [marketLinkForm.name]);

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);
      await Promise.all([
        fetchWhatsappLinks(),
        fetchMarketLinks(),
        fetchProductData()
      ]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      toast.error('Failed to load product data');
    } finally {
      setInitialLoading(false);
    }
  };

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
      }
    } catch (error) {
      console.error('Error fetching market links:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await AdminApis.getSingleProduct(params?.id);
      if (response?.data?.data?.product) {
        const product = response.data.data.product;

        setProductForm({
          id: product.id,
          name: product.product_name || '',
          description: product.product_description || '',
          phoneNumber: product.phone_number || '',
          discountedPrice: product.no_of_items || '',
          category: product.category || '',
          location: product.location || '',
          price: product.product_price || '',
          marketLinkId: product.link_name || ''
        });

        setProductImages({
          image1: {
            file: product.product_image_1 || 'No selected file',
            preview: product.product_image_1 || '',
            id: product.product_image_id_1 || ''
          },
          image2: {
            file: product.product_image_2 || 'No selected file',
            preview: product.product_image_2 || '',
            id: product.product_image_id_2 || ''
          },
          image3: {
            file: product.product_image_3 || 'No selected file',
            preview: product.product_image_3 || '',
            id: product.product_image_id_3 || ''
          }
        });
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast.error('Failed to load product details');
    }
  };

  const checkLinkAvailability = async () => {
    try {
      const cleanLinkName = marketLinkForm.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]/g, '');

      const response = await AdminApis.checkMarketLink({ link_name: cleanLinkName });
      setMarketLinkForm(prev => ({
        ...prev,
        available: response?.data?.link === 0,
        checking: false
      }));
    } catch (error) {
      setMarketLinkForm(prev => ({
        ...prev,
        available: false,
        checking: false
      }));
    }
  };

  // Image upload handler
  const handleImageUpload = (e, imageKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const size = file.size / 1048576.0; // Convert to MB

    if (size > 4) {
      e.target.value = '';
      toast.warn(`Image too large (${size.toFixed(2)}MB). Maximum size is 4MB.`);
      return;
    }

    const preview = URL.createObjectURL(file);

    setProductImages(prev => ({
      ...prev,
      [imageKey]: {
        ...prev[imageKey],
        file,
        preview
      }
    }));
  };

  // Form handlers
  const handleProductFormChange = (field, value) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMarketLinkFormChange = (field, value) => {
    setMarketLinkForm(prev => ({ ...prev, [field]: value }));
  };

  // API calls
  const updateProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      const linkData = productForm.marketLinkId.split(' ');

      formData.append('link_name', linkData[0]);
      formData.append('link_id', linkData[1]);
      formData.append('product_name', productForm.name);
      formData.append('product_description', productForm.description);
      formData.append('phone_number', productForm.phoneNumber);
      formData.append('no_of_items', productForm.discountedPrice);
      formData.append('product_price', productForm.price);
      formData.append('category', productForm.category);
      formData.append('location', productForm.location);
      formData.append('id', productForm.id);

      // Handle images
      formData.append('product_image_1', productImages.image1.file);
      formData.append('product_image_2', productImages.image2.file);
      formData.append('product_image_3', productImages.image3.file);
      formData.append('product_image_id_1', productImages.image1.id);
      formData.append('product_image_id_2', productImages.image2.id);
      formData.append('product_image_id_3', productImages.image3.id);

      const response = await AdminApis.updateProduct(formData);

      if (response?.data) {
        toast.success('Product updated successfully');
        navigate('/mini-store');
      } else {
        toast.error(response?.response?.data?.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const createMarketLink = async (e) => {
    e.preventDefault();

    if (!marketLinkForm.available) {
      toast.error("Please choose an available link name");
      return;
    }

    try {
      const formData = new FormData();
      const cleanLinkName = marketLinkForm.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]/g, '');

      formData.append('link_name', cleanLinkName);

      const response = await AdminApis.createMarketLink(formData);

      if (response?.data) {
        toast.success(response.data.message);
        setShowCreateMarketLinkModal(false);
        fetchMarketLinks();
        setMarketLinkForm({ name: '', available: null, checking: false });
      } else {
        toast.error(response?.response?.data?.message || 'Failed to create market link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create market link');
    }
  };

  // Render helper components
  const ImageUploadCard = ({ imageKey, image, placeholder = "Upload Image" }) => (
    <div className="relative group">
      <label className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
        {!image.preview || image.preview === 'no image' ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaImage className="w-8 h-8 mb-4 text-gray-500" />
            <p className="text-sm text-gray-500">{placeholder}</p>
          </div>
        ) : (
          <img
            src={image.preview}
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
      {image.preview && image.preview !== 'no image' && (
        <button
          type="button"
          onClick={() => {
            setProductImages(prev => ({
              ...prev,
              [imageKey]: {
                ...prev[imageKey],
                file: 'No selected file',
                preview: ''
              }
            }));
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

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Oval height={60} width={60} color="#2563eb" secondaryColor="#93c5fd" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/mini-store')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </button>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
        <p className="text-gray-600">Update your product information and images</p>
      </div>

      {/* Info Alert */}
      <InfoAlert>
        <strong>Editing:</strong> {productForm.name || 'Product'} - Make changes and click "Update Product" to save.
      </InfoAlert>

      {/* Main Form */}
      <form onSubmit={updateProduct} className="space-y-8">
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
                      {/* <button
                        type="button"
                        onClick={() => setShowCreateMarketLinkModal(true)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <FaStore size={16} />
                      </button> */}
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
                    {productForm.marketLinkId && (
                      <p className="text-xs text-gray-500 mt-1">
                        Current: {productForm.marketLinkId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Contact *
                      {/* <Link to="/mylinks" className="ml-2 text-blue-600 hover:text-blue-800">
                        <FaStore size={16} />
                      </Link> */}
                    </label>
                    <select
                      required
                      value={productForm.phoneNumber}
                      onChange={(e) => handleProductFormChange('phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select WhatsApp contact</option>
                      {whatsappLinks.map(link => (
                        <option key={link.id} value={link.name}>{link.name}</option>
                      ))}
                    </select>
                    {productForm.phoneNumber && (
                      <p className="text-xs text-gray-500 mt-1">
                        Current: {productForm.phoneNumber}
                      </p>
                    )}
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
                  image={productImages.image1}
                  placeholder="Main Product Image *"
                />

                <div className="grid grid-cols-2 gap-4">
                  <ImageUploadCard
                    imageKey="image2"
                    image={productImages.image2}
                    placeholder="Additional Image"
                  />
                  <ImageUploadCard
                    imageKey="image3"
                    image={productImages.image3}
                    placeholder="Additional Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/mini-store')}
            className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Update Product
              </>
            )}
          </button>
        </div>
      </form>

      {/* Create Market Link Modal */}
      <CustomModal
        isOpen={showCreateMarketLinkModal}
        onClose={() => setShowCreateMarketLinkModal(false)}
        title="Create Market Link"
        maxWidth="max-w-md"
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
              {marketLinkForm.checking && (
                <div className="absolute right-3 top-3">
                  <Oval height={16} width={16} color="#2563eb" />
                </div>
              )}
              {!marketLinkForm.checking && marketLinkForm.available === true && (
                <div className="absolute right-3 top-3 text-green-500">✓</div>
              )}
              {!marketLinkForm.checking && marketLinkForm.available === false && (
                <div className="absolute right-3 top-3 text-red-500">✗</div>
              )}
            </div>

            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">
                https://www.mygupta.co/store/{marketLinkForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')}
              </p>
              {!marketLinkForm.checking && marketLinkForm.available === true && (
                <p className="text-xs text-green-600">✓ Available</p>
              )}
              {!marketLinkForm.checking && marketLinkForm.available === false && (
                <p className="text-xs text-red-600">✗ Link is taken</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateMarketLinkModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!marketLinkForm.available}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${marketLinkForm.available
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {marketLinkForm.available ? 'Create Link' : 'Unavailable'}
            </button>
          </div>
        </form>
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