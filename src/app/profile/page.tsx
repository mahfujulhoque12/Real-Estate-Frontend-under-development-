/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrivateRoute from "@/components/private-route/PrivateRoute";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { signout, updateUserSuccess } from "@/app/redux/feature/userSlice";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/constant/Constant";
import Link from "next/link";
import { clearEdit } from "../redux/feature/listingEditSlice";
import { useRouter } from "next/navigation";
import {
  FaUserCircle,
  FaEdit,
  FaSignOutAlt,
  FaTrash,
  FaHome,
  FaList,
  FaEnvelope,
  FaUser,
  FaLock,
  FaCamera,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const ProfilePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: currentUser?.userName || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(currentUser?.image || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCreateNew = () => {
    dispatch(clearEdit());
    router.push("/listing");
  };

  const handleLogout = () => {
    dispatch(signout());
    toast.success("You have been logged out!");
  };

  const handleDelete = async () => {
    if (!currentUser?._id) return;

    toast.warning("Are you sure you want to delete your account?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await axios.delete(`${BASE_URL}/api/user/${currentUser._id}`, {
              withCredentials: true,
            });
            dispatch(signout());
            toast.success("Account deleted successfully!");
          } catch (err) {
            console.log(err, "error");
            toast.error("Failed to delete account!");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Account deletion cancelled");
        },
      },
      duration: 10000,
    });
  };

  const handleSave = async () => {
    if (!currentUser?._id) return;

    setLoading(true);
    try {
      const form = new FormData();
      form.append("userName", formData.userName);
      form.append("email", formData.email);
      if (formData.password) form.append("password", formData.password);
      if (file) form.append("image", file);

      const res = await axios.put(
        `${BASE_URL}/api/user/${currentUser._id}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      dispatch(updateUserSuccess(res.data.user));
      toast.success("Profile updated successfully!");
      setEditing(false);
      setFile(null);
      setFormData({ ...formData, password: "" });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update profile. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative group">
              <div className="relative rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500">
                {currentUser?.image || preview ? (
                  <Image
                    src={preview || currentUser?.image || ""}
                    alt={formData.userName || "User"}
                    width={128}
                    height={128}
                    className="rounded-full object-cover border-4 border-slate-900 shadow-xl h-32 w-32 group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center">
                    <FaUserCircle size={80} className="text-white/60" />
                  </div>
                )}
              </div>

              {editing && (
                <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg border-2 border-slate-900">
                  <FaCamera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Editable Form */}
          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6 text-left"
            >
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <FaUser size={12} />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <FaEnvelope size={12} />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <FaLock size={12} />
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FaCheck size={16} />
                  )}
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setPreview(currentUser?.image || "");
                    setFile(null);
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                >
                  <FaTimes size={16} />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <>
              {/* User Info */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  {currentUser?.userName || "User"}
                </h1>
                <p className="text-white/70 text-sm flex items-center justify-center gap-2">
                  <FaEnvelope size={12} />
                  {currentUser?.email || "No email available"}
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <FaEdit size={16} />
                  Edit Profile
                </button>

                <button
                  onClick={handleCreateNew}
                  className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
                >
                  <FaHome size={16} />
                  Create Listing
                </button>

                <Link
                  href={"/show-listing"}
                  className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 text-center"
                >
                  <FaList size={16} />
                  Show Listing
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-white/10 cursor-pointer hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
                >
                  <FaSignOutAlt size={16} />
                  Logout
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-600 to-pink-700 hover:from-pink-700 hover:to-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg mt-2"
                >
                  <FaTrash size={14} />
                  Delete Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
