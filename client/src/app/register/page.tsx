"use client";

import { useState } from "react";

import { registerUser } from "../../services/auth.service";

import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
await registerUser({
  name,
  email,
  password,
});

alert(
  "Registration successful. Check your email and verify your account before logging in."
);

window.location.href = "/login";

  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

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
          Register
        </button>

                <p className="mt-4 text-center">
  Already have an account?{" "}
  <Link
    href="/login"
    className="text-blue-600"
  >
    Login
  </Link>
</p>

      </form>
    </div>
  );
}