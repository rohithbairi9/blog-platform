"use client";

import { useEffect, useState } from "react";

import { getBookmarks } from "@/services/bookmark.service";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchBookmarks =
      async () => {
        try {
          const data =
            await getBookmarks();

          setBookmarks(
            data.bookmarks
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchBookmarks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        My Bookmarks
      </h1>

      {bookmarks.length === 0 ? (
        <p>
          No bookmarks yet.
        </p>
      ) : (
        <div className="space-y-4">
          {bookmarks.map(
            (bookmark) => (
              <div
                key={bookmark.id}
                className="border p-4 rounded"
              >
                <h2 className="text-xl font-semibold">
                  {
                    bookmark.post
                      .title
                  }
                </h2>

                <p className="text-gray-500">
                  By{" "}
                  {
                    bookmark.post
                      .author.name
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}