"use client";

import { useEffect, useState } from "react";

import PostCard from "@/components/blog/PostCard";

import { getAllPosts } from "@/services/post.service";

import { Post } from "@/types/post.types";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const data =
  await getAllPosts(
    search,
    page
  );

setPosts(data.posts);

setTotalPages(
  data.totalPages
);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts();
}, [search, page]);

return (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-4xl font-bold mb-8">
      Latest Posts
    </h1>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
  setSearch(e.target.value);
  setPage(1);
}}
        className="w-full border p-3 rounded"
      />
    </div>

<div className="grid gap-6">
  {posts.length === 0 ? (
    <div className="text-center py-12 text-gray-500">
      No posts found.
    </div>
  ) : (
    posts.map((post) => (
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
    ))
  )}
</div>

    <div className="flex justify-center gap-4 mt-8">
  <button
    onClick={() =>
      setPage((prev) =>
        Math.max(prev - 1, 1)
      )
    }
    disabled={page === 1}
    className="border px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() =>
      setPage((prev) =>
        Math.min(
          prev + 1,
          totalPages
        )
      )
    }
    disabled={
      page === totalPages
    }
    className="border px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

  </div>
);
}