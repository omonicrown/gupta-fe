import React, { useState, useEffect, useCallback, useRef } from "react";
import { AdminApis } from "../../apis/adminApi";
import { 
  FaTrash, 
  FaEdit, 
  FaSearch, 
  FaPlus, 
  FaExternalLinkAlt,
  FaStore,
  FaTh,
  FaList,
  FaCopy,
  FaTag,
  FaMapMarkerAlt
} from "react-icons/fa";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { useSelector } from 'react-redux';
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { Oval } from 'react-loader-spinner';
import CardRenewSubscription from "./CardRenewSubscription";
import configs from "../../configs";

export default function CardMiniStore() {
  const userLoginData = useSelector((state) => state.data.login.value);
  
  // State management
  const [modals, setModals] = useState({
    edit: false,
    delete: false,
    exceed: false
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMarketLink, setSelectedMarketLink] = useState('all');
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);

  const searchInputRef = useRef(null);

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories', color: 'bg-gray-100' },
    { value: 'women fashion', label: "Women's Fashion", color: 'bg-pink-100' },
    { value: 'men fashion', label: "Men's Fashion", color: 'bg-blue-100' },
    { value: 'beauty&cosmetics', label: 'Beauty & Cosmetics', color: 'bg-purple-100' },
    { value: 'bags', label: 'Bags', color: 'bg-yellow-100' },
    { value: 'sport/outdoor', label: 'Sport/Outdoor', color: 'bg-green-100' },
    { value: 'home/kitchen', label: 'Home/Kitchen', color: 'bg-orange-100' },
    { value: 'shoes', label: 'Shoes', color: 'bg-red-100' },
    { value: 'watches', label: 'Watches', color: 'bg-indigo-100' },
    { value: 'laptops', label: 'Laptops', color: 'bg-gray-100' },
    { value: 'phones', label: 'Phones', color: 'bg-cyan-100' }
  ];

  // Fetch products data
  const fetchProducts = useCallback(async (page = '') => {
    try {
      setLoading(true);
      const response = await AdminApis.getAllStore(page);
      if (response?.data) {
        setProducts(response.data?.data?.data || []);
        setPaginationData(response.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      toast.error('Failed to load products');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Search and filter logic
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product => 
        product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.link_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Market link filter
    if (selectedMarketLink !== 'all') {
      filtered = filtered.filter(product => product.link_name === selectedMarketLink);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'price-low':
          return parseFloat(a.product_price || 0) - parseFloat(b.product_price || 0);
        case 'price-high':
          return parseFloat(b.product_price || 0) - parseFloat(a.product_price || 0);
        case 'name':
          return (a.product_name || '').localeCompare(b.product_name || '');
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedMarketLink, sortBy]);

  // Get unique market links from products
  const getUniqueMarketLinks = () => {
    const links = [...new Set(products.map(p => p.link_name).filter(Boolean))];
    return links;
  };

  // Modal handlers
  const toggleModal = (modalName, state = null, product = null) => {
    setModals(prev => ({
      ...prev,
      [modalName]: state !== null ? state : !prev[modalName]
    }));
    if (product) setSelectedProduct(product);
  };

  // API actions
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const data = {
        message,
        id: selectedProduct?.id,
        name: selectedProduct?.product_name,
        phone_number: selectedProduct?.link_info?.phone_number
      };
      
      const response = await AdminApis.editLink(data);
      if (response?.data) {
        toast.success(response.data.message);
        toggleModal('edit', false);
        fetchProducts();
        setMessage("");
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AdminApis.deleteProduct(selectedProduct);
      if (response?.data) {
        toast.success("Product deleted successfully");
        toggleModal('delete', false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const handlePageChange = (page) => {
    fetchProducts(page);
    setCurrentPage(page);
  };

  // Utility functions
  const truncateText = (str, length = 60) => {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN' 
    }).format(price || 0);
  };

  const copyToClipboard = () => {
    toast.success("Link copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'bg-gray-100';
  };

  // Render components
  const ProductCard = ({ product, isListView = false }) => (
    <div className={`group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
      isListView ? 'flex h-24' : 'flex flex-col h-80'
    }`}>
      {/* Product Image */}
      <div className={`relative overflow-hidden ${isListView ? 'w-24 flex-shrink-0' : 'w-full h-40'}`}>
        <div
          className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 bg-cover bg-center group-hover:scale-105 transition-transform duration-300`}
          style={{
            backgroundImage: product.product_image_1 
              ? `url(${product.product_image_1})` 
              : 'none'
          }}
        >
          {!product.product_image_1 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <FaStore size={isListView ? 14 : 20} />
            </div>
          )}
        </div>
        
        {/* Market Link Badge */}
        <div className={`absolute ${isListView ? 'top-1 left-1' : 'top-2 left-2'}`}>
          <span className={`bg-white/90 backdrop-blur-sm text-gray-700 font-medium px-1.5 py-0.5 rounded-full border border-gray-200 ${isListView ? 'text-xs' : 'text-xs'}`}>
            {truncateText(product.link_name, 8)}
          </span>
        </div>

        {/* Quick Actions Overlay - Only for grid view */}
        {!isListView && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex space-x-2">
              <NavLink 
                to={`/edit-product/${product.id}`}
                className="p-1.5 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors"
                title="Edit Product"
              >
                <FaEdit size={12} />
              </NavLink>
              
              <a
                href={`${configs?.baseRedirectFront}s/${product.link_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors"
                title="View Store"
              >
                <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`p-3 flex-1 flex flex-col ${isListView ? 'justify-between' : ''}`}>
        {/* Top Section - Name, Description, Price */}
        <div className="flex-1">
          {/* Product Name */}
          <h3 className={`font-semibold text-gray-900 mb-1 line-clamp-1 ${isListView ? 'text-sm' : 'text-sm'}`}>
            {truncateText(product.product_name, isListView ? 25 : 30)}
          </h3>

          {/* Product Description - Only show in grid view */}
          {!isListView && (
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
              {truncateText(product.product_description, 60)}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center space-x-1 mb-2">
            {product.no_of_items && parseFloat(product.no_of_items) < parseFloat(product.product_price) && (
              <span className="text-gray-400 line-through text-xs">
                {formatPrice(product.product_price)}
              </span>
            )}
            <span className={`text-green-600 font-bold ${isListView ? 'text-sm' : 'text-base'}`}>
              {formatPrice(product.no_of_items || product.product_price)}
            </span>
          </div>

          {/* Category & Location Tags - Only in grid view */}
          {!isListView && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.category && (
                <span className={`${getCategoryColor(product.category)} text-gray-700 text-xs px-1.5 py-0.5 rounded-full flex items-center`}>
                  <FaTag size={6} className="mr-1" />
                  {truncateText(product.category, 10)}
                </span>
              )}
              {product.location && (
                <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                  <FaMapMarkerAlt size={6} className="mr-1" />
                  {truncateText(product.location, 8)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section - Actions */}
        <div className={`flex items-center justify-between ${isListView ? 'mt-2' : 'pt-2 border-t border-gray-100'}`}>
          {/* Copy Link */}
          <CopyToClipboard 
            text={`${configs?.baseRedirectFront}s/${product.link_name}`}
            onCopy={copyToClipboard}
          >
            <button className={`flex items-center space-x-1 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors rounded ${isListView ? 'text-xs px-2 py-1' : 'text-xs px-2 py-1'}`}>
              <FaCopy size={10} />
              <span>Copy</span>
            </button>
          </CopyToClipboard>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <NavLink 
              to={`/edit-product/${product.id}`}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              title="Edit Product"
            >
              <FaEdit size={12} />
            </NavLink>
            
            <a
              href={`${configs?.baseRedirectFront}s/${product.link_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors"
              title="View Store"
            >
              <FaExternalLinkAlt size={12} />
            </a>
            
            <button
              onClick={() => toggleModal('delete', true, product.id)}
              className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Product"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
        <FaStore className="text-blue-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {searchTerm || selectedCategory !== 'all' || selectedMarketLink !== 'all'
          ? "No products match your criteria"
          : "Start Your Product Journey"
        }
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {searchTerm || selectedCategory !== 'all' || selectedMarketLink !== 'all'
          ? "Try adjusting your filters or search terms to find what you're looking for."
          : "Create your first product and start building your online store. It's easy and takes just a few minutes!"
        }
      </p>
      {!searchTerm && selectedCategory === 'all' && selectedMarketLink === 'all' && (
        <NavLink
          to="/createproduct"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <FaPlus className="mr-2" />
          Create Your First Product
        </NavLink>
      )}
    </div>
  );

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Oval height={32} width={32} color="#3b82f6" secondaryColor="#93c5fd" />
          </div>
          <p className="text-gray-600 font-medium">Loading your amazing products...</p>
        </div>
      </div>
    );
  }

  // Check for subscription expiry
  if (paginationData?.data === 'sub_expired') {
    return <CardRenewSubscription />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Compact Header */}
        <div className="mb-6">
          {/* Compact Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <FaStore className="text-blue-600 mr-2" size={14} />
              <p className="text-blue-700 text-sm">
                <strong>Mini Store:</strong> Create custom market links and showcase products beautifully.
              </p>
            </div>
          </div>

          {/* Compact Header Content */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {searchTerm && (
                  <span className="text-blue-600 font-medium"> matching "{searchTerm}"</span>
                )}
              </p>
            </div>

            <NavLink
              to={
                userLoginData?.data?.no_of_mstore <= products.length 
                  ? "#" 
                  : "/createproduct"
              }
              onClick={
                userLoginData?.data?.no_of_mstore <= products.length
                  ? () => toggleModal('exceed', true)
                  : undefined
              }
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
            >
              <FaPlus className="mr-2" size={12} />
              Add Product
            </NavLink>
          </div>
        </div>

        {/* Compact Filters and Controls */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Search */}
            <div className="lg:col-span-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Link Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedMarketLink}
                onChange={(e) => setSelectedMarketLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="all">All Market Links</option>
                {getUniqueMarketLinks().map(link => (
                  <option key={link} value={link}>{link}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="lg:col-span-2">
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 flex items-center justify-center px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaTh className="mr-1" size={12} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 flex items-center justify-center px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaList className="mr-1" size={12} />
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginationData?.links && paginationData.links.length > 3 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {paginationData.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (link.label === 'Next &raquo;' || link.label === '&laquo; Previous') {
                      const page = link.url?.charAt(link.url.length - 1);
                      handlePageChange(page);
                    } else if (!isNaN(link.label)) {
                      handlePageChange(link.label);
                    }
                  }}
                  disabled={link.active || !link.url}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    link.active
                      ? 'bg-blue-600 text-white shadow-md'
                      : link.url
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {link.label === '&laquo; Previous' 
                    ? 'Previous' 
                    : link.label === 'Next &raquo;' 
                    ? 'Next' 
                    : link.label
                  }
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {/* {dropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDropdownOpen(null)}
          />
        )} */}

        {/* Edit Modal */}
        <Modal
          visible={modals.edit}
          width="90%"
          height="auto"
          effect="fadeInUp"
          onClickAway={() => toggleModal('edit', false)}
        >
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Edit Product Message</h2>
                <button 
                  onClick={() => toggleModal('edit', false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SvgElement type={icontypesEnum.CANCEL} />
                </button>
              </div>
            </div>

            <form onSubmit={updateProduct} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Message
                </label>
                <textarea
                  rows={4}
                  defaultValue={selectedProduct?.link_info?.message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter a custom message for this product..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => toggleModal('edit', false)}
                  className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Update Message
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Delete Modal */}
        <Modal
          visible={modals.delete}
          width="90%"
          height="auto"
          effect="fadeInUp"
          onClickAway={() => toggleModal('delete', false)}
          >
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-red-600">Delete Product</h2>
                  <button 
                    onClick={() => toggleModal('delete', false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <SvgElement type={icontypesEnum.CANCEL} />
                  </button>
                </div>
              </div>
  
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTrash className="text-red-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Are you sure?</h3>
                    <p className="text-gray-600 text-sm">This action cannot be undone.</p>
                  </div>
                </div>
  
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-red-800 mb-2">This will permanently:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                      Delete all product data permanently
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                      Remove product from customer view
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                      Break any existing product links
                    </li>
                  </ul>
                </div>
  
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => toggleModal('delete', false)}
                    className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Keep Product
                  </button>
                  <button
                    onClick={deleteProduct}
                    disabled={loading}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Oval height={16} width={16} color="#ffffff" secondaryColor="#ef4444" />
                        <span className="ml-2">Deleting...</span>
                      </div>
                    ) : (
                      'Yes, Delete Product'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
  
          {/* Exceed Limit Modal */}
          <Modal
            visible={modals.exceed}
            width="90%"
            height="auto"
            effect="fadeInUp"
            onClickAway={() => toggleModal('exceed', false)}
          >
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Upgrade Required</h2>
                  <button 
                    onClick={() => toggleModal('exceed', false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <SvgElement type={icontypesEnum.CANCEL} />
                  </button>
                </div>
              </div>
  
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FaStore className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Product Limit Reached</h3>
                    <p className="text-gray-600 text-sm">You've hit your plan's limit</p>
                  </div>
                </div>
  
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    You've reached the maximum number of products allowed on your current plan. 
                    Upgrade to continue adding more products and unlock additional features.
                  </p>
                </div>
  
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => toggleModal('exceed', false)}
                    className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Maybe Later
                  </button>
                  <NavLink
                    to="/subscription"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    Upgrade Now
                  </NavLink>
                </div>
              </div>
            </div>
          </Modal>
  
          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
          />
        </div>
      </div>
    );
  }