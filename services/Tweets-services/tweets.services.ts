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
    console.log(data)
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
