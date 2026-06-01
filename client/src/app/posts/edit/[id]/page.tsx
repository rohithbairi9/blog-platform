"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import {
  getPostById,
  updatePost,
  deletePost,
} from "@/services/post.service";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
);

export default function EditPostPage() {
  const params = useParams();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data =
          await getPostById(
            params.id as string
          );

        setTitle(data.post.title);
        setContent(
          data.post.content
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [params.id]);

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Edit Post
      </h1>

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            await updatePost(
              params.id as string,
              {
                title,
                content,
              }
            );

            alert(
              "Post updated successfully"
            );

            window.location.href = "/";
          } catch (error) {
            console.error(error);

            alert(
              "Failed to update post"
            );
          }
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        {/* <textarea
          rows={10}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full border p-3 rounded"
        /> */}

        <ReactQuill
  theme="snow"
  value={content}
  onChange={setContent}
  modules={modules}
  className="bg-white mb-4"
/>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Update Post
        </button>
        
        <button
  type="button"
  onClick={async () => {
    const confirmed =
      confirm(
        "Are you sure you want to delete this post?"
      );

    if (!confirmed) return;

    try {
      await deletePost(
        params.id as string
      );

      alert(
        "Post deleted successfully"
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete post"
      );
    }
  }}
  className="bg-red-600 text-white px-6 py-3 rounded ml-3"
>
  Delete Post
</button>
    
      </form>
    </div>
  );
}