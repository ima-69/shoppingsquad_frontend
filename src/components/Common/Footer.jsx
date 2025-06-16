import React from "react";
import { Link } from "react-router-dom";
import { TbBrandFacebook } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#12182B] text-[#A9ADC1] py-16 px-4 z-60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-16">
        {/* Newsletter */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5 tracking-wide">
            Newsletter
          </h3>
          <p className="mb-4 leading-relaxed text-base">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="mb-6 text-base">
            Sign up and get{" "}
            <span className="font-semibold text-[#4F46E5]">10% off</span> on your first order.
          </p>
          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 bg-[#252D44] border-none text-white placeholder-[#A9ADC1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-none rounded-l-md"
            />
            <button
              type="submit"
              className="bg-[#4F46E5] text-white px-6 py-3 rounded-r-md font-semibold hover:bg-indigo-600 active:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#4F46E5]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5 tracking-wide">Shop</h3>
          <ul className="space-y-3 text-[#A9ADC1] text-base">
            <li>
              <Link
                to="/collections/all?gender=Men"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?gender=Women"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?category=Top Wear"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?category=Bottom Wear"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5 tracking-wide">Support</h3>
          <ul className="space-y-3 text-[#A9ADC1] text-base">
            <li>
              <Link
                to="#"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#4F46E5] transition-colors duration-300"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us & Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5 tracking-wide">Follow Us</h3>
          <div className="flex items-center space-x-6 mb-6 text-[#A9ADC1]">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4F46E5] transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded"
              aria-label="Facebook"
            >
              <TbBrandFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4F46E5] transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4F46E5] transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded"
              aria-label="Twitter"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <p className="text-[#A9ADC1] font-semibold mb-1">Call Us</p>
          <p className="flex items-center text-[#4F46E5] font-semibold text-lg space-x-2">
            <FiPhoneCall className="inline-block h-5 w-5" />
            <span>0123-456-789</span>
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto border-t border-[#2A2F47] mt-12 pt-6 px-6 select-none">
        <p className="text-[#5B5F7E] text-center text-sm tracking-wide font-light">
          &copy; 2025, Fashion Squad. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
