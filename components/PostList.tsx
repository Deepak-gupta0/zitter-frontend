"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostItem from "./PostItem";
import type { Post } from "./PostItem";
import SkeletonFeed from "./SkeletonFeed";

interface PostListProps {
  initialPosts: Post[];
  initialCursor: string | null;
  hasMoreFromServer: boolean;
}

const PostList = ({
  initialPosts,
  initialCursor,
  hasMoreFromServer,
}: PostListProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(hasMoreFromServer);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  const lastCursorRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: "200px",
  });

  const fetchMore = async () => {
    // 🛑 duplicate / race guards
    if (loadingRef.current || !hasMore) return;
    if (cursor === lastCursorRef.current) return;

    lastCursorRef.current = cursor;

    // 🛑 cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/tweets/home?cursor=${cursor ?? ""}`,
        {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const { data } = await res.json();

      setPosts((prev) => [...prev, ...data.tweets]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Fetch more error:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) fetchMore();
  }, [inView]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return (
    <div>
      {posts.map((item) => (
        <PostItem key={item._id} post={item} />
      ))}

      {/* Skeleton loader */}
      {loading && <SkeletonFeed count={2} />}

      {/* Observer */}
      {hasMore && <div ref={loadMoreRef} className="h-1" />}
    </div>
  );
};
export default PostList;
