"use client";

import PrivateRoute from "@/components/private-route/PrivateRoute";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { signout } from "@/app/redux/feature/userSlice";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";

const ProfilePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: currentUser?.userName || "",
    email: currentUser?.email || "",
    image: currentUser?.image || "",
  });
  const [preview, setPreview] = useState(formData.image);
  const [loading, setLoading] = useState(false);

  // 🖼️ handle local image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      // If you plan to upload to server, you can do it here:
      // const form = new FormData();
      // form.append("file", file);
      // const res = await axios.post("/api/upload", form);
      // setFormData({ ...formData, image: res.data.url });
    }
  };

  const handleLogout = () => {
    dispatch(signout());
    toast.success("You have been logged out!");
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        // await axios.delete(`${BASE_URL}/api/users/${currentUser._id}`);
        dispatch(signout());
        toast.error("Account deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete account");
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // await axios.put(`${BASE_URL}/api/users/${currentUser._id}`, formData);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error("Update failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6B73FF] p-6">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/30">
          {/* Profile Image */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative group">
              {preview ? (
                <Image
                  src={preview}
                  alt={formData.userName || "User"}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-white shadow-lg h-[120px] w-[120px] group-hover:scale-105 transition-all duration-300"
                />
              ) : (
                <FaUserCircle size={120} className="text-gray-200" />
              )}
              {editing && (
                <label className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:opacity-90 transition">
                  Change
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

          {/* Editable Fields */}
          {editing ? (
            <div className="space-y-5 text-left animate-fadeIn">
              <div>
                <label className="text-sm font-semibold text-white">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg p-2 mt-1 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg p-2 mt-1 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-1 tracking-wide drop-shadow">
                {formData.userName || "User"}
              </h1>
              <p className="text-white/80 text-sm mb-6">
                {formData.email || "No email available"}
              </p>
            </>
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-3 mt-6">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-500 text-white py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
