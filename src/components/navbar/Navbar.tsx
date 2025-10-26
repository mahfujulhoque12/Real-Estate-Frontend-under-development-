"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaInfoCircle,
} from "react-icons/fa";
import { linkMobileStyle, linkStyle } from "../common/CustomClass";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  image?: string; // optional user image URL
}

const user: User = {
  name: "Mahfujul",
  image: "/user.webp",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-nav))] text-[var(--color-text-dark)] shadow-md px-4 py-3 flex items-center justify-between relative">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Middle Section - Search (hidden on mobile) */}
      <div className="hidden md:flex items-center bg-white px-3 py-4 rounded-md w-1/3">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm text-[var(--color-text-dark)]"
        />
      </div>

      {/* Right Section - Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className={linkStyle}>
          <FaHome /> <span>Home</span>
        </Link>
        <Link href="/about" className={linkStyle}>
          <FaInfoCircle /> <span>About</span>
        </Link>
        <Link href="/sign-up" className={linkMobileStyle}>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full object-cover border border-primary-dark h-[28px] w-[28px]"
            />
          ) : (
            <FaUserCircle className="text-[var(--color-text-dark)]" size={32} />
          )}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-[var(--color-text-dark)]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-[80px] left-0 w-full bg-white shadow-md flex flex-col items-start p-4 space-y-4 md:hidden z-50
          transition-opacity duration-500 ease-in-out
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex items-center bg-[var(--color-bg-light)] px-3 py-1 rounded-md w-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm text-[var(--color-text-dark)]"
          />
        </div>
        <Link href="/" className={linkMobileStyle}>
          <FaHome /> Home
        </Link>
        <Link href="/about" className={linkMobileStyle}>
          <FaInfoCircle /> About
        </Link>
        <Link href="/sign-up" className={linkMobileStyle}>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-[var(--color-text-dark)]" size={32} />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
