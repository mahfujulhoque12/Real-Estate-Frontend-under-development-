import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaCity,
  FaTree,
  FaSwimmingPool,
  FaCar,
  FaShieldAlt,
} from "react-icons/fa";
import { MdApartment, MdSecurity, MdLocalOffer } from "react-icons/md";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient circles */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#68d8ca] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#c5eee1] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-[#68d8ca] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-500"></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4">
          <div className="w-12 h-12 border-4 border-[#68d8ca] rotate-45 opacity-40"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <div className="w-8 h-8 border-2 border-[#c5eee1] rounded-full opacity-30"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-12">
          {/* Main Heading */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-[#c5eee1] px-6 py-3 rounded-full border border-[#68d8ca]">
              <MdLocalOffer className="text-[#68d8ca] text-xl" />
              <span className="text-gray-700 font-semibold">
                Discover Your Dream Property
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#68d8ca] to-[#c5eee1]">
                Perfect Home
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience luxury living with our curated collection of premium
              properties. From modern apartments to spacious villas, find the
              perfect space that matches your lifestyle.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-8">
            {[
              { number: "500+", label: "Premium Properties", icon: FaHome },
              { number: "50+", label: "Luxury Locations", icon: FaCity },
              {
                number: "98%",
                label: "Client Satisfaction",
                icon: FaShieldAlt,
              },
              { number: "10+", label: "Years Experience", icon: MdSecurity },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-white to-[#c5eee1] p-6 rounded-2xl shadow-lg border border-[#68d8ca]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaTree,
                  title: "Green Spaces",
                  description:
                    "Properties surrounded by nature and eco-friendly environments",
                  color: "from-green-400 to-emerald-400",
                },
                {
                  icon: FaSwimmingPool,
                  title: "Luxury Amenities",
                  description:
                    "Premium facilities including pools, gyms, and community spaces",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  icon: FaCar,
                  title: "Smart Parking",
                  description:
                    "Advanced parking solutions with security and convenience",
                  color: "from-purple-400 to-pink-400",
                },
              ].map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <feature.icon className="text-white text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto pt-12">
            <div className="bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Find Your Dream Home?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied customers who found their perfect
                  property with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={"/show-listing"}
                    className="bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Browse Properties
                  </Link>
                  <Link
                    href={"/contact-us"}
                    className="border-2 border-[#68d8ca] text-[#68d8ca] px-8 py-4 rounded-xl font-semibold hover:bg-[#c5eee1] transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 right-20">
        <div className="w-6 h-6 bg-[#68d8ca] rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-40 left-20">
        <div className="w-4 h-4 bg-[#c5eee1] rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Hero;
