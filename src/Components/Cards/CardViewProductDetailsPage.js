import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-awesome-modal';
import { AdminApis } from "../../apis/adminApi";
import {
  FaWhatsapp,
  FaArrowLeft,
  FaShare,
  FaShoppingCart,
  FaStore,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaLock,
  FaMinus,
  FaPlus,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaHome,
  FaShoppingBag,
  FaCheckCircle
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
  const [quantity, setQuantity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      product_qty: paymentForm.quantity + '',
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
  const storeName = data?.link_name?.replace(/-/g, ' ');

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
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <Oval height={64} width={64} color="#2563EB" secondaryColor="#E5E7EB" strokeWidth={3} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Product</h3>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header
        className={`transition-all duration-300 ${isScrolled ? 'sticky top-0 z-50 shadow-md' : 'relative'
          }`}
        style={{ backgroundColor: theme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left - Back & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <FaArrowLeft size={18} />
              </button>

              <NavLink to={`/s/${data?.link_name}`} className="flex items-center space-x-3">
                {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                  <img
                    src={marketInfo.brand_logo}
                    alt="Store Logo"
                    className="w-10 h-10 object-contain rounded-lg bg-white p-1"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-white/20">
                    <FaStore size={16} />
                  </div>
                )}
                <div className="hidden sm:block">
                  <h1 className="font-semibold text-white capitalize">{storeName}</h1>
                  <p className="text-xs text-white/70">View all products</p>
                </div>
              </NavLink>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={shareProduct}
                className="p-2.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                title="Share product"
              >
                <FaShare size={16} />
              </button>

              {marketInfo?.phone_number && (
                <a
                  href={`${configs?.baseRedirect}/${marketInfo.phone_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <FaWhatsapp size={16} className="text-green-500" />
                  <span>Contact Store</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <NavLink to={`/s/${data?.link_name}`} className="text-gray-500 hover:text-gray-900 transition-colors flex items-center">
              <FaHome size={14} />
            </NavLink>
            <span className="text-gray-300">/</span>
            <NavLink to={`/s/${data?.link_name}`} className="text-gray-500 hover:text-gray-900 transition-colors capitalize">
              {storeName}
            </NavLink>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px] capitalize">{data?.product_name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-square relative">
                {productImages.length > 0 ? (
                  <>
                    <img
                      src={productImages[currentImageIndex]}
                      alt={data?.product_name}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                        >
                          <FaChevronLeft size={14} className="text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                        >
                          <FaChevronRight size={14} className="text-gray-700" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-black/60 text-white text-sm rounded-full font-medium">
                        {currentImageIndex + 1} / {productImages.length}
                      </div>
                    )}

                    {/* Sale Badge */}
                    {data?.no_of_items && parseFloat(data.no_of_items) < parseFloat(data.product_price) && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                        SALE
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <FaShoppingBag className="mx-auto text-gray-300 text-6xl mb-4" />
                      <p className="text-gray-400">No image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                        ? 'ring-2 ring-offset-2'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    style={{
                      borderColor: index === currentImageIndex ? theme.primary : undefined,
                      '--tw-ring-color': index === currentImageIndex ? theme.primary : undefined
                    }}
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

          {/* Product Details Section */}
          <div className="space-y-6">

            {/* Product Title & Price Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Categories */}
              {(data?.category || data?.location) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {data?.category && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {data.category}
                    </span>
                  )}
                  {data?.location && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={10} />
                      {data.location}
                    </span>
                  )}
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 capitalize">
                {data?.product_name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline flex-wrap gap-3 mb-6">
                <span
                  className="text-3xl font-bold"
                  style={{ color: theme.primary }}
                >
                  {formatPrice(data?.product_price)}
                </span>
                {data?.no_of_items && parseFloat(data.no_of_items) < parseFloat(data.product_price) && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(data.no_of_items)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      {Math.round((1 - parseFloat(data.product_price) / parseFloat(data.no_of_items)) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-16 text-center font-semibold text-lg border-x border-gray-200">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    Total: <span className="font-bold text-lg" style={{ color: theme.primary }}>
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
                  <FaShoppingCart size={18} />
                  <span>Buy Now - {formatPrice(data?.product_price * quantity)}</span>
                </button>

                <a
                  href={`${configs?.baseRedirect}/${data?.phone_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <FaWhatsapp size={18} />
                  <span>Chat with Seller</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <FaShieldAlt className="text-green-600" size={18} />
                  </div>
                  <p className="text-xs font-medium text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% Protected</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <FaTruck className="text-blue-600" size={18} />
                  </div>
                  <p className="text-xs font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Quick Shipping</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <FaUndo className="text-purple-600" size={18} />
                  </div>
                  <p className="text-xs font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">Hassle Free</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            {data?.product_description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {data.product_description}
                </p>
              </div>
            )}

            {/* Store Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sold by</h3>
              <NavLink
                to={`/s/${data?.link_name}`}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                {marketInfo?.brand_logo && marketInfo.brand_logo !== 'no image' ? (
                  <img
                    src={marketInfo.brand_logo}
                    alt="Store Logo"
                    className="w-14 h-14 object-contain rounded-xl border border-gray-200"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaStore size={22} />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 capitalize">{storeName}</h4>
                    <FaCheckCircle className="text-blue-500" size={14} />
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                    View all products →
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
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
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                {marketInfo?.brand_description || 'Your trusted destination for quality products at great prices.'}
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
                {data?.phone_number && (
                  <a
                    href={`${configs?.baseRedirect}/${data.phone_number}`}
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
                  <NavLink to={`/s/${data?.link_name}`} className="text-gray-400 hover:text-white transition-colors">
                    All Products
                  </NavLink>
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

            {/* Contact */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Contact</h5>
              <ul className="space-y-3">
                {data?.phone_number && (
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaPhoneAlt size={14} />
                    <span>{data.phone_number}</span>
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
                © {new Date().getFullYear()} <span className="capitalize">{storeName}</span>. All rights reserved.
              </p>
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

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <a
            href={`${configs?.baseRedirect}/${data?.phone_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0"
          >
            <FaWhatsapp size={22} />
          </a>
          <button
            onClick={() => {
              setPaymentForm(prev => ({ ...prev, quantity }));
              setPaymentModal(true);
            }}
            className="flex-1 h-14 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            style={{ backgroundColor: theme.primary }}
          >
            <FaShoppingCart size={16} />
            <span>Buy Now - {formatPrice(data?.product_price * quantity)}</span>
          </button>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-24"></div>

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
              {productImages[0] ? (
                <img
                  src={productImages[0]}
                  alt={data?.product_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FaShoppingBag className="text-gray-400" size={24} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{data?.product_name}</h3>
                <p className="text-lg font-bold" style={{ color: theme.primary }}>
                  {formatPrice(data?.product_price)}
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
                <span className="font-medium">{formatPrice(data?.product_price || 0)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">× {paymentForm.quantity}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold" style={{ color: theme.primary }}>
                    {formatPrice((data?.product_price || 0) * paymentForm.quantity)}
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
              <span>Pay {formatPrice((data?.product_price || 0) * paymentForm.quantity)}</span>
            </button>
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
      />
    </div>
  );
}