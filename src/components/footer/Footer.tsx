import React from "react";
import {
  FaHome,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaArrowRight,
  FaAward,
  FaHeadset,
} from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-xl p-2">
                <FaHome className="text-[#68d8ca] text-2xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] bg-clip-text text-transparent">
                DreamHome
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in finding the perfect property. We
              specialize in connecting dreams with reality through exceptional
              real estate services.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FaShield className="text-[#68d8ca]" />
              <span>Trusted Real Estate Agency</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaAward className="text-[#68d8ca]" />
              <span>2024 Best Real Estate Award</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <FaArrowRight className="text-[#68d8ca] text-sm" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Browse Properties", href: "/properties" },
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Blog", href: "/blog" },
                { name: "Careers", href: "/careers" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#68d8ca] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#68d8ca] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <FaHeadset className="text-[#68d8ca] text-sm" />
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#68d8ca] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Business Avenue</p>
                  <p className="text-gray-300">Suite 100, New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#68d8ca] flex-shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-gray-300 hover:text-[#68d8ca] transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#68d8ca] flex-shrink-0" />
                <a
                  href="mailto:info@dreamhome.com"
                  className="text-gray-300 hover:text-[#68d8ca] transition-colors break-all"
                >
                  info@dreamhome.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-[#68d8ca] flex-shrink-0" />
                <a
                  href="https://wa.me/11234567890"
                  className="text-gray-300 hover:text-[#68d8ca] transition-colors"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Social & Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Business Hours
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-[#68d8ca]">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Saturday</span>
                <span className="text-[#68d8ca]">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Sunday</span>
                <span className="text-red-400">Closed</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
                  { icon: FaLinkedin, href: "#", color: "hover:bg-blue-700" },
                  { icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 DreamHome Real Estate. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-[#68d8ca] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-[#68d8ca] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-[#68d8ca] transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-[#68d8ca] transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/11234567890"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce"
        >
          <FaWhatsapp className="text-white text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
