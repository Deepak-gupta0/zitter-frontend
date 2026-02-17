import Tweet from "@/components/Tweet";
import { getATweet } from "@/services/Tweets-services/tweet.server.services";
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface PageProps {
  params : {
    postId : string
  }
}

const page = async ({params}: PageProps) => {
  await delay(1000)
  const {postId} = await params;
  // console.log(postId)
  const res = await getATweet(postId)
  console.log(res)

   if (!res.success || !res.tweet) {
    return <div>Not found...</div>
  }
  
  return <Tweet tweet={res.tweet }/>
};

export default page;
