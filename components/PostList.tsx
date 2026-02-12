"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostItem from "./PostItem";
import type { Post } from "./PostItem";
import SkeletonFeed from "./SkeletonFeed";
import { feedCache } from "@/utils/feedCache";

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
  const [posts, setPosts] = useState(() =>
    feedCache.posts.length > 0 ? feedCache.posts : initialPosts,
  );

  const [cursor, setCursor] = useState(() =>
    feedCache.posts.length > 0 ? feedCache.cursor : initialCursor,
  );

  const [hasMore, setHasMore] = useState(() =>
    feedCache.posts.length > 0 ? feedCache.hasMore : hasMoreFromServer,
  );
  const [loading, setLoading] = useState(false);
  console.log(posts);

  const loadingRef = useRef<boolean>(false);
  const cursorRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { ref: loadMoreRef, inView } = useInView({ rootMargin: "200px" });

  const fetchMore = async () => {
    //Agar pehle se loading ref true hai toh --> bhag ja yha se
    //Agar backend me data hai hi nhi toh --> bhag ja yha se
    if (!hasMore || loadingRef.current) return;

    //Agar purana wala fetch abhi hone wale fetch se similar hua toh bhag ja yha se.
    if (cursor === cursorRef.current) return;
    cursorRef.current = cursor;

    //Ab naya fetch ka req aa gya hai purani fetches ko cancel kr do.
    abortRef.current?.abort();
    //naya Abort controller de do jisse un-mount krna easy ho jaye.
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    loadingRef.current = true;

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/tweets/home?cursor=${cursor ?? ""}`,
        {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        },
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
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    if (inView && hasMore && !loadingRef.current) {
      fetchMore();
    }
  }, [inView]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (feedCache.posts.length > 0) {
      setPosts(feedCache.posts);
      setCursor(feedCache.cursor);
      setHasMore(feedCache.hasMore);

      requestAnimationFrame(() => {
        window.scrollTo(0, feedCache.scrollY);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      feedCache.posts = posts;
      feedCache.cursor = cursor;
      feedCache.hasMore = hasMore;
      feedCache.scrollY = window.scrollY;
    };
  }, [posts, cursor, hasMore]);

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
