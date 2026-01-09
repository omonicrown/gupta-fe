import React, { useState, useEffect, useCallback } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import configs from "../../configs";
import Modal from 'react-awesome-modal';
import {
  FaWhatsapp,
  FaCreditCard,
  FaStore,
  FaSearch,
  FaShoppingBag,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaEye,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaPercent,
  FaChevronDown,
  FaThLarge,
  FaList,
  FaTimes,
  FaCheck,
  FaLock,
  FaHeart,
  FaShareAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { PhoneInput } from "react-contact-number-input";
import { Oval } from 'react-loader-spinner';
import { PaymentApis } from "../../apis/paymentApis";

export default function CardViewProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [data, setData] = useState([]);
  const [marketInfo, setMarketInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [isScrolled, setIsScrolled] = useState(false);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    quantity: 1
  });

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle payment callback
  useEffect(() => {
    if (searchParams.get('status') === 'cancelled') {
      navigate(`/s/${params?.storeId}`);
    }

    if (searchParams.get('tx_ref')) {
      PaymentApis.getProdutCallback(searchParams.get('tx_ref')).then(
        (response) => {
          if (response?.data?.success === true) {
            if (response?.data?.data?.status === 'successful') {
              navigate(`/s/${params?.storeId}`);
              toast.success('Payment successful!');
            } else {
              toast.error('Payment failed');
            }
          }
        }
      ).catch(error => console.log(error));
    }
  }, [searchParams, params, navigate]);

  // Fetch store data
  useEffect(() => {
    fetchStoreData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = data?.products?.data || [];

    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => parseFloat(b.product_price) - parseFloat(a.product_price));
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.product_name.localeCompare(b.product_name));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, data, sortBy]);

  const fetchStoreData = async (page = '') => {
    try {
      setLoading(true);
      const response = await AdminApis.getProductByLinkName(params?.storeId, page);
      if (response?.data) {
        setData(response.data.data);
        setMarketInfo(response.data.data.market_info);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = useCallback((page) => {
    fetchStoreData(page);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentData = {
      user_id: selectedProduct?.user_id,
      amount: (selectedProduct?.product_price * paymentForm.quantity),
      customer_full_name: paymentForm.fullName,
      product_qty: paymentForm.quantity,
      pay_for: selectedProduct?.product_name,
      store_id: params?.storeId,
      customer_email: paymentForm.email,
      customer_phone_number: paymentForm.phoneNumber?.countryCode + paymentForm.phoneNumber?.phoneNumber
    };

    try {
      const response = await PaymentApis.payForProduct(paymentData);
      if (response?.data?.success) {
        window.location.replace(response.data.data.data.link);
        setPaymentModal(false);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price || 0);
  };

  const getStoreTheme = () => ({
    primary: marketInfo?.brand_primary_color || '#2563EB',
    primaryLight: marketInfo?.brand_primary_color ? `${marketInfo.brand_primary_color}15` : '#EFF6FF',
    primaryDark: marketInfo?.brand_primary_color || '#1D4ED8'
  });

  const theme = getStoreTheme();
  const storeName = params?.storeId?.replace(/-/g, ' ');

  // Loading state
  if (loading && !data?.products) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <Oval height={64} width={64} color={theme.primary} secondaryColor="#E5E7EB" strokeWidth={3} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Store</h3>
          <p className="text-gray-500">Setting up your shopping experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Announcement Bar */}
      <div
        className="py-2.5 text-center text-white text-sm font-medium"
        style={{ backgroundColor: theme.primary }}
      >
        <FaTruck className="inline mr-2" size={14} />
        Shop now and save!
      </div>

      {/* Main Header */}
      <header
        className={`bg-white transition-all duration-300 ${isScrolled ? 'sticky top-0 z-50 shadow-md' : 'relative'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Header */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            {/* Logo & Store Name */}
            <div className="flex items-center space-x-3">
              {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                <img
                  src={marketInfo.brand_logo}
                  alt="Store Logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: theme.primary }}
                >
                  <FaStore size={20} />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{storeName}</h1>
                <p className="text-xs text-gray-500">Official Store</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200"
                  style={{ focusRing: theme.primary }}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Contact Button */}
            {marketInfo?.phone_number && (
              <a
                href={`${configs?.baseRedirect}/${marketInfo.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-medium"
              >
                <FaWhatsapp size={18} />
                <span>Contact Us</span>
              </a>
            )}
          </div>

          {/* Mobile Search */}
          <div className="md:hidden py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to <span className="capitalize">{storeName}</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {marketInfo?.brand_description || 'Discover amazing products at unbeatable prices. Quality guaranteed.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#products"
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Shop Now
              </a>
              {marketInfo?.phone_number && (
                <a
                  href={`${configs?.baseRedirect}/${marketInfo.phone_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  <FaWhatsapp className="inline mr-2" />
                  Chat with Us
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center justify-center space-x-3 py-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaTruck className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Fast Delivery</p>
                <p className="text-xs text-gray-500">Quick & reliable</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 py-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaShieldAlt className="text-green-600" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 py-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FaHeadset className="text-purple-600" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">24/7 Support</p>
                <p className="text-xs text-gray-500">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 py-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <FaPercent className="text-orange-600" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Best Prices</p>
                <p className="text-xs text-gray-500">Guaranteed value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header with Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Our Products</h3>
            <p className="text-gray-500 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                  }`}
              >
                <FaThLarge size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                  }`}
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1'
            }`}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                  }`}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                  }`}>
                  {product.product_image_1 ? (
                    <img
                      src={product.product_image_1}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FaShoppingBag size={48} />
                    </div>
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <NavLink
                      to={`/storedetails/${product.id}`}
                      className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <FaEye className="inline mr-2" size={14} />
                      View Details
                    </NavLink>
                  </div>

                  {/* Badge */}
                  {product.no_of_items && parseFloat(product.no_of_items) < parseFloat(product.product_price) && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <NavLink to={`/storedetails/${product.id}`}>
                      <h4 className="font-semibold text-gray-900 mb-2 capitalize line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.product_name}
                      </h4>
                    </NavLink>

                    {viewMode === 'list' && product.product_description && (
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {product.product_description}
                      </p>
                    )}

                    <div className="flex items-center space-x-2 mb-4">
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.primary }}
                      >
                        {formatPrice(product.product_price)}
                      </span>
                      {product.no_of_items && parseFloat(product.no_of_items) < parseFloat(product.product_price) && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.no_of_items)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`space-y-2 ${viewMode === 'list' ? 'flex space-y-0 space-x-2' : ''}`}>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setPaymentForm(prev => ({ ...prev, quantity: 1 }));
                        setPaymentModal(true);
                      }}
                      className={`w-full py-2.5 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg ${viewMode === 'list' ? 'w-auto px-6' : ''
                        }`}
                      style={{ backgroundColor: theme.primary }}
                    >
                      Buy Now
                    </button>

                    <a
                      href={`${configs?.baseRedirect}/${product.phone_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-2.5 text-center text-green-600 bg-green-50 rounded-xl font-medium hover:bg-green-100 transition-colors ${viewMode === 'list' ? 'w-auto px-6' : ''
                        }`}
                    >
                      <FaWhatsapp className="inline mr-1" size={14} />
                      Chat
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBag className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back soon for new products!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {data?.products?.links && data.products.links.length > 3 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              {data.products.links.map((link, index) => {
                const isNav = link.label === 'Next &raquo;' || link.label === '&laquo; Previous';
                const label = link.label === '&laquo; Previous'
                  ? '←'
                  : link.label === 'Next &raquo;'
                    ? '→'
                    : link.label;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isNav) {
                        const page = link.url?.charAt(link.url.length - 1);
                        handlePageChange(page);
                      } else if (!isNaN(link.label)) {
                        handlePageChange(link.label);
                      }
                    }}
                    disabled={link.active || !link.url}
                    className={`min-w-[40px] h-10 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${link.active
                      ? 'text-white shadow-md'
                      : link.url
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-300 cursor-not-allowed'
                      }`}
                    style={{
                      backgroundColor: link.active ? theme.primary : 'transparent'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Store Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                  <img
                    src={marketInfo.brand_logo}
                    alt="Store Logo"
                    className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaStore size={20} />
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-bold capitalize">{storeName}</h4>
                  <p className="text-gray-400 text-sm">Official Store</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {marketInfo?.brand_description || 'Your trusted destination for quality products. We deliver excellence with every order.'}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {marketInfo?.facebook_url && (
                  <a
                    href={marketInfo.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebook size={18} />
                  </a>
                )}
                {marketInfo?.instagram_url && (
                  <a
                    href={marketInfo.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}
                {marketInfo?.tiktok_url && (
                  <a
                    href={marketInfo.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTiktok size={18} />
                  </a>
                )}
                {marketInfo?.phone_number && (
                  <a
                    href={`${configs?.baseRedirect}/${marketInfo.phone_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Quick Links</h5>
              <ul className="space-y-3">
                <li>
                  <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Get in Touch</h5>
              <ul className="space-y-3">
                {marketInfo?.phone_number && (
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaPhoneAlt size={14} />
                    <span>{marketInfo.phone_number}</span>
                  </li>
                )}
                {marketInfo?.email && (
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaEnvelope size={14} />
                    <span>{marketInfo.email}</span>
                  </li>
                )}
                {marketInfo?.address && (
                  <li className="flex items-start space-x-3 text-gray-400">
                    <FaMapMarkerAlt size={14} className="mt-1" />
                    <span>{marketInfo.address}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} {storeName}. All rights reserved.
              </p>

              {/* Powered by Gupta */}
              <a
                href="https://www.mygupta.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm">Powered by</span>
                <span className="font-bold text-white">Gupta</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <Modal
        visible={paymentModal}
        width="450"
        height="600"
        effect="fadeInUp"
        onClickAway={() => setPaymentModal(false)}
      >
        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden">
          {/* Modal Header */}
          <div
            className="p-5 text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Checkout</h2>
                <p className="text-white/80 text-sm mt-1">Complete your purchase</p>
              </div>
              <button
                onClick={() => setPaymentModal(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Product Summary */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl mb-6">
              {selectedProduct?.product_image_1 ? (
                <img
                  src={selectedProduct.product_image_1}
                  alt={selectedProduct.product_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FaShoppingBag className="text-gray-400" size={24} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{selectedProduct?.product_name}</h3>
                <p className="text-lg font-bold" style={{ color: theme.primary }}>
                  {formatPrice(selectedProduct?.product_price)}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={paymentForm.fullName}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={paymentForm.email}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <PhoneInput
                  required
                  countryCode="ng"
                  onChange={(phone) => setPaymentForm(prev => ({ ...prev, phoneNumber: phone }))}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setPaymentForm(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold text-lg">{paymentForm.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setPaymentForm(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(selectedProduct?.product_price || 0)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">× {paymentForm.quantity}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold" style={{ color: theme.primary }}>
                    {formatPrice((selectedProduct?.product_price || 0) * paymentForm.quantity)}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 mt-4 text-gray-500 text-sm">
              <FaLock size={12} />
              <span>Secured by Flutterwave</span>
            </div>
          </div>

          {/* Fixed Footer */}
          <form onSubmit={handlePayment} className="flex-shrink-0 p-5 border-t border-gray-100 bg-white">
            <button
              type="submit"
              className="w-full py-4 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              style={{ backgroundColor: theme.primary }}
            >
              <FaLock size={14} />
              <span>Pay {formatPrice((selectedProduct?.product_price || 0) * paymentForm.quantity)}</span>
            </button>
          </form>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}