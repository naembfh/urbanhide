import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" text-gray-500 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-gray-100 mb-2">
              <Link href="/">Urban Hide</Link>
            </h1>
            <p className="text-sm text-gray-400">
              Premium quality animal-inspired products for your urban lifestyle.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-gray-100">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-100">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-100">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              Follow Us
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-100"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-100"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-100"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Urban Hide. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
