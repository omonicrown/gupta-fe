import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-awesome-modal';
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { 
  FaWhatsapp, 
  FaArrowLeft, 
  FaHeart, 
  FaShare, 
  FaShoppingCart,
  FaCreditCard,
  FaStore,
  FaTag,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { PhoneInput } from "react-contact-number-input";
import { Oval } from 'react-loader-spinner';
import configs from "../../configs";
import { PaymentApis } from "../../apis/paymentApis";

export default function CardEditProduct() {
  const navigate = useNavigate();
  const params = useParams();

  // State management
  const [data, setData] = useState({});
  const [marketInfo, setMarketInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    quantity: 1
  });

  // Product images
  const productImages = [
    data?.product_image_1,
    data?.product_image_2,
    data?.product_image_3
  ].filter(img => img && img !== 'no image');

  useEffect(() => {
    fetchProductData();
  }, [params.storeId]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await AdminApis.getSingleProductOutside(params?.storeId);
      if (response?.data) {
        setData(response.data.data.product);
        setMarketInfo(response.data.data.market_info);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    const paymentData = {
      user_id: data?.user_id,
      amount: (data?.product_price * paymentForm.quantity),
      customer_full_name: paymentForm.fullName,
      product_qty: paymentForm.quantity+'',
      pay_for: data?.product_name,
      store_id: data?.link_name,
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
    primaryLight: marketInfo?.brand_primary_color ? `${marketInfo.brand_primary_color}20` : '#EFF6FF',
    primaryDark: marketInfo?.brand_primary_color || '#1D4ED8'
  });

  const theme = getStoreTheme();

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data?.product_name,
          text: data?.product_description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Oval height={40} width={40} color="#2563EB" secondaryColor="#93C5FD" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Product</h3>
          <p className="text-gray-600">Please wait while we load the product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Back */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaArrowLeft size={18} />
              </button>
              
              {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                <img 
                  src={marketInfo.brand_logo} 
                  alt="Store Logo"
                  className="w-10 h-10 object-cover rounded-lg"
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <FaStore size={16} />
                </div>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-3">
              {/* <button 
                onClick={toggleWishlist}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <FaHeart size={16} />
              </button> */}
              
              {/* <button 
                onClick={shareProduct}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
              >
                <FaShare size={16} />
              </button> */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="aspect-square relative">
                {productImages.length > 0 ? (
                  <>
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt={data?.product_name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-6xl text-gray-200 font-bold opacity-30 select-none">
                        Gupta
                      </span>
                    </div>

                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <FaChevronLeft size={16} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <FaChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <FaStore className="mx-auto text-gray-400 text-6xl mb-4" />
                      <p className="text-gray-500">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${data?.product_name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 capitalize">
                {data?.product_name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold" style={{ color: theme.primary }}>
                  {formatPrice(data?.product_price)}
                </span>
                
                {data?.no_of_items && parseFloat(data.no_of_items) < parseFloat(data.product_price) && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(data.no_of_items)}
                  </span>
                )}
              </div>

              {/* Product Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 127 reviews</span>
              </div>

              {/* Product Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {data?.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <FaTag className="inline mr-1" size={12} />
                    {data.category}
                  </span>
                )}
                {data?.location && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <FaMapMarkerAlt className="inline mr-1" size={12} />
                    {data.location}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  Total: <span className="font-bold" style={{ color: theme.primary }}>
                    {formatPrice(data?.product_price * quantity)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setPaymentForm(prev => ({ ...prev, quantity }));
                  setPaymentModal(true);
                }}
                className="w-full py-4 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
                style={{ backgroundColor: theme.primary }}
              >
                <FaShoppingCart size={20} />
                <span>Buy Now</span>
              </button>

              <a
                href={`${configs?.baseRedirect}/${data?.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-3"
              >
                <FaWhatsapp size={20} />
                <span>Contact Vendor</span>
              </a>
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Why Choose This Product?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-green-600" size={14} />
                  </div>
                  <span className="text-gray-700">Secure payment guaranteed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaTruck className="text-blue-600" size={14} />
                  </div>
                  <span className="text-gray-700">Fast delivery available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaUndo className="text-purple-600" size={14} />
                  </div>
                  <span className="text-gray-700">Easy returns policy</span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {data?.product_description || 'No description available for this product.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Payment Modal */}
      <Modal
        visible={paymentModal}
        // width="90%"
        // height="90%"
        maxHeight="60%"
        effect="fadeInUp"
        onClickAway={() => setPaymentModal(false)}
      >
        <div className="max-w-lg mx-auto  rounded-2xl shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div 
            className="p-6 text-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Complete Your Purchase</h2>
                <p className="text-white/80 text-sm">Secure checkout for {data?.product_name}</p>
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
              <div className="flex items-center space-x-4">
                {productImages[0] && (
                  <img 
                    src={productImages[0]} 
                    alt={data?.product_name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{data?.product_name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-bold" style={{ color: theme.primary }}>
                      {formatPrice(data?.product_price)}
                    </span>
                  </div>
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-6 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(data?.product_price || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">×{paymentForm.quantity}</span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                      {formatPrice((data?.product_price || 0) * paymentForm.quantity)}
                    </span>
                  </div>
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
                <span>Pay Now</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      />
    </div>
  );
}