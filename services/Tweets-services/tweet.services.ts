import { Post } from "@/components/PostItem";

export const createTweet = async (mediaFiles: File[], value: string) => {
  if (mediaFiles.length === 0 && !value) {
    return { success: false };
  }
  console.log("Services", mediaFiles, value);
  const formData: FormData = new FormData();

  mediaFiles.forEach((file) => {
    formData.append("media", file);
  });
  formData.append("content", value);
  try {
    const res = await fetch("http://localhost:8000/api/v1/tweets", {
      method: "POST",
      body: formData, // ✅ multipart automatically
      credentials: "include",
    });

    if (!res.ok) {
      return { success: false };
    }

    const data = await res.json();
    console.log(data);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

interface GetTweetResponse {
  success: boolean;
  tweet?: Post;
  error?: string;
}

export const getATweet = async (postId: string): Promise<GetTweetResponse> => {
  if (!postId?.trim()) {
    return { success: false, error: "Invalid postId" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tweets/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // important for fresh data
      },
    );

    if (!res.ok) {
      return { success: false, error: `Request failed: ${res.status}` };
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
