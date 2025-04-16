import React from 'react';
import Logo from './masha_industries';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-10">
      <div className='bg-slate-600 w-full h-[1px]'></div>
      <div className="container mx-auto p-5">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <a href="/" className="flex items-center mb-4">
              <Logo w={90} h={60} />
              <span className="ml-3 text-xl font-semibold text-gray-900">MashaIndustries</span>
            </a>
            <p className="text-sm text-gray-500">
              Your one-stop shop for innovative products and exceptional service.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm hover:text-red-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="text-sm hover:text-red-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:text-red-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-red-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-sm hover:text-red-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-sm hover:text-red-600 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-sm hover:text-red-600 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="/support" className="text-sm hover:text-red-600 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-500 mb-2">Subscribe to our newsletter</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-500 hover:text-blue-400 cursor-pointer transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-500 hover:text-pink-600 cursor-pointer transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-500 hover:text-blue-800 cursor-pointer transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © 2025 MashaIndustries. All Rights Reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex gap-6">
            <a href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-red-600 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;