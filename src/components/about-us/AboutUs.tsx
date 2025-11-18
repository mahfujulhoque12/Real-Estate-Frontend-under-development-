import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaUsers,
  FaAward,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import {
  MdArchitecture,
  MdWorkspacePremium,
  MdSupportAgent,
} from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8fdfc] to-[#e8f7f5]">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c5eee1] px-6 py-3 rounded-full border border-[#68d8ca] mb-6">
              <FaHome className="text-[#68d8ca] text-lg" />
              <span className="text-gray-700 font-semibold">
                About DreamHome
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Building Dreams,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#68d8ca] to-[#c5eee1]">
                Creating Homes
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over a decade, DreamHome has been transforming the real estate
              landscape, helping thousands of families find their perfect
              sanctuary and investors discover promising opportunities.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "10K+", label: "Happy Families", icon: FaUsers },
              { number: "$2B+", label: "Property Value", icon: FaAward },
              { number: "50+", label: "Cities Covered", icon: MdArchitecture },
              { number: "15+", label: "Years Experience", icon: FaShield },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2008, DreamHome began as a small family business with
                a simple mission: to make property buying and selling a
                transparent, stress-free experience. What started as a local
                real estate agency has grown into a trusted national brand.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our journey has been guided by core values of integrity,
                innovation, and client-first service. We believe that every
                property transaction is not just a business deal, but a
                life-changing moment for our clients.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#68d8ca] rounded-full flex items-center justify-center">
                  <FaHandshake className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Trusted by thousands
                  </p>
                  <p className="text-gray-600 text-sm">Since 2008</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#68d8ca] to-[#c5eee1] rounded-3xl p-8 h-80 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaHome className="text-6xl mb-4 opacity-80" />
                  <p className="text-xl font-semibold">Building Communities,</p>
                  <p className="text-lg">One Home at a Time</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5eee1] rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#68d8ca] rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-20 bg-gradient-to-br from-[#f8fdfc] to-[#e8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every
              relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaShield,
                title: "Trust & Transparency",
                description:
                  "We believe in complete honesty and clear communication throughout your property journey.",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: FaRocket,
                title: "Innovation",
                description:
                  "Leveraging cutting-edge technology to provide you with the best real estate experience.",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: MdSupportAgent,
                title: "Client First",
                description:
                  "Your dreams and needs are at the center of everything we do. Always.",
                color: "from-green-400 to-emerald-400",
              },
            ].map((value, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <value.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DreamHome?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go beyond just buying and selling properties - we build
              relationships that last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MdWorkspacePremium,
                title: "Premium Service",
                description:
                  "Personalized attention from dedicated property experts",
              },
              {
                icon: FaAward,
                title: "Award Winning",
                description:
                  "Recognized for excellence in real estate services",
              },
              {
                icon: FaShield,
                title: "Secure Transactions",
                description: "100% safe and legally compliant property deals",
              },
              {
                icon: FaHandshake,
                title: "Lifetime Support",
                description: "We're here for you even after the deal is done",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#68d8ca] to-[#c5eee1] p-0.5 rounded-2xl group hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-6 h-full group-hover:bg-[#f8fdfc] transition-colors duration-300">
                  <feature.icon className="text-[#68d8ca] text-3xl mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-[#68d8ca] to-[#c5eee1]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their dream homes
            with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/show-listing"}
              className="bg-white text-[#68d8ca] px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Browse Properties
            </Link>
            <Link
              href={"/contact-us"}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#68d8ca] transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
