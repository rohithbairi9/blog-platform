"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth.service";

export default function Navbar() {
  const pathname = usePathname();

const [theme, setTheme] =
  useState("light");

useEffect(() => {
  const savedTheme =
    localStorage.getItem("theme") ||
    "light";

  setTheme(savedTheme);
}, []);

const toggleTheme = () => {
  const newTheme =
    theme === "light"
      ? "dark"
      : "light";

  setTheme(newTheme);

  localStorage.setItem(
    "theme",
    newTheme
  );

  document.documentElement.setAttribute(
    "data-theme",
    newTheme
  );
};

const { user, loading, isAuthenticated } =
  useAuth();

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Blog Platform
        </Link>

        <div className="flex gap-4">
          <Link
  href="/"
  className={
    pathname === "/"
      ? "font-bold text-blue-600"
      : ""
  }
>
  Home
</Link>

<Link href="/categories">
  Categories
</Link>

<Link href="/create-post">
  Create Post
</Link>

<Link href="/bookmarks">
  Bookmarks
</Link>

<button
  onClick={toggleTheme}
  className="border px-3 py-1 rounded"
>
  {theme === "light"
    ? "🌙"
    : "☀️"}
</button>

{!loading && !isAuthenticated ? (
  <>
    <Link
      href="/login"
      className={
        pathname === "/login"
          ? "font-bold text-blue-600"
          : ""
      }
    >
      Login
    </Link>

    <Link
      href="/register"
      className={
        pathname === "/register"
          ? "font-bold text-blue-600"
          : ""
      }
    >
      Register
    </Link>
  </>
) : !loading ? (
<div className="flex gap-4 items-center">
  <Link href="/profile">
    {user?.name}
  </Link>

<button
  onClick={async () => {
    try {
      await logoutUser();

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  }}
  className="border px-3 py-1 rounded"
>
  Logout
</button>
</div>
) : null}
        </div>
      </div>
    </nav>
  );
}