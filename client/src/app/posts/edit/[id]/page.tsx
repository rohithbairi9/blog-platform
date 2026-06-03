"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import useAuth from "@/hooks/useAuth";
import { uploadImage } from "@/services/upload.service";

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

const { user, loading } = useAuth();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] = useState("");

  const [coverImage, setCoverImage] =
  useState("");

const [tags, setTags] = useState("");

useEffect(() => {
  if (loading) return;

  if (!user) {
    window.location.href = "/login";
    return;
  }

//   const fetchPost = async () => {
//       try {
// const data =
//   await getPostById(
//     params.id as string
//   );

// if (
//   user &&
//   data.post.author.id !== user.id
// ) {
//   alert(
//     "You are not allowed to edit this post"
//   );

//   window.location.href = "/";

//   return;
// }

// setTitle(data.post.title);
// setContent(data.post.content);
// setCategory(data.post.category || "");
// setTags(data.post.tags?.join(", ") || "");

//       } catch (error) {
//         console.error(error);
//       }
//     };

const fetchPost = async () => {
  try {
    const data = await getPostById(
      params.id as string
    );

    if (
      user &&
      data.post.author.id !== user.id
    ) {
      console.log(
  "You are not allowed to edit this post"
);

      window.location.href = "/";
      return;
    }

    setTitle(data.post.title);
    setContent(data.post.content);
    setCategory(data.post.category || "");
    setCoverImage(
  data.post.coverImage || ""
);
    setTags(
      data.post.tags?.join(", ") || ""
    );
  } catch (error) {
    console.error(error);
  }
};

    fetchPost();
}, [params.id, user, loading]);

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

if (loading) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

const handleImageUpload = async (
  file: File
) => {
  try {
    const data =
      await uploadImage(file);

    setCoverImage(
      data.imageUrl
    );
  } catch (error) {
    console.error(error);

    alert(
      "Image upload failed"
    );
  }
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
    coverImage,
    category,

    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
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
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file =
      e.target.files?.[0];

    if (file) {
      handleImageUpload(file);
    }
  }}
  className="w-full border p-3 rounded"
/>

{coverImage && (
  <img
    src={coverImage}
    alt="Preview"
    className="w-full h-60 object-cover rounded"
  />
)}

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