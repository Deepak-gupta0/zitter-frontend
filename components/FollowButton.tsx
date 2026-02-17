"use client";

import {
  followUser,
  unFollowUser,
} from "@/services/Tweets-services/tweet.services";
import { useState } from "react";

interface FollowButtonProps {
  isFollow: boolean;
  isLoggined: boolean;
  channelId: string;
}

const FollowButton = ({
  isFollow,
  isLoggined,
  channelId,
}: FollowButtonProps) => {
  const [following, setFollowing] = useState<boolean>(isFollow);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(following);

  const handleFollow = async () => {
    if (!isLoggined || !channelId || loading) return;
    try {
      setLoading(true);

      if (following) {
        const res = await unFollowUser(channelId);
        if (!res.success) return;
        setFollowing(false);
        console.log("Unfollow hua");
      } else if (!following) {
        const res = await followUser(channelId);
        if (!res.success) return;
        setFollowing(true);
        console.log("follow hua");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-1.5 rounded-full font-bold text-sm cursor-pointer transition-all duration-150 border
                ${
                  following
                    ? "bg-transparent text-[#e7e9ea] border-[#536471] hover:border-[#f91880] hover:text-[#f91880] hover:bg-[#f91880]/10"
                    : "bg-[#e7e9ea] text-[#0f1419] border-transparent hover:bg-[#d0d3d6]"
                }`}
    >
      {loading ? (
        "..."
      ) : following ? (
        <span>Following</span>
      ) : (
        <span>Follow</span>
      )}
    </button>
  );
};

export default FollowButton;
