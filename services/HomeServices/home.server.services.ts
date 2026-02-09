import { cookies } from "next/headers";

export const getForYouHomeData = async () => {
  const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(accessToken)
    try {
      const res = await fetch("http://localhost:8000/api/v1/tweets/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store", // auth data ke liye important
      });
    
      const {data} = await res.json()
      // console.log(data)
      return {success: true, ...data}
      // const {username, email, fullName, avatar} = data;
      // return {username, email, fullName, avatar, success: true};
    } catch (error) {
      return {success: false}
    }
}