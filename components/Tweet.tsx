import type { Post } from "./PostItem";
import Image from "next/image";
import { formatDate, formatTime, formatViewsCount } from "@/utils/Utility";
import BackButton from "./BackButton";
import FollowButton from "./FollowButton";
import { AIInputWithSearchDemo } from "./demo";
import CommentsList from "./CommentsList";

const REPLIES = [
  {
    id: 1,
    name: "Priya Sharma",
    handle: "@priya_codes",
    avatar: "PS",
    color: "bg-violet-600",
    verified: false,
    time: "2h",
    text: "This is exactly right. I've worked with people who ace whiteboard interviews but can't debug a prod issue to save their life.",
    likes: 3241,
    liked: false,
  },
  {
    id: 2,
    name: "Rahul Dev",
    handle: "@rahulbuilds",
    avatar: "RD",
    color: "bg-emerald-600",
    verified: true,
    time: "1h",
    text: "Replying to @arjun_dev\n\nThe whole industry is slowly realizing this. Look at how hiring has shifted post-ChatGPT. Docs are open, search is open. Always has been. 🤝",
    likes: 891,
    liked: false,
  },
  {
    id: 3,
    name: "Neha Singh",
    handle: "@neha_tech",
    avatar: "NS",
    color: "bg-red-600",
    verified: false,
    time: "45m",
    text: "Counterpoint: fundamentals matter. Understanding WHY something works means you can debug when Google doesn't have the answer.",
    likes: 2104,
    liked: false,
  },
  {
    id: 4,
    name: "Karan Malhotra",
    handle: "@karan_m",
    avatar: "KM",
    color: "bg-amber-600",
    verified: false,
    time: "30m",
    text: "Saved this. Showing to every hiring manager who makes me do syntax quizzes.",
    likes: 542,
    liked: false,
  },
  {
    id: 5,
    name: "Sanya AI",
    handle: "@sanya_ai",
    avatar: "SA",
    color: "bg-cyan-600",
    verified: true,
    time: "12m",
    text: "The best engineers I know spend 80% of their time thinking and 20% typing. The typing part? AI handles that now anyway.",
    likes: 1337,
    liked: false,
  },
];

// const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

function Avatar({
  initials,
  colorClass,
  size = "w-10 h-10",
  textSize = "text-sm",
}: {
  initials: string;
  colorClass: string;
  size: string;
  textSize: string;
}) {
  return (
    <div
      className={`${size} ${colorClass} ${textSize} rounded-full flex items-center justify-center shrink-0 font-bold text-white`}
    >
      {initials}
    </div>
  );
}

function Verified() {
  return (
    <svg viewBox="0 0 22 22" className="w-4 h-4 shrink-0 inline-block ml-0.5">
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="#1d9bf0"
      />
    </svg>
  );
}

// function ActionBtn({ onClick, hoverColor, activeClass = "", children }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full text-[#71767b] text-sm transition-all duration-150 cursor-pointer bg-transparent border-none ${hoverColor} ${activeClass}`}
//     >
//       {children}
//     </button>
//   );
// }

export default function Tweet({ tweet }: { tweet: Post }) {
  // const [liked, setLiked] = useState(false);
  // const [reposted, setReposted] = useState(false);
  // const [bookmarked, setBookmarked] = useState(false);
  // const [following, setFollowing] = useState(tweet.owner.isFollow);
  // const [replies, setReplies] = useState(REPLIES);
  // const [replyText, setReplyText] = useState("");
  // const toggleReplyLike = (id) =>
  //   setReplies((p) =>
  //     p.map((r) =>
  //       r.id === id
  //         ? {
  //             ...r,
  //             liked: !r.liked,
  //             likes: r.liked ? r.likes - 1 : r.likes + 1,
  //           }
  //         : r,
  //     ),
  //   );

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full border-x border-[#2f3336] min-h-screen">
        {/* ── HEADER ── */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md flex items-center gap-5 px-4 py-3 border-b border-[#2f3336]">
          <BackButton />
          <span className="text-[#e7e9ea] font-bold text-xl">Post</span>
        </div>

        {/* ── TWEET CARD ── */}
        <div className="px-4 pt-4 pb-0 border-b border-[#2f3336]">
          {/* Author row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {tweet.owner.avatar ? (
                <div className="relative w-11 h-11">
                  <Image
                    src={tweet.owner.avatar || ""}
                    alt="profile image"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <Avatar
                  initials={tweet.owner.username.slice(0, 2).toUpperCase()}
                  colorClass="bg-[#1d9bf0]"
                  size="w-11 h-11"
                  textSize="text-base"
                />
              )}

              <div className="cursor-pointer group">
                <div className="flex items-center gap-0.5 text-[#e7e9ea] font-bold text-[15px] group-hover:underline">
                  {tweet.owner.fullName || tweet.owner.username} <Verified />
                </div>
                <div className="text-[#71767b] text-sm">
                  @{tweet.owner.username}
                </div>
              </div>
            </div>
            {tweet?.owner && tweet.owner._id && (
              <FollowButton
                isFollow={!!tweet.owner.isFollow}
                isLoggined={!!tweet.owner.isLoggined}
                channelId={tweet.owner._id}
              />
            )}
          </div>

          {/* Tweet text */}
          <p className="mt-4 text-[#e7e9ea] md:text-[20px]  leading-[1.45] whitespace-pre-line">
            {tweet.content ? tweet.content : ""}
          </p>

          {/* Tweet image */}
          {tweet.owner?.avatar && (
            <div className="relative mt-4 w-full h-72 rounded-2xl overflow-hidden border border-[#2f3336]">
              <Image
                src={tweet.owner.avatar}
                alt="post"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-1.5 flex-wrap text-[#71767b] text-sm py-3">
            <span>{formatTime(tweet.createdAt)}</span>
            <span>·</span>
            <span>{formatDate(tweet.createdAt)}</span>
            <span>·</span>
            <div className="group">
              <span className="text-[#e7e9ea] font-bold group-hover:underline">
                {formatViewsCount(tweet.viewCount)}
              </span>
              <span className="text-[#71767b]"> Views</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 flex-wrap border-t border-[#2f3336] border-b"></div>

          {/* Action buttons */}
        </div>

        {/* ── Comment INPUT ── */}
        <AIInputWithSearchDemo
          type="comment"
          placeholder={`Add a comment on ${tweet.owner.fullName || tweet.owner.username}'s post`}
          tweet={tweet._id}
        />
      <div className="p-3">
        <CommentsList tweetId={tweet._id} />
      </div>
      </div>
    </div>
  );
}
