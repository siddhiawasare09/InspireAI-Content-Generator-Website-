"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

const PaymentPage = () => {
  const PAYMENT_LINK = "https://razorpay.me/@siddhipravinawasare";

  const handlePaymentRedirect = () => {
    window.location.href = PAYMENT_LINK;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Free Plan */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center border-2 border-violet-500 transition-transform hover:scale-105 hover:shadow-xl">
          <FaCheckCircle className="text-green-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Free Plan</h2>
          <p className="text-gray-600 mb-4 text-center">
            Get access to basic features without any cost.
          </p>
          <ul className="list-disc list-inside text-gray-500 mb-6 text-center">
            <li>Access to basic features</li>
            <li>Community support</li>
            <li>Limited usage</li>
          </ul>
          <Button className="px-6 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 hover:shadow-lg transition-all">
            Free
          </Button>
        </div>

        {/* Premium Plan */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center border-2 border-violet-500 transition-transform hover:scale-105 hover:shadow-xl">
          <FaCrown className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Premium Plan</h2>
          <p className="text-gray-600 mb-4 text-center">
            Unlock exclusive premium features for just ₹100.
          </p>
          <ul className="list-disc list-inside text-gray-500 mb-6 text-center">
            <li>Unlimited access</li>
            <li>Priority support</li>
            <li>Advanced features</li>
          </ul>
          <Button
            onClick={handlePaymentRedirect}
            className="px-6 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 hover:shadow-lg transition-all"
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
