//For clients side
interface AddCommentProps {
  content: string;
  tweet: string;
}

interface AddReplyProps {
  content: string;
  tweet: string;
  parentComment: string;
}

export const addAComment = async ({
  content,
  tweet,
}: AddCommentProps) => {
  try {
    // Proper validation
    if (!content?.trim() || !tweet?.trim()) {
      return { success: false, message: "Content or Tweet ID missing" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/tweets/${tweet}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
        }),
        credentials: "include",
        cache: "no-store", // ❗ mutation me caching nahi
      }
    );

    const data = await res.json();
    
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to add comment",
      };
    }

    const {data: comment} = data;

    return {
      success: true,
      comment,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};


export const addAReply = async({content, tweet, parentComment} : AddReplyProps) => {
  try {
    // Proper validation
    if (!content?.trim() || !tweet?.trim() || !parentComment?.trim()) {
      return { success: false, message: "Content or Tweet ID missing" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/tweets/${tweet}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          parentComment: parentComment.trim()
        }),
        credentials: "include",
        cache: "no-store", // ❗ mutation me caching nahi
      }
    );

    const data = await res.json();
    
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to add comment",
      };
    }

    const {data: comment} = data;

    return {
      success: true,
      comment,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}