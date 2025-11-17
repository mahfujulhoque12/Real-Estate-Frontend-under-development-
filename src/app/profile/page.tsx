/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrivateRoute from "@/components/private-route/PrivateRoute";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { signout, updateUserSuccess } from "@/app/redux/feature/userSlice"; // ✅ Import updateUserSuccess
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/constant/Constant";
import Link from "next/link";
import { clearEdit } from "../redux/feature/listingEditSlice";
import { useRouter } from "next/navigation";

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

  // 🖼️ Local preview for image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCreateNew = () => {
    dispatch(clearEdit()); // clear editId & editData
    router.push("/listing"); // go to listing page with empty form
  };

  const handleLogout = () => {
    dispatch(signout());
    toast.success("You have been logged out!");
  };

  const handleDelete = async () => {
    if (!currentUser?._id) return;

    // ✅ Create a custom confirmation toast
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
      duration: 10000, // 10 seconds to decide
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

      // ✅ Update Redux store with the new user data
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6B73FF] p-6">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/30">
          {/* Profile Image */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative group">
              {/* ✅ Always use currentUser.image as primary source, fallback to preview during editing */}
              {currentUser?.image || preview ? (
                <Image
                  src={preview || currentUser?.image || ""}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-5 text-left animate-fadeIn"
            >
              <div>
                <label className="text-sm font-semibold text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg p-2 mt-1 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg p-2 mt-1 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full bg-white/20 border border-white/30 rounded-lg p-2 mt-1 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="flex flex-col space-y-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setPreview(currentUser?.image || ""); // ✅ Reset preview to current image
                    setFile(null);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-1 tracking-wide drop-shadow">
                {currentUser?.userName || "User"}
              </h1>
              <p className="text-white/80 text-sm mb-6">
                {currentUser?.email || "No email available"}
              </p>

              <div className="flex flex-col space-y-3 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Logout
                </button>

                <button
                  onClick={handleCreateNew}
                  className="bg-white/20 flex justify-center hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Create Listing
                </button>

                <Link
                  href={"/show-listing"}
                  className="bg-white/20 flex justify-center hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Show Listing
                </Link>

                <button
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-500 text-white py-2 rounded-lg font-semibold transition-all duration-300"
                >
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
