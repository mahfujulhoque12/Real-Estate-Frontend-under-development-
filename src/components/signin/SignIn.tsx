/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constant/Constant";
import { useDispatch } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "@/app/redux/feature/userSlice";
import Google from "../google/Google";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);
  const dispatch = useDispatch()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(signinStart());
  setMessage(null);
  setLoading(true);

  try {
    const res = await axios.post(`${BASE_URL}/api/signin`, formData, {
      withCredentials: true,
    });

    // Dispatch success
    dispatch(signinSuccess(res.data)); // ✅ use response user data

    setMessage({ type: "success", text: "Signed in successfully!" });
    console.log("Signin successful:", res.data);

    // Reset form
    setFormData({ email: "", password: "" });

    router.push("/");
  } catch (error: any) {
    console.error("Signin failed:", error);
    const errorMsg =
      error.response?.data?.message || "Signin failed. Please try again.";
    dispatch(signinFailure(errorMsg));
    setMessage({ type: "error", text: errorMsg });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        {message && (
          <div
            className={`mb-4 text-center p-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Signin Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Signin Button */}
           <button
            type="submit"
            disabled={loading}
            className={`"w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark w-full duration-500 hover:shadow-md transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "loadin..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signin */}
    <Google/>

        {/* Redirect to Signup */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
