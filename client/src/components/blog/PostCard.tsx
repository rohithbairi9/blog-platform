import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  content: string;

  author: string;
  authorId: string;

  coverImage?: string;
  category?: string;
  tags?: string[];
  views?: number;
}

export default function PostCard({
  id,
  title,
  slug,
  content,
  author,
  authorId,

  coverImage,

  category,
  tags,
  views,
}: PostCardProps) {
  return (
    <div className="border rounded-lg p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
{coverImage ? (
  <img
  src={coverImage}
  alt={title}
  className="w-full h-56 object-cover rounded mb-4 transition-transform duration-300 hover:scale-[1.02]"
/>
) : (
  <div className="w-full h-56 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
    No Cover Image
  </div>
)}
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      {category && (
  <div className="mb-3">
    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
      Category: {category}
    </span>
  </div>
)}

      <p className="text-gray-600 mb-4 line-clamp-3">
  {content.length > 120
    ? `${content.slice(0, 120)}...`
    : content}
</p>

      {tags && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
<Link
  href={`/author/${authorId}`}
  className="text-sm text-gray-500 hover:text-blue-600 hover:underline"
>
  By {author}
</Link>

  <p className="text-sm text-gray-500">
    👁 {views ?? 0} views
  </p>
</div>

<div className="flex gap-2">
  <Link
    href={`/posts/${slug}`}
    className="border px-4 py-2 rounded"
  >
    Read More
  </Link>

  <Link
    href={`/posts/edit/${id}`}
    className="border px-4 py-2 rounded"
  >
    Edit
  </Link>
</div>
      </div>
    </div>
  );
}