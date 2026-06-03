"use client";

import { useState } from "react";
import { createPost } from "@/services/post.service";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import api from "@/lib/axios";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
);

export default function CreatePostPage() {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }],
    [{ list: "bullet" }],
    ["link"],
    ["blockquote"],
    ["code-block"],
    ["clean"],
  ],
};

const [category, setCategory] = useState("");

const [tags, setTags] = useState("");

const [file, setFile] =
  useState<File | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Create Post
      </h1>

      <form
  className="space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();

try {
  let uploadedImageUrl = "";

  if (file) {
    const formData = new FormData();

    formData.append(
      "image",
      file
    );

    const uploadResponse =
      await api.post(
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    uploadedImageUrl =
      uploadResponse.data.imageUrl;
  }

  await createPost({
    title,
    content,
    coverImage:
      uploadedImageUrl,
    category,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  alert("Post created successfully");

  window.location.href = "/";
} catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  }}
>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }}
  className="w-full border p-3 mb-4"
/>

<input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="w-full border p-3 rounded"
/>

<input
  type="text"
  placeholder="Tags (comma separated)"
  value={tags}
  onChange={(e) =>
    setTags(e.target.value)
  }
  className="w-full border p-3 rounded"
/>

        {/* <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows={10}
          className="w-full border p-3 rounded"
        /> */}

<ReactQuill
  theme="snow"
  value={content}
  onChange={setContent}
  modules={modules}
  className="bg-white"
/>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}