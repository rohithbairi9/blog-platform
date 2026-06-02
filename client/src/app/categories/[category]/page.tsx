"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostsByCategory } from "@/services/category.service";
import PostCard from "@/components/blog/PostCard";

export default function CategoryPostsPage() {
  const params = useParams();

  const category =
    params.category as string;

  const [posts, setPosts] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchPosts =
      async () => {
        const data =
          await getPostsByCategory(
            category
          );

        setPosts(data.posts);
      };

    if (category) {
      fetchPosts();
    }
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        {category}
      </h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            slug={post.slug}
            content={post.content}
            author={post.author.name}
            authorId={post.author.id}
            coverImage={post.coverImage}
            category={post.category}
            tags={post.tags}
            views={post.views}
          />
        ))}
      </div>
    </div>
  );
}