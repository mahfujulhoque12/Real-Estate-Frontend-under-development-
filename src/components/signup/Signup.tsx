"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "@/constant/Constant";
import { useRouter } from "next/navigation";
import Google from "../google/Google";

interface SignupForm {
  userName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupForm>({
    userName: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${BASE_URL}/api/signup`, formData);
      setMessage({ type: "success", text: "Account created successfully!" });
      console.log("Signup successful:", res.data);

      // Reset form
      setFormData({ userName: "", email: "", password: "" });
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Signup failed:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Message */}
        {message && (
          <div
            className={`text-center mb-4 py-2 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-3.5 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className={`"w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark w-full duration-500 hover:shadow-md transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
   <Google/> 

        {/* Redirect to Sign in */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
