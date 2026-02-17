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

interface FollowUserResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export const followUser = async (
  channelId: string,
): Promise<FollowUserResponse> => {
  if (!channelId?.trim())
    return { success: false, error: "channel id is required" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subs/follow/${channelId}`,
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        error: `Request failed: ${res.status}`,
      };
    }

    const { data } = await res.json();

    if (data.subscribed) {
      return { success: true, message: "Subscribed successfully" };
    }

    return {
      success: false,
      error: "something went wrong",
      message: "something went wrong",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong",
    };
  }
};

export const unFollowUser = async (channelId: string) : Promise<FollowUserResponse> => {
  if (!channelId?.trim())
    return { success: false, error: "channel id is required" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subs/follow/${channelId}`,
      {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        error: `Request failed: ${res.status}`,
      };
    }

    const { data } = await res.json();

    if (!data.subscribed) {
      return { success: true, message: "UnSubscribed successfully" };
    }

    return {
      success: false,
      error: "something went wrong",
      message: "something went wrong",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong",
    };
  }
}
