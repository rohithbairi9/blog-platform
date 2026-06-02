"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";

export default function ResetPasswordPage() {
  const params = useParams();

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          `/auth/reset-password/${params.token}`,
          {
            password,
          }
        );

      alert(
        response.data.message
      );

      window.location.href =
        "/login";
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}