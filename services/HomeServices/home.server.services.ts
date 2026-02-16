export const getForYouData = async (cursor: string | null) => {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/tweets/home?cursor=${cursor ?? ""}`, {
      method: "GET",
      cache: "force-cache", // auth data ke liye important
    });

    const { data } = await res.json();
    // console.log(data)
    return { success: true, ...data };
    // const {username, email, fullName, avatar} = data;
    // return {username, email, fullName, avatar, success: true};
  } catch (error) {
    return { success: false };
  }
};

export const getFollowingData = async (cursor: string | null) => {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/tweets/f/following?cursor=${cursor ?? ""}`, {
      method: "GET",
      cache: "force-cache", // auth data ke liye important
      credentials: "include"
    });

    const { data } = await res.json();
    // console.log(data)
    return { success: true, ...data };
    // const {username, email, fullName, avatar} = data;
    // return {username, email, fullName, avatar, success: true};
  } catch (error) {
    return { success: false };
  }
};
