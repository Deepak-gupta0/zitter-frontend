// lib/feedCache.ts
import type { Post } from "@/components/PostItem";

export const feedCache = {
  posts: [] as Post[],
  cursor: null as string | null,
  hasMore: true,
  scrollY: 0,
};