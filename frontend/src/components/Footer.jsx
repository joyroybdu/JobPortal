import React from 'react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
} from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-3">Job Hunter</h2>
          <p className="text-sm text-gray-600">
            Building better opportunities through meaningful jobs. Explore careers, connect with companies, and grow your future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/jobs" className="hover:text-blue-600 transition">Jobs</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-blue-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-blue-700 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-black transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {year} Job Hunter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
