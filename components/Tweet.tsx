"use client";
import { useState } from "react";
import type { Post } from "./PostItem";
import Image from "next/image";
import { formatDate, formatTime } from "@/utils/Utility";

const TWEET = {
  name: "Arjun Mehta",
  handle: "@arjun_dev",
  verified: true,
  time: "4:32 PM · Feb 16, 2026",
  source: "Twitter for iPhone",
  text: "Hot take: The best engineers I know don't memorize syntax — they understand systems.\n\nThey Google everything and ship faster than anyone else.\n\nStop gatekeeping intelligence by how much trivia someone remembers. 🧵",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop",
  views: "2.4M",
  reposts: 18200,
  likes: 94100,
  quotes: "1,847",
  bookmarks: "12.3K",
};

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

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

function Avatar({
  initials,
  colorClass,
  size = "w-10 h-10",
  textSize = "text-sm",
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

function ActionBtn({ onClick, hoverColor, activeClass = "", children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full text-[#71767b] text-sm transition-all duration-150 cursor-pointer bg-transparent border-none ${hoverColor} ${activeClass}`}
    >
      {children}
    </button>
  );
}

export default function Tweet({ tweet }: { tweet: Post }) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [replies, setReplies] = useState(REPLIES);
  const [replyText, setReplyText] = useState("");
  console.log(tweet.owner.avatar);

  const toggleReplyLike = (id) =>
    setReplies((p) =>
      p.map((r) =>
        r.id === id
          ? {
              ...r,
              liked: !r.liked,
              likes: r.liked ? r.likes - 1 : r.likes + 1,
            }
          : r,
      ),
    );

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full border-x border-[#2f3336] min-h-screen">
        {/* ── HEADER ── */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md flex items-center gap-5 px-4 py-3 border-b border-[#2f3336]">
          <button className="p-2 rounded-full text-[#e7e9ea] hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer flex">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2z" />
            </svg>
          </button>
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

              <div>
                <div className="flex items-center gap-0.5 text-[#e7e9ea] font-bold text-[15px]">
                  {tweet.owner.fullName || tweet.owner.username} <Verified />
                </div>
                <div className="text-[#71767b] text-sm">
                  @{tweet.owner.username}
                </div>
              </div>
            </div>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={`px-4 py-1.5 rounded-full font-bold text-sm cursor-pointer transition-all duration-150 border
                ${
                  following
                    ? "bg-transparent text-[#e7e9ea] border-[#536471] hover:border-[#f91880] hover:text-[#f91880] hover:bg-[#f91880]/10"
                    : "bg-[#e7e9ea] text-[#0f1419] border-transparent hover:bg-[#d0d3d6]"
                }`}
            >
              {following ? "Following" : "Follow"}
            </button>
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
                {tweet.viewCount}
              </span>
              <span className="text-[#71767b]"> Views</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 flex-wrap border-t border-[#2f3336] border-b">
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-around py-1 border-b border-[#2f3336]">
            {/* Comment */}
            <ActionBtn hoverColor="hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
              </svg> {tweet.replyCount ? tweet.replyCount : ""}
            </ActionBtn>

            {/* Repost */}
            <ActionBtn
              onClick={() => setReposted((r) => !r)}
              hoverColor="hover:text-[#00ba7c] hover:bg-[#00ba7c]/10"
              activeClass={reposted ? "text-[#00ba7c]" : ""}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
              </svg>{tweet.repostCount ? tweet.repostCount : ""}
            </ActionBtn>

            {/* Like */}
            <ActionBtn
              onClick={() => setLiked((l) => !l)}
              hoverColor="hover:text-[#f91880] hover:bg-[#f91880]/10"
              activeClass={liked ? "text-[#f91880]" : ""}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {liked ? (
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                ) : (
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.86 1.074 1.99 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.62 7.126-6.61 1.111-2.08 1.03-3.74.477-4.86-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                )}
              </svg>{tweet.likesCount ? tweet.likesCount : ""}
            </ActionBtn>

            {/* Bookmark */}
            <ActionBtn
              onClick={() => setBookmarked((b) => !b)}
              hoverColor="hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10"
              activeClass={bookmarked ? "text-[#1d9bf0]" : ""}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {bookmarked ? (
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" />
                ) : (
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
                )}
              </svg> {tweet.bookmarksCount ? tweet.bookmarksCount : ""}
            </ActionBtn>

            {/* Share */}
            <ActionBtn hoverColor="hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
              </svg>
            </ActionBtn>
          </div>
        </div>

        {/* ── REPLY INPUT ── */}
        <div className="flex gap-3 px-4 py-3 border-b border-[#2f3336] items-start">
          <Avatar initials="ME" colorClass="bg-violet-600" />
          <div className="flex-1">
            <textarea
              className="w-full bg-transparent border-none outline-none text-[#e7e9ea] text-lg placeholder-[#536471] resize-none min-h-[56px] pt-1 font-[inherit]"
              placeholder="Post your reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-0.5">
                {/* Image */}
                <button className="p-2 rounded-full text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors bg-transparent border-none cursor-pointer flex">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zm6 4a1 1 0 110 2 1 1 0 010-2zm-4.5 8l3-4 2.5 3 2-2.5 3 3.5h-10.5z" />
                  </svg>
                </button>
                {/* Emoji */}
                <button className="p-2 rounded-full text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors bg-transparent border-none cursor-pointer flex">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75zM9 11.5c.828 0 1.5-.895 1.5-2S9.828 7.5 9 7.5 7.5 8.395 7.5 9.5 8.172 11.5 9 11.5zm6 0c.828 0 1.5-.895 1.5-2S15.828 7.5 15 7.5s-1.5.895-1.5 2 .672 2 1.5 2zm-7.5 2.5s1 3 4.5 3 4.5-3 4.5-3h-9z" />
                  </svg>
                </button>
              </div>
              <button
                disabled={!replyText.trim()}
                className="bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-[15px] px-5 py-1.5 rounded-full transition-colors cursor-pointer border-none"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* ── REPLIES ── */}
        {replies.map((r, i) => (
          <div
            key={r.id}
            className="flex gap-3 px-4 py-3 border-b border-[#2f3336] hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            {/* Avatar + thread line */}
            <div className="flex flex-col items-center">
              <Avatar initials={r.avatar} colorClass={r.color} />
              {i < replies.length - 1 && (
                <div className="w-0.5 flex-1 mt-1 min-h-4 bg-[#2f3336] rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-1">
              {/* Name row */}
              <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
                <span className="text-[#e7e9ea] font-bold text-[15px]">
                  {r.name}
                </span>
                {r.verified && <Verified />}
                <span className="text-[#71767b] text-sm">{r.handle}</span>
                <span className="text-[#71767b] text-sm">·</span>
                <span className="text-[#71767b] text-sm">{r.time}</span>
                <button className="ml-auto p-1.5 rounded-full text-[#71767b] hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-all bg-transparent border-none cursor-pointer flex">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                </button>
              </div>

              {/* Text */}
              <p className="text-[#e7e9ea] text-[15px] leading-relaxed mt-1 whitespace-pre-line">
                {r.text}
              </p>

              {/* Mini actions */}
              <div className="flex items-center gap-1 mt-2 -ml-2">
                <ActionBtn hoverColor="hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
                  </svg>
                </ActionBtn>

                <ActionBtn hoverColor="hover:text-[#00ba7c] hover:bg-[#00ba7c]/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                  </svg>
                </ActionBtn>

                <ActionBtn
                  onClick={() => toggleReplyLike(r.id)}
                  hoverColor="hover:text-[#f91880] hover:bg-[#f91880]/10"
                  activeClass={r.liked ? "text-[#f91880]" : ""}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    {r.liked ? (
                      <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                    ) : (
                      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.86 1.074 1.99 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.62 7.126-6.61 1.111-2.08 1.03-3.74.477-4.86-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                    )}
                  </svg>
                  <span className="text-xs">{fmt(r.likes)}</span>
                </ActionBtn>

                <ActionBtn hoverColor="hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
                  </svg>
                </ActionBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
