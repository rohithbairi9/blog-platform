"use client";

import { useEffect, useState } from "react";

import { getProfile } from "@/services/auth.service";

import { AuthUser } from "@/types/auth.types";

export default function useAuth() {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          await getProfile();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}