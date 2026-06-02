"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/services/post.service";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchCategories =
      async () => {
        const data =
          await getAllPosts();

        const categoryMap: Record<
          string,
          number
        > = {};

        data.posts.forEach(
          (post: any) => {
            if (post.category) {
              categoryMap[
                post.category
              ] =
                (categoryMap[
                  post.category
                ] || 0) + 1;
            }
          }
        );

        setCategories(
          Object.entries(
            categoryMap
          )
        );
      };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Categories
      </h1>

      <div className="space-y-4">
        {categories.map(
          ([name, count]) => (
            <Link
              key={name}
              href={`/categories/${name}`}
              className="block border rounded-lg p-4 hover:bg-gray-50"
            >
              <span className="font-semibold">
                {name}
              </span>{" "}
              ({count})
            </Link>
          )
        )}
      </div>
    </div>
  );
}