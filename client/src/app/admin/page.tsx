"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

import {
  getAdminStats,
  getAllUsers,
  makeAdmin,
  deleteUser,
  getAllPosts,
  deletePost,
  getRecentActivity,
  togglePublishPost,
} from "@/services/admin.service";

export default function AdminPage() {

    const {user, loading,} = useAuth();

  const [stats, setStats] =
    useState<any>(null);

  const [users, setUsers] =
    useState<any[]>([]);

  const [posts, setPosts] =
    useState<any[]>([]);

  const [recentActivity,
  setRecentActivity] =
  useState<any>(null);

    const [userSearch, setUserSearch] =
  useState("");

const [postSearch, setPostSearch] =
  useState("");

useEffect(() => {
  if (
    !user ||
    user.role !== "ADMIN"
  ) {
    return;
  }

  const fetchData = async () => {
    try {
      const statsData =
        await getAdminStats();

      const usersData =
        await getAllUsers();

      const postsData =
        await getAllPosts();

      const activityData =
  await getRecentActivity();

      setStats(statsData);
setUsers(usersData.users);
setPosts(postsData.posts);
setRecentActivity(activityData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [user]);

const handleMakeAdmin =
  async (userId: string) => {
    try {
      await makeAdmin(userId);

      alert(
        "User promoted successfully"
      );

      const usersData =
        await getAllUsers();

      setUsers(usersData.users);
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

const handleDeleteUser =
  async (userId: string) => {

    if (userId === user?.id) {
      alert(
        "You cannot delete yourself"
      );
      return;
    }

    const confirmed =
      confirm(
        "Delete this user?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);

      const usersData =
        await getAllUsers();

      setUsers(usersData.users);

      alert(
        "User deleted"
      );
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  const handleDeletePost =
  async (postId: string) => {

    const confirmed =
      confirm(
        "Delete this post?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deletePost(postId);

      const postsData =
        await getAllPosts();

      const statsData =
        await getAdminStats();

      setPosts(postsData.posts);
      setStats(statsData);

      alert(
        "Post deleted"
      );
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  const handleTogglePublish =
  async (postId: string) => {
    try {
      await togglePublishPost(
        postId
      );

      const postsData =
        await getAllPosts();

      const statsData =
  await getAdminStats();

      setStats(statsData);
      setPosts(postsData.posts);

    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  const filteredUsers =
  users.filter((u) =>
    u.name
      .toLowerCase()
      .includes(
        userSearch.toLowerCase()
      ) ||
    u.email
      .toLowerCase()
      .includes(
        userSearch.toLowerCase()
      )
  );

const filteredPosts =
  posts.filter((p) =>
    p.title
      .toLowerCase()
      .includes(
        postSearch.toLowerCase()
      )
  );

  if (loading) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

if (
  !user ||
  user.role !== "ADMIN"
) {
  return (
    <div className="p-10 text-red-600 text-xl">
      Access Denied
    </div>
  );
}

  if (!stats) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="border p-4 rounded text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalUsers}
          </h2>
          <p>Users</p>
        </div>

        <div className="border p-4 rounded text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalPosts}
          </h2>
          <p>Posts</p>
        </div>

        <div className="border p-4 rounded text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalComments}
          </h2>
          <p>Comments</p>
        </div>

        <div className="border p-4 rounded text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalBookmarks}
          </h2>
          <p>Bookmarks</p>
        </div>

        <div className="border p-4 rounded text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalLikes}
          </h2>
          <p>Likes</p>
        </div>

        <div className="border p-4 rounded text-center">
  <h2 className="text-3xl font-bold">
    {stats.publishedPosts}
  </h2>
  <p>Published</p>
</div>

<div className="border p-4 rounded text-center">
  <h2 className="text-3xl font-bold">
    {stats.draftPosts}
  </h2>
  <p>Drafts</p>
</div>

<div className="border p-4 rounded text-center">
  <h2 className="text-xl font-bold">
    {stats.mostViewedPost?.views}
  </h2>

  <p className="text-xs text-gray-500">
    Most Viewed
  </p>

  <p className="text-xs mt-1">
    {stats.mostViewedPost?.title}
  </p>
</div>
      </div>

      <div className="border rounded-lg mb-8">
  <div className="p-4 border-b">
    <h2 className="text-2xl font-bold">
      Recent Activity
    </h2>
  </div>

  <div className="grid md:grid-cols-2 gap-6 p-4">

    <div>
      <h3 className="font-semibold mb-3">
        Latest Users
      </h3>

      {recentActivity?.recentUsers?.map(
        (user: any) => (
          <div
            key={user.id}
            className="mb-2"
          >
            {user.name}
          </div>
        )
      )}
    </div>

    <div>
      <h3 className="font-semibold mb-3">
        Latest Posts
      </h3>

      {recentActivity?.recentPosts?.map(
        (post: any) => (
          <div
            key={post.id}
            className="mb-2"
          >
            {post.title}
          </div>
        )
      )}
    </div>

  </div>
</div>

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">
            Users
          </h2>
          <input
  type="text"
  placeholder="Search users..."
  value={userSearch}
  onChange={(e) =>
    setUserSearch(
      e.target.value
    )
  }
  className="mt-3 border p-2 rounded w-full"
/>
        </div>

        {filteredUsers.length === 0 && (
  <p className="p-4">
    No users found
  </p>
)}

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b"
          >
            <h3 className="font-semibold">
              {user.name}
            </h3>

            <p>{user.email}</p>

<div className="flex items-center gap-4 mt-2">
  <span className="text-sm text-blue-600">
    {user.role}
  </span>

  {user.role !== "ADMIN" && (
    <button
      onClick={() =>
        handleMakeAdmin(user.id)
      }
      className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
    >
      Make Admin
    </button>
  )}

  <button
    onClick={() =>
      handleDeleteUser(user.id)
    }
    className="border px-3 py-1 rounded text-sm text-red-600 hover:bg-red-50"
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg mt-8">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">
            Posts
          </h2>
          <input
  type="text"
  placeholder="Search posts..."
  value={postSearch}
  onChange={(e) =>
    setPostSearch(
      e.target.value
    )
  }
  className="mt-3 border p-2 rounded w-full"
/>
        </div>

        {filteredPosts.length === 0 && (
  <p className="p-4">
    No posts found
  </p>
)}

        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 border-b"
          >
            <h3 className="font-semibold">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600">
              Author: {post.author?.name}
            </p>

            <p className="text-sm">
              Views: {post.views}
            </p>

            <p className="text-sm">
  Status:{" "}
  {post.published
    ? "Published"
    : "Draft"}
</p>

            <div className="flex gap-2 mt-2">

  <button
    onClick={() =>
      handleTogglePublish(
        post.id
      )
    }
    className="border px-3 py-1 rounded text-sm"
  >
    {post.published
      ? "Unpublish"
      : "Publish"}
  </button>

  <button
    onClick={() =>
      handleDeletePost(
        post.id
      )
    }
    className="border px-3 py-1 rounded text-sm text-red-600 hover:bg-red-50"
  >
    Delete Post
  </button>

</div>
          </div>
        ))}
      </div>

    </div>
  );
}