"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";

export default function AuthorPage() {
  const { id } = useParams();

  const [author, setAuthor] =
    useState<any>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response =
          await api.get(
            `/users/${id}`
          );

        setAuthor(
          response.data.user
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchAuthor();
    }
  }, [id]);

  if (!author) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Author Profile
      </h1>

      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">
          {author.name}
        </h2>

        <p className="text-gray-500">
          {author.email}
        </p>

        <p className="mt-2">
          Role: {author.role}
        </p>
      </div>
    </div>
  );
}