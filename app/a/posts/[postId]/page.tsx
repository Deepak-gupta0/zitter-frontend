import Tweet from "@/components/Tweet";
import { getATweet } from "@/services/Tweets-services/tweet.services";
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const page = async ({params}) => {
  await delay(1000)
  const {postId} = await params;
  // console.log(postId)
  const res = await getATweet(postId)
  console.log(res)

  if(!res.success){
    return <div>Not found...</div>
  }
  return <Tweet tweet={res.tweet}/>
};

export default page;
