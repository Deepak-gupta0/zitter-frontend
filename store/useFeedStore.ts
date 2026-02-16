import type { Post } from "@/components/PostItem";
import { create } from "zustand";

type TabType = "forYou" | "following";

interface SingleFeed {
  posts: Post[];
  cursor: string | null;
  hasMore: boolean;
  scrollY: number;
}

interface FeedStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  forYouFeed: SingleFeed;
  followingFeed: SingleFeed;

  updateForYouFeed: (data: Partial<SingleFeed>) => void;
  updateFollowingFeed: (data: Partial<SingleFeed>) => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  activeTab: "forYou",
  setActiveTab: (tab) => set({ activeTab: tab }),

  forYouFeed: {
    posts: [],
    cursor: null,
    hasMore: true,
    scrollY: 0,
  },
  followingFeed: {
    posts: [],
    cursor: null,
    hasMore: true,
    scrollY: 0,
  },

  updateForYouFeed: (data) =>
    set((state) => ({
      forYouFeed: {
        ...state.forYouFeed,
        ...data,
      },
    })),
  updateFollowingFeed: (data) =>
    set((state) => ({
      followingFeed: {
        ...state.followingFeed,
        ...data,
      },
    })),
}));
