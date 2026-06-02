"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          "/auth/forgot-password",
          { email }
        );

      alert(
        response.data.message
      );
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
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}