import React, { useState, useEffect, useCallback } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import configs from "../../configs";
import Modal from 'react-awesome-modal';
import {
  FaWhatsapp,
  FaShoppingCart,
  FaCreditCard,
  FaStore,
  FaHeart,
  FaShare,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaSearch,
  FaShoppingBag,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaEye,
  FaStar,
  FaUsers,
  FaBox
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
  const [favorites, setFavorites] = useState([]);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    quantity: 1
  });

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

  // Filter products based on search
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = data?.products?.data?.filter(product =>
        product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered || []);
    } else {
      setFilteredProducts(data?.products?.data || []);
    }
  }, [searchTerm, data]);

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

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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

  // Loading state
  if (loading && !data?.products) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Oval height={40} width={40} color="#2563EB" secondaryColor="#93C5FD" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Store</h3>
          <p className="text-gray-600">Please wait while we prepare your shopping experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
     

      {/* Store Banner */}
      <div
        className="relative py-8 text-white overflow-hidden md:flex block"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="flex items-center md:pl-10  justify-center   ">
          <div className="relative">
            {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
              <img
                src={marketInfo.brand_logo}
                alt="Store Logo"
                className="w-16 h-16 object-cover rounded-xl shadow-lg border-2 border-white"
              />
            ) : (
              <div
                className="w-16 h-16 rounded-xl shadow-lg border bg-blue-400 flex items-center justify-center text-white"
                // style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}
              >
                <FaStore size={24} />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="relative  mx-auto px-4 text-center">
          
          <h2 className="text-3xl font-bold mb-4">
            Welcome to <span className=" capitalize">{params?.storeId?.replace('-', ' ')}</span>
          </h2>
          <p className="text-l text-white/90 max-w-2xl mx-auto">
            {marketInfo?.brand_description || 'Discover amazing products at unbeatable prices. Shop with confidence and style.'}
          </p>

          {/* Store Features */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <FaShoppingBag className="mx-auto mb-2 text-2xl" />
              <h4 className="font-semibold">Quality Products</h4>
              <p className="text-sm text-white/80">Curated selection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <FaCreditCard className="mx-auto mb-2 text-2xl" />
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-sm text-white/80">Safe & reliable</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <FaWhatsapp className="mx-auto mb-2 text-2xl" />
              <h4 className="font-semibold">Quick Support</h4>
              <p className="text-sm text-white/80">24/7 assistance</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-2 py-8">
        {/* Search Section */}

        <div className="flex-1 relative mb-6 max-w-lg">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
          />
        </div>



        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: product.product_image_1
                        ? `url(${product.product_image_1})`
                        : 'none'
                    }}
                  >
                    {!product.product_image_1 && (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <FaShoppingBag size={32} />
                      </div>
                    )}
                  </div>

                  {/* Favorite Button */}
                  {/* <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 ${favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
                      }`}
                  >
                    <FaHeart size={14} />
                  </button> */}

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <NavLink
                      to={`/storedetails/${product.id}`}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg"
                    >
                      <FaEye className="inline mr-2" size={14} />
                      Quick View
                    </NavLink>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className=" capitalize font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {product.product_name}
                  </h3>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.primary }}
                      >
                        {formatPrice(product.product_price)}
                      </span>
                      {product.no_of_items && parseFloat(product.no_of_items) < parseFloat(product.product_price) && (
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrice(product.no_of_items)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <NavLink
                        to={`/storedetails/${product.id}`}
                        className="px-3 py-2 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-xs font-medium"
                      >
                        View
                      </NavLink>

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setPaymentModal(true);
                        }}
                        className="px-3 py-2 text-white rounded-lg transition-all duration-200 text-xs font-medium hover:shadow-lg"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Buy Now
                      </button>
                    </div>

                    <a
                      href={`${configs?.baseRedirect}/${product.phone_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 text-xs font-medium"
                    >
                      <FaWhatsapp className="inline mr-1" size={12} />
                      Contact Vendor
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBag className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'Try adjusting your search terms to find what you\'re looking for' : 'This store will be stocked with amazing products soon!'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {data?.products?.links && data.products.links.length > 3 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2 bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
              {data.products.links.map((link, index) => (
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
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${link.active
                    ? 'text-white shadow-lg'
                    : link.url
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-400 cursor-not-allowed'
                    }`}
                  style={{
                    backgroundColor: link.active ? theme.primary : 'transparent'
                  }}
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
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t-2 border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Store Information */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                  <img
                    src={marketInfo.brand_logo}
                    alt="Store Logo"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaStore size={20} />
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 capitalize">
                    {params?.storeId?.replace('-', ' ')}
                  </h4>
                  <p className="text-gray-600 text-sm">Online Store</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {marketInfo?.brand_description || 'Your trusted destination for quality products at great prices. Shop with confidence and enjoy exceptional customer service.'}
              </p>

              {/* Social Links */}
              {(marketInfo?.facebook_url || marketInfo?.instagram_url || marketInfo?.tiktok_url) && (
                <div className="flex space-x-4">
                  {marketInfo.facebook_url && (
                    <a
                      href={marketInfo.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <FaFacebook size={18} />
                    </a>
                  )}
                  {marketInfo.instagram_url && (
                    <a
                      href={marketInfo.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <FaInstagram size={18} />
                    </a>
                  )}
                  {marketInfo.tiktok_url && (
                    <a
                      href={marketInfo.tiktok_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <FaTiktok size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Powered By Gupta - Enhanced */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaStore className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Powered by Gupta</h4>
                    <p className="text-gray-600 text-sm">Professional E-commerce Solutions</p>
                  </div>
                </div>
                {/* <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Create your own professional online store with advanced features, secure payments, and beautiful designs. Join thousands of successful merchants today.
                </p> */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    Trusted by 10,000+ stores
                  </div>
                  <a target="" href="https://www.mygupta.co" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    Start Your Store
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 {params?.storeId?.replace('-', ' ')}. All rights reserved. |
              <span className="font-medium text-gray-900"> Powered by Gupta</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Payment Modal */}
      <Modal
        visible={paymentModal}
        width="90%"
        height="auto"
        effect="fadeInUp"
        onClickAway={() => setPaymentModal(false)}
      >
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div
            className="p-6 text-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Complete Your Purchase</h2>
                <p className="text-white/80 text-sm">Secure checkout process</p>
              </div>
              <button
                onClick={() => setPaymentModal(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handlePayment} className="p-6">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedProduct?.product_name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unit Price:</span>
                <span className="font-bold" style={{ color: theme.primary }}>
                  {formatPrice(selectedProduct?.product_price)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.fullName}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={paymentForm.quantity}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={paymentForm.email}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <PhoneInput
                  required
                  countryCode="ng"
                  onChange={(phone) => setPaymentForm(prev => ({ ...prev, phoneNumber: phone }))}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-6 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(selectedProduct?.product_price || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">×{paymentForm.quantity}</span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                      {formatPrice((selectedProduct?.product_price || 0) * paymentForm.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-green-800">Secure Payment</h5>
                  <p className="text-sm text-green-700">Your payment information is protected with bank-level security</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={() => setPaymentModal(false)}
                className="flex-1 py-3 px-6 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 py-3 px-8 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                style={{ backgroundColor: theme.primary }}
              >
                <FaCreditCard size={16} />
                <span>Proceed to Payment</span>
              </button>
            </div>
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
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      />
    </div>
  );
}
