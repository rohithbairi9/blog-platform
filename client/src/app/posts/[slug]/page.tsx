"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug } from "@/services/post.service";
import { Post } from "@/types/post.types";
import CommentList from "@/components/blog/CommentList";
import { Comment } from "@/types/post.types";
import {
  getCommentsByPost,
  createComment,
} from "@/services/comment.service";
import {
  getLikesCount,
  toggleLike,
} from "@/services/like.service";
import { toggleBookmark } from "@/services/bookmark.service";
import {
  getRelatedPosts,
} from "@/services/post.service";

import PostCard from "@/components/blog/PostCard";

export default function SinglePostPage() {
  const params = useParams();

  const [post, setPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [commentText, setCommentText] = useState("");

  const [likesCount, setLikesCount] = useState(0);

  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
const data =
  await getPostBySlug(
    params.slug as string
  );

setPost(data.post);

const commentsData =
  await getCommentsByPost(
    data.post.id
  );

setComments(
  commentsData.comments
);

const likesData =
  await getLikesCount(
    data.post.id
  );

setLikesCount(
  likesData.likesCount
);

const relatedData =
  await getRelatedPosts(
    data.post.id,
    data.post.category || ""
  );

setRelatedPosts(
  relatedData.posts
);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [params.slug]);

if (!post) {
  return (
    <div className="max-w-4xl mx-auto p-10">
      <p className="text-gray-500">
        Loading post...
      </p>
    </div>
  );
}

return (
  <div className="max-w-4xl mx-auto p-6">
    <button
      onClick={() => history.back()}
      className="mb-6 border px-4 py-2 rounded"
    >
      ← Back
    </button>

    <h1 className="text-5xl font-bold mb-6">
      {post.title}
    </h1>

      <div className="flex gap-6 text-gray-500 mb-4">
  <p>
    By {post.author.name}
  </p>

  <p>
    {new Date(
      post.createdAt
    ).toLocaleDateString()}
  </p>
</div>

      <div className="flex gap-6 mb-6">
  <p>
    Views: {post.views}
  </p>

 <button
  onClick={async () => {
    if (!post) return;

    try {
      await toggleLike(
        post.id
      );

      const likesData =
        await getLikesCount(
          post.id
        );

      setLikesCount(
        likesData.likesCount
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to like post"
      );
    }
  }}
  className="border px-3 py-1 rounded"
>
  ❤️ {likesCount}
</button>

<button
  onClick={async () => {
    if (!post) return;

    try {
      const response =
        await toggleBookmark(
          post.id
        );

      alert(
        response.message
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to bookmark post"
      );
    }
  }}
  className="border px-3 py-1 rounded"
>
  🔖 Bookmark
</button>

</div>
      {post.category && (
  <p className="mb-4 text-blue-600">
    Category: {post.category}
  </p>
)}

{post.tags.length > 0 && (
  <div className="flex gap-2 flex-wrap mb-6">
    {post.tags.map((tag) => (
      <span
        key={tag}
        className="border px-2 py-1 rounded text-sm"
      >
        #{tag}
      </span>
    ))}
  </div>
)}

      {/* <div className="border-t pt-6 text-lg leading-8">
  {post.content}
</div> */}

<div
  dangerouslySetInnerHTML={{
    __html: post.content,
  }}
/>

<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Comments
  </h2>

 <CommentList
  comments={comments}
  onRefresh={async () => {
    if (!post) return;

    const commentsData =
      await getCommentsByPost(
        post.id
      );

    setComments(
      commentsData.comments
    );
  }}
/>
</div>

<form
  className="mt-6"
  onSubmit={async (e) => {
    e.preventDefault();

    if (!post) return;

    try {
      await createComment(
        commentText,
        post.id
      );

      const commentsData =
        await getCommentsByPost(
          post.id
        );

      setComments(
        commentsData.comments
      );

      setCommentText("");

      alert(
        "Comment added successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to add comment"
      );
    }
  }}
>
  <textarea
    value={commentText}
    onChange={(e) =>
      setCommentText(
        e.target.value
      )
    }
    placeholder="Write a comment..."
    className="w-full border p-3 rounded"
    rows={4}
  />

  <button
    type="submit"
    className="mt-3 bg-black text-white px-4 py-2 rounded"
  >
    Add Comment
  </button>
</form>

<div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Related Posts
  </h2>

  <div className="grid gap-6">
    {relatedPosts.map((post) => (
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

    </div>
  );
}