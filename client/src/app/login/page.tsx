"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const searchParams =
  useSearchParams();

const verified =
  searchParams.get("verified");

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
await loginUser({
  email,
  password,
});

alert("Login successful");

window.location.href = "/";
} catch (error: any) {
  alert(error.message);
}
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        {error && (
  <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
    {error}
  </div>
)}

        {verified && (
  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
    Email verified successfully.
    Please login.
  </div>
)}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
  <a
    href="/forgot-password"
    className="text-blue-600"
  >
    Forgot Password?
  </a>
</p>

                <p className="mt-4 text-center">
  Don't have an account?{" "}
  <Link
    href="/register"
    className="text-blue-600"
  >
    Register
  </Link>
</p>

      </form>
    </div>
  );
}