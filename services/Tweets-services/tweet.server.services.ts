import { cookies } from "next/headers";
import type { Post } from "@/components/PostItem";

interface GetTweetResponse {
  success: boolean;
  tweet?: Post;
  error?: string;
}

export const getATweet = async (
  postId: string
): Promise<GetTweetResponse> => {
  "use server";

  if (!postId?.trim()) {
    return { success: false, error: "Invalid postId" };
  }

  try {
    // 🔥 get only accessToken
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tweets/${postId}`,
      {
        method: "GET",
        headers: accessToken
          ? {
              Cookie: `accessToken=${accessToken}`,
            }
          : {},
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        success: false,
        error: `Request failed: ${res.status}`,
      };
    }

    const { data } = await res.json();

    return {
      success: true,
      tweet: data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong",
    };
  }
};