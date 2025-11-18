"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import { linkMobileStyle, linkStyle } from "../common/CustomClass";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] text-white shadow-lg px-4 py-4 flex items-center justify-between relative">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-xl p-2 shadow-lg">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className={`${linkStyle} group relative ${
            isActive("/") ? "text-white bg-white/30 rounded-lg px-3 py-2" : ""
          }`}
        >
          <FaHome
            className={`group-hover:scale-110 transition-transform ${
              isActive("/") ? "scale-110" : ""
            }`}
          />
          <span>Home</span>
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></div>
        </Link>

        <Link
          href="/about"
          className={`${linkStyle} group relative ${
            isActive("/about")
              ? "text-white bg-white/30 rounded-lg px-3 py-2"
              : ""
          }`}
        >
          <FaInfoCircle
            className={`group-hover:scale-110 transition-transform ${
              isActive("/about") ? "scale-110" : ""
            }`}
          />
          <span>About</span>
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></div>
        </Link>

        {/* Contact Link */}
        <Link
          href="/contact-us"
          className={`${linkStyle} group relative ${
            isActive("/contact-us")
              ? "text-white bg-white/30 rounded-lg px-3 py-2"
              : ""
          }`}
        >
          <FaPhone
            className={`group-hover:scale-110 transition-transform ${
              isActive("/contact-us") ? "scale-110" : ""
            }`}
          />
          <span>Contact</span>
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive("/contact-us") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></div>
        </Link>
      </div>

      {/* Right Section - User/Auth */}
      <div className="hidden md:flex items-center gap-6">
        {/* User Section */}
        {currentUser ? (
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-colors ${
              isActive("/profile")
                ? "bg-white text-[#68d8ca] border-white shadow-lg"
                : "bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            }`}
          >
            {currentUser.image ? (
              <Image
                src={currentUser.image}
                alt={currentUser.name || "User"}
                width={32}
                height={32}
                className={`h-[30px] w-[30px] rounded-full object-cover border-2 ${
                  isActive("/profile") ? "border-[#68d8ca]" : "border-white"
                } shadow-sm`}
              />
            ) : (
              <FaUserCircle
                className={
                  isActive("/profile") ? "text-[#68d8ca]" : "text-white"
                }
                size={28}
              />
            )}
            <span
              className={`font-medium text-sm ${
                isActive("/profile") ? "text-[#68d8ca]" : "text-white"
              }`}
            >
              {currentUser.name || currentUser.userName}
            </span>
          </Link>
        ) : (
          <Link
            href="/sign-up"
            className={`bg-white text-[#68d8ca] px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              isActive("/sign-up")
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#68d8ca] shadow-lg"
                : "hover:shadow-lg hover:scale-105"
            }`}
          >
            <FaUserCircle size={16} />
            <span>Sign Up</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-white bg-white/20 p-2 rounded-lg backdrop-blur-sm"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col items-start p-6 space-y-4 md:hidden z-50
          transition-all duration-500 ease-in-out border-t border-gray-200
          ${
            menuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
      >
        {/* Navigation Links */}
        <Link
          href="/"
          className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium ${
            isActive("/")
              ? "bg-[#68d8ca] text-white shadow-md"
              : "text-gray-700 hover:bg-[#68d8ca] hover:text-white"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <FaHome />
          Home
        </Link>

        <Link
          href="/about"
          className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium ${
            isActive("/about")
              ? "bg-[#68d8ca] text-white shadow-md"
              : "text-gray-700 hover:bg-[#68d8ca] hover:text-white"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <FaInfoCircle />
          About
        </Link>

        {/* Contact Link */}
        <Link
          href="/contact"
          className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium ${
            isActive("/contact")
              ? "bg-[#68d8ca] text-white shadow-md"
              : "text-gray-700 hover:bg-[#68d8ca] hover:text-white"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <FaPhone />
          Contact
        </Link>

        {/* User Section */}
        <div className="w-full border-t border-gray-200 pt-4 mt-2">
          {currentUser ? (
            <Link
              href="/profile"
              className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium ${
                isActive("/profile")
                  ? "bg-[#68d8ca] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-[#68d8ca] hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {currentUser.image ? (
                <Image
                  src={currentUser.image}
                  alt={currentUser.name || "User"}
                  width={32}
                  height={32}
                  className={`rounded-full object-cover border-2 ${
                    isActive("/profile") ? "border-white" : "border-[#68d8ca]"
                  }`}
                />
              ) : (
                <FaUserCircle
                  className={
                    isActive("/profile") ? "text-white" : "text-[#68d8ca]"
                  }
                  size={24}
                />
              )}
              <span className="font-medium">
                {currentUser.name || currentUser.userName}
              </span>
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className={`w-full py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium justify-center ${
                isActive("/sign-up")
                  ? "bg-[#5bc4b7] text-white shadow-md"
                  : "bg-[#68d8ca] text-white hover:bg-[#5bc4b7]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle />
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
