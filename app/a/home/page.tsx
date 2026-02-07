import CreatePost from "@/components/CreatePost";
import MainNavbar from "@/components/MainNavbar";
import PostFeature from "@/components/PostFeature";
import PostItem from "@/components/PostItem";
import TweetInput from "@/components/TweetInput";

const post = {
  _id: "6985705a66f410a63a14a52b",

  media: [
    {
      type: "image",
      url: "https://res.cloudinary.com/dfrix5nll/image/upload/v1770352718/nlmb1yfhu6l49oxajugg.png",
      publicId: "nlmb1yfhu6l49oxajugg",
      width: 403,
      height: 322,
    },
    {
      type: "video",
      url: "https://res.cloudinary.com/dfrix5nll/video/upload/v1770352728/f4yb6c1quyp6klwhllfx.mp4",
      publicId: "f4yb6c1quyp6klwhllfx",
      width: 1892,
      height: 980,
      duration: 10.069312,
    },
    {
      type: "video",
      url: "https://res.cloudinary.com/dfrix5nll/video/upload/v1770352728/f4yb6c1quyp6klwhllfx.mp4",
      publicId: "f4yb6c1quyp6klwhllfx",
      width: 1892,
      height: 980,
      duration: 10.069312,
    },
  ],
  content: "This is the test content",
  owner: {
    avatar: "",
    username: "deepak24",
    fullName: "Deepak Gupta",
    _id: "94854t4ut865",
  },
  replyCount: 0,
  repostCount: 0,
  quoteCount: 0,
  likesCount: 0,
  viewCount: 0,
  isPublished: true,
  isDeleted: false,
  type: "TWEET",
  createdAt: {
    $date: "2026-02-06T04:38:50.494Z",
  },
  updatedAt: {
    $date: "2026-02-06T04:38:50.494Z",
  },
  __v: 0,
};

export default function page() {
  return (
    <div>
      {/* --------------------main nav--------------- */}
      <div className="border-b border-gray-500 bg-black/90 sticky top-0 w-full">
        <MainNavbar />
      </div>

      {/* -------------------create post---------------------- */}
      <CreatePost />

      {/* ----------------------post list--------------------------- */}
      {/* <div>
        <PostItem post={post} />
      </div> */}
    </div>
  );
}
