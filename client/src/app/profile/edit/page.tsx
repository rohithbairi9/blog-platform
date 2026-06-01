"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "@/services/user.service";
import { uploadImage } from "@/services/upload.service";

export default function EditProfilePage() {
  const { user, loading } =
    useAuth();

const [name, setName] =
  useState(user?.name || "");

const [avatar, setAvatar] =
  useState(user?.avatar || "");

//   const handleImageUpload = async (
//   file: File
// ) => {
//   try {
//     const data =
//       await uploadImage(file);

//     setAvatar(data.imageUrl);
//   } catch (error) {
//     console.error(error);
//     alert("Image upload failed");
//   }
// };

const handleImageUpload = async (
  file: File
) => {
  try {
    const data =
      await uploadImage(file);

    console.log(
      "Uploaded URL:",
      data.imageUrl
    );

    setAvatar(data.imageUrl);
  } catch (error) {
    console.error(error);
    alert("Image upload failed");
  }
};

  useEffect(() => {
  if (user) {
    setName(user.name || "");
    setAvatar(user.avatar || "");
  }
}, [user]);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10">
        Please login first.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Edit Profile
      </h1>

      <form
  className="space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();

    try {
      console.log("Avatar URL:", avatar);
      
      await updateProfile({
        name,
        avatar,
      });

      alert(
        "Profile updated successfully"
      );

      window.location.href =
        "/profile";
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile"
      );
    }
  }}
>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

<div className="space-y-2">
  <label className="block font-medium">
    Avatar
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file =
        e.target.files?.[0];

      if (file) {
        handleImageUpload(file);
      }
    }}
    className="w-full border p-3 rounded"
  />

  {avatar && (
    <img
      src={avatar}
      alt="Avatar"
      className="w-24 h-24 rounded-full object-cover border"
    />
  )}
</div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}