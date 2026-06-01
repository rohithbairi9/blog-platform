import { Comment } from "@/types/post.types";
import { deleteComment } from "@/services/comment.service";

interface CommentListProps {
  comments: Comment[];
  onRefresh?: () => void;
}

export default function CommentList({
  comments,
  onRefresh,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500">
        No comments yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded p-4"
        >
          <p className="font-semibold">
  {comment.user.name}
</p>

          <p className="mt-2">
            {comment.content}
          </p>

          <button
  onClick={async () => {
    try {
      await deleteComment(
        comment.id
      );

      onRefresh?.();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to delete comment"
      );
    }
  }}
  className="mt-2 text-red-600 text-sm"
>
  Delete
</button>

        </div>
      ))}
    </div>
  );
}