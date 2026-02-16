"use client";

import { useFeedStore } from "@/store/useFeedStore";
import { AIInputWithSearchDemo } from "./demo";
import MainNavbar from "./MainNavbar";
import PostList from "./PostList";
import type { Post } from "./PostItem";

interface FeedClientWrapperProps {
  initialPosts: Post[];
  initialCursor: string | null;
  hasMoreFromServer: boolean;
}

const FeedClientWrapper = () => {
  const {activeTab} = useFeedStore()

  return (
    <div>
      {/* --------------------main nav--------------- */}
      <div className="border-b border-gray-700 bg-black/90 sticky top-0 w-full z-20">
        <MainNavbar />
      </div>

      {/* -------------------create post---------------------- */}
      <div className="hidden md:block">
        <AIInputWithSearchDemo />
      </div>

      {/* ----------------------post list--------------------------- */}
      <div>
        {/* 👇 Dono mounted rahenge (Twitter style) */}
        <div className={activeTab === "forYou" ? "block" : "hidden"} >
          <PostList activeTab={activeTab}/>
        </div>

        <div className={activeTab === "following" ? "block" : "hidden"}>
          <PostList  activeTab={activeTab}/>
        </div>
      </div>
    </div>
  );
};

export default FeedClientWrapper;