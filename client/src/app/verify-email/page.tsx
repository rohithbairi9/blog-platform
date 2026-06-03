"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] =
    useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      try {
        const token =
          searchParams.get("token");

        if (!token) {
          setMessage("Invalid token");
          return;
        }

        await api.get(
          `/auth/verify/${token}`
        );

        setMessage(
          "Email verified successfully! Redirecting..."
        );

        setTimeout(() => {
          router.push(
            "/login?verified=true"
          );
        }, 2000);
      } catch (error) {
        setMessage(
          "Verification failed"
        );
      }
    };

    verify();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded-lg">
        <h1 className="text-2xl font-bold">
          {message}
        </h1>
      </div>
    </div>
  );
}