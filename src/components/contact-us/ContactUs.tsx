import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="text-[#68d8ca]">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&lsquo;re here to help you find your dream property. Reach out to
            us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] rounded-2xl flex items-center justify-center">
                    <FaPhone className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Call Us
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+11234567890"
                      className="block text-2xl font-bold text-gray-800 hover:text-[#68d8ca] transition-colors duration-200"
                    >
                      +1 (123) 456-7890
                    </a>
                    <a
                      href="tel:+19876543210"
                      className="block text-xl text-gray-600 hover:text-[#68d8ca] transition-colors duration-200"
                    >
                      +1 (987) 654-3210
                    </a>
                    <p className="text-gray-500 text-sm mt-3">
                      Available Monday to Friday, 9AM - 6PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] rounded-2xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Email Us
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="mailto:support@realestate.com"
                      className="block text-xl text-gray-800 hover:text-[#68d8ca] transition-colors duration-200 break-all"
                    >
                      support@realestate.com
                    </a>
                    <a
                      href="mailto:sales@realestate.com"
                      className="block text-lg text-gray-600 hover:text-[#68d8ca] transition-colors duration-200 break-all"
                    >
                      sales@realestate.com
                    </a>
                    <p className="text-gray-500 text-sm mt-3">
                      We typically respond within 2 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] rounded-2xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Visit Our Office
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        Main Office
                      </p>
                      <p className="text-gray-600">
                        123 Business Avenue, Suite 100
                      </p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                    <div className="pt-3">
                      <p className="text-lg font-semibold text-gray-800">
                        Branch Office
                      </p>
                      <p className="text-gray-600">456 Corporate Boulevard</p>
                      <p className="text-gray-600">Los Angeles, CA 90210</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info & Social */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-gradient-to-br from-[#68d8ca] to-[#c5eee1] rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <FaClock className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="font-semibold">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="font-semibold">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Connect */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Connect
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/11234567890"
                  className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="font-semibold">WhatsApp</span>
                </a>
                <a
                  href="https://t.me/realestate"
                  className="flex items-center justify-center gap-3 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                >
                  <FaTelegram className="text-xl" />
                  <span className="font-semibold">Telegram</span>
                </a>
                <a
                  href="https://linkedin.com/company/realestate"
                  className="flex items-center justify-center gap-3 bg-blue-700 text-white py-4 px-6 rounded-xl hover:bg-blue-800 transition-all duration-300 hover:scale-105"
                >
                  <FaLinkedin className="text-xl" />
                  <span className="font-semibold">LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/realestate"
                  className="flex items-center justify-center gap-3 bg-sky-500 text-white py-4 px-6 rounded-xl hover:bg-sky-600 transition-all duration-300 hover:scale-105"
                >
                  <FaTwitter className="text-xl" />
                  <span className="font-semibold">Twitter</span>
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-2xl shadow-lg p-8 border border-red-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Emergency Contact
                </h3>
                <p className="text-gray-600 mb-4">After hours urgent matters</p>
                <a
                  href="tel:+11234567890"
                  className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  +1 (123) 555-HELP
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our team of expert agents is ready to assist you with all your
              real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+11234567890"
                className="bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaPhone />
                Call Now
              </a>
              <a
                href="mailto:info@realestate.com"
                className="border-2 border-[#68d8ca] text-[#68d8ca] px-8 py-4 rounded-xl font-semibold hover:bg-[#c5eee1] hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaEnvelope />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
