"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] =
    useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    const currentTheme =
      savedTheme || "light";

    setTheme(currentTheme);

    document.documentElement.setAttribute(
      "data-theme",
      currentTheme
    );
  }, []);

  return <>{children}</>;
}