import { AIInputWithSearchDemo } from "@/components/demo";
import MainNavbar from "@/components/MainNavbar";
import PostList from "@/components/PostList";
import { getForYouHomeData } from "@/services/HomeServices/home.server.services";

export default async function page() {
  const res = await getForYouHomeData();
  return (
    <div>
      {/* --------------------main nav--------------- */}
      <div className="border-b border-gray-700 bg-black/90 sticky top-0 w-full z-20">
        <MainNavbar />
      </div>

      {/* -------------------create post---------------------- */}
      <div className="hidden md:block">
        {/* for Desktop */}
        <AIInputWithSearchDemo />
      </div>

      {/* <div className="md:hidden block md:relative border-3 border-pink-700">
        <div className="absolute bottom-0">For Mob</div>
      </div> */}

      {/* ----------------------post list--------------------------- */}
      <div>
        <PostList initialPosts={res.tweets} initialCursor={res.pagination.nextCursor}  hasMoreFromServer={res.pagination.hasMore}/>
      </div>
    </div>
  );
}
