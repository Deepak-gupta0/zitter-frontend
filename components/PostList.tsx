"use client";

import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useFeedStore } from "@/store/useFeedStore";
import PostItem from "./PostItem";
import type { Post } from "./PostItem";
import {
  getFollowingData,
  getForYouData,
} from "@/services/HomeServices/home.server.services";
import SkeletonFeed from "@/skeletons/SkeletonFeed";

interface TweetResponse {
  pagination: {
    limit: number;
    hasMore: boolean;
    nextCursor: string | null;
  };
  success: boolean;
  tweets: Post[];
}

type TabType = "forYou" | "following";

export default function PostList({ activeTab }: { activeTab: TabType }) {
  const { forYouFeed, followingFeed, updateForYouFeed, updateFollowingFeed } =
    useFeedStore();


  const currentFeed = activeTab === "forYou" ? forYouFeed : followingFeed; //main data yha hoga.

  const updateFeed =
    activeTab === "forYou" ? updateForYouFeed : updateFollowingFeed; //Update ke liye code yha likha jayega

  const { ref, inView } = useInView();

  // 🔥 Fetch Function (Cursor Based)
  const fetchData = useCallback(async () => {
    if (!currentFeed.hasMore) return;
    const res: TweetResponse =
      activeTab === "forYou"
        ? await getForYouData(currentFeed.cursor)
        : await getFollowingData(currentFeed.cursor);

    if (!res.success) return;

    updateFeed({
      posts: [...currentFeed.posts, ...res.tweets], // append
      cursor: res.pagination.nextCursor,
      hasMore: res.pagination.hasMore,
    });
  }, [activeTab, currentFeed]);

  // 🚀 Initial Load (only if no posts already)
  useEffect(() => {
    if (currentFeed.posts.length === 0) {
      fetchData();
    }
  }, [activeTab]);

  // ♾ Infinite Scroll Trigger
  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  return (
    <div>
      {currentFeed.posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}

      {currentFeed.hasMore && (
        <div ref={ref} >
          <SkeletonFeed count={2}/>
        </div>
      )}
    </div>
  );
}
