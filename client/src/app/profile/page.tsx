"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getMyPosts } from "@/services/post.service";
import Link from "next/link";
import { getBookmarks } from "@/services/bookmark.service";

export default function ProfilePage() {
  const {
    user,
    loading,
  } = useAuth();

  const [posts, setPosts] =
  useState<any[]>([]);

const [stats, setStats] =
  useState({
    posts: 0,
    bookmarks: 0,
    views: 0,
  });

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const data =
        await getMyPosts();

      setPosts(data.posts);

setStats((prev) => ({
  ...prev,
  posts: data.posts.length,
  views: data.posts.reduce(
    (total: number, post: any) =>
      total + (post.views || 0),
    0
  ),
}));

    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts();
}, []);

useEffect(() => {
  const fetchBookmarks =
    async () => {
      try {
        const data =
          await getBookmarks();

        setStats((prev) => ({
          ...prev,
          bookmarks:
            data.bookmarks.length,
        }));
      } catch (error) {
        console.error(error);
      }
    };

  fetchBookmarks();
}, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10">
        Please login first.
      </div>
    );
  }

  console.log("AVATAR:", user?.avatar);

return (
    <div className="max-w-4xl mx-auto p-6">
<div className="mb-6">
  <Link
    href="/profile/edit"
    className="border px-4 py-2 rounded hover:bg-gray-100"
  >
    Edit Profile
  </Link>
</div>

<div className="border rounded-lg p-8 shadow-sm">
  <div className="flex items-center gap-6">
    {user.avatar ? (
  <img
    src={user.avatar}
    alt={user.name}
    className="w-20 h-20 rounded-full object-cover"
  />
) : (
  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
    {user.name.charAt(0).toUpperCase()}
  </div>
)}

    <div>
      <h2 className="text-2xl font-semibold">
        {user.name}
      </h2>

      <p className="text-gray-500">
        {user.email}
      </p>

      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        {user.role}
      </span>

<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="border rounded-lg p-4 text-center">
    <p className="text-2xl font-bold">
      {stats.posts}
    </p>
    <p className="text-gray-500">
      Posts
    </p>
  </div>

  <div className="border rounded-lg p-4 text-center">
    <p className="text-2xl font-bold">
      {stats.bookmarks}
    </p>
    <p className="text-gray-500">
      Bookmarks
    </p>
  </div>

  <div className="border rounded-lg p-4 text-center">
    <p className="text-2xl font-bold">
      {stats.views}
    </p>

    <p className="text-gray-500">
      Views
    </p>
  </div>
</div>
    </div>
  </div>
</div>

<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
  My Posts ({posts.length})
</h2>

  {posts.length === 0 ? (
    <p className="text-gray-500">
      You haven't created any posts yet.
    </p>
  ) : (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4"
        >
          <Link
  href={`/posts/${post.slug}`}
  className="text-lg font-semibold hover:text-blue-600 hover:underline"
>
  {post.title}
</Link>

          <p className="text-gray-500 mt-1">
            {new Date(
              post.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}