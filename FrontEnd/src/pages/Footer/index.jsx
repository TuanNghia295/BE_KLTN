import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterest, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <div className="bg-white text-black border-t-2 py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-bold mb-3">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping and Delivery</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Promotion Exclusions</a>
              </li>
              <li>
                <a href="#">Do Not Sell or Share My Information</a>
              </li>
              <li>
                <a href="#">Transparency in Supply Chain</a>
              </li>
              <li>
                <a href="#">Cookie Settings</a>
              </li>
            </ul>
          </div>

          {/* STORES & SERVICES */}
          <div>
            <h3 className="text-lg font-bold mb-3">STORES & SERVICES</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <a href="#">NYC Flagship Store</a>
              </li>
              <li>
                <a href="#">Las Vegas Flagship Store</a>
              </li>
              <li>
                <a href="#">Store Locator</a>
              </li>
              <li>
                <a href="#">Buy a Gift Card</a>
              </li>
              <li>
                <a href="#">Gift Card Balance</a>
              </li>
              <li>
                <a href="#">Service Discount</a>
              </li>
              <li>
                <a href="#">Student Discount</a>
              </li>
              <li>
                <a href="#">Refer a Friend</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-lg font-bold mb-3">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <a href="#">Company</a>
              </li>
              <li>
                <a href="#">Corporate News</a>
              </li>
              <li>
                <a href="#">Press Center</a>
              </li>
              <li>
                <a href="#">#REFORM</a>
              </li>
              <li>
                <a href="#">Investors</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>

          {/* STAY UP TO DATE & SOCIAL */}
          <div>
            <h3 className="text-lg font-bold mb-3">STAY UP TO DATE</h3>
            <a href="#" className="text-sm text-gray-800 underline">
              Sign Up for Email
            </a>

            <h3 className="text-lg font-bold mt-6 mb-3">EXPLORE</h3>
            <div className="flex gap-3">
              <button className="border border-white px-4 py-1 text-sm rounded">APP</button>
              <button className="border border-white px-4 py-1 text-sm rounded">TRAC</button>
            </div>

            <div className="flex gap-4 mt-6">
              <FaXTwitter className="text-xl cursor-pointer" />
              <FaPinterest className="text-xl cursor-pointer" />
              <FaInstagram className="text-xl cursor-pointer" />
              <FaFacebookF className="text-xl cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Country Selector */}
        <div className="mt-10 flex justify-center items-center">
          <button className="border border-white px-6 py-2 flex items-center gap-2 rounded">VIET NAM</button>
        </div>

        {/* Legal */}
        <div className="text-center text-gray-400 text-sm mt-6">
          © IUH GO VAP, INC. |{' '}
          <a href="#" className="underline">
            IMPRINT AND LEGAL DATA
          </a>{' '}
        </div>
      </div>
    </div>
  );
}
