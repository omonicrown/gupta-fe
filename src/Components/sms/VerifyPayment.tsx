import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SmsWalletApis } from "../../apis/smsApis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This component handles payment verification after redirect from Flutterwave
export default function VerifyPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "failed" | "verifying">("verifying");
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const txRef = query.get("tx_ref");
    const status = query.get("status");
    
    if (txRef && status) {
      verifyPayment(txRef, status);
    } else {
      // No query params found, redirect to SMS wallet
      navigate("/sms-wallet");
    }
  }, [location]);
  
  const verifyPayment = async (txRef: string, paymentStatus: string) => {
    if (paymentStatus !== "successful") {
      setStatus("failed");
      setLoading(false);
      return;
    }
    
    try {
      const response = await SmsWalletApis.verifyPayment(txRef);
      
      if (response?.data?.verified) {
        setStatus("success");
        toast.success("Payment successful! Your wallet has been credited.");
      } else {
        setStatus("failed");
        toast.error("Payment verification failed. Please contact support.");
      }
    } catch (error: any) {
      setStatus("failed");
      toast.error(error?.response?.data?.message || "An error occurred during payment verification");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Your Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your transaction...</p>
          </div>
        ) : status === "success" ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your SMS wallet has been credited successfully.</p>
            <button
              onClick={() => navigate("/sms-wallet")}
              className="bg-[#0071BC] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Go to SMS Wallet
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-6">We couldn't verify your payment. Please contact support if you believe this is an error.</p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => navigate("/sms-wallet")}
                className="bg-[#0071BC] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
              >
                Return to SMS Wallet
              </button>
              <button
                onClick={() => navigate("/support")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}