"use client"
import { useState, useEffect } from "react";
import { Skeleton } from "@heroui/skeleton";

function ShimmerBlock({ w = "w-full", h = "h-4", rounded = "rounded-md", className = "" }) {
  return (
    <Skeleton className={`${w} ${h} ${rounded} ${className}`}>
      <div className={`${w} ${h} ${rounded} bg-[#2f3336]`} />
    </Skeleton>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const loaded = !isLoading;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="flex w-full">
        {/* ── MAIN COLUMN ── */}
        <main className="flex-1 min-h-screen border-x border-[#2f3336]">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-[#2f3336] flex items-center gap-6">
            <button className="p-2 rounded-full hover:bg-[#181818]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#e7e9ea]"><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2z"/></svg>
            </button>
            <span className="text-[#e7e9ea] font-bold text-xl">Post</span>
          </div>

          {/* ── TWEET CARD ── */}
          <div className="px-4 pt-4 pb-3 border-b border-[#2f3336]">

            {/* Author Row */}
            <div className="flex items-start gap-3">
              <Skeleton isLoaded={loaded} className="rounded-full shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#2f3336]" />
              </Skeleton>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <ShimmerBlock w="w-28" h="h-[15px]" />
                    <ShimmerBlock w="w-20" h="h-[13px]" />
                  </div>
                  <Skeleton isLoaded={loaded} className="rounded-full">
                    <div className="px-4 py-1 rounded-full bg-[#e7e9ea] text-black text-sm font-bold">Follow</div>
                  </Skeleton>
                </div>
              </div>
            </div>

            {/* Tweet Text */}
            <div className="mt-3 space-y-2">
              <ShimmerBlock w="w-full" h="h-[15px]" />
              <ShimmerBlock w="w-full" h="h-[15px]" />
              <ShimmerBlock w="w-3/4" h="h-[15px]" />
            </div>

            {/* Tweet Image */}
            <Skeleton isLoaded={loaded} className="rounded-2xl mt-3 w-full">
              <div className="w-full h-64 rounded-2xl bg-[#2f3336]" />
            </Skeleton>

            {/* Timestamp + Source */}
            <div className="flex items-center gap-1.5 mt-3">
              <ShimmerBlock w="w-24" h="h-[13px]" />
              <span className="text-[#555]">·</span>
              <ShimmerBlock w="w-16" h="h-[13px]" />
              <span className="text-[#555]">·</span>
              <ShimmerBlock w="w-20" h="h-[13px]" />
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 py-3 border-y border-[#2f3336] mt-3">
              {["w-16", "w-20", "w-14", "w-18"].map((w, i) => (
                <ShimmerBlock key={i} w={w} h="h-[15px]" />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around pt-2 pb-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} isLoaded={loaded} className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-[#2f3336]" />
                </Skeleton>
              ))}
            </div>
          </div>

          {/* ── REPLY INPUT ── */}
          <div className="px-4 py-3 border-b border-[#2f3336] flex items-start gap-3">
            <Skeleton isLoaded={loaded} className="rounded-full shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#2f3336]" />
            </Skeleton>
            <div className="flex-1 space-y-2 pt-2">
              <ShimmerBlock w="w-2/3" h="h-[15px]" />
            </div>
            <Skeleton isLoaded={loaded} className="rounded-full shrink-0">
              <div className="px-4 py-1 rounded-full bg-[#1d9bf0] text-white text-sm font-bold">Reply</div>
            </Skeleton>
          </div>

          {/* ── REPLIES ── */}
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="px-4 py-3 border-b border-[#2f3336] hover:bg-[#080808] cursor-pointer">
              <div className="flex gap-3">
                {/* Avatar + thread line */}
                <div className="flex flex-col items-center shrink-0">
                  <Skeleton isLoaded={loaded} className="rounded-full">
                    <div className="w-10 h-10 rounded-full bg-[#2f3336]" />
                  </Skeleton>
                  {idx < 4 && (
                    <div className="w-[2px] flex-1 mt-1 min-h-[20px] bg-[#2f3336] rounded-full" />
                  )}
                </div>

                <div className="flex-1 space-y-2 min-w-0 pb-1">
                  {/* Name + handle + time */}
                  <div className="flex items-center gap-2">
                    <ShimmerBlock w={idx % 2 === 0 ? "w-20" : "w-28"} h="h-[14px]" />
                    <ShimmerBlock w="w-12" h="h-[13px]" />
                    <ShimmerBlock w="w-6" h="h-[13px]" />
                  </div>
                  {/* Reply text */}
                  <ShimmerBlock w="w-full" h="h-[14px]" />
                  {idx % 3 !== 2 && <ShimmerBlock w={idx % 2 === 0 ? "w-4/5" : "w-3/5"} h="h-[14px]" />}
                  {/* Mini action row */}
                  <div className="flex items-center gap-6 pt-1">
                    {["w-8", "w-8", "w-8", "w-8"].map((w, i) => (
                      <ShimmerBlock key={i} w={w} h="h-[13px]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Replay button */}
      {!isLoading && (
        <button
          onClick={() => setIsLoading(true)}
          className="fixed bottom-6 right-6 bg-[#1d9bf0] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#1a8cd8] transition-colors z-50"
        >
          ↺ Replay Shimmer
        </button>
      )}
    </div>
  );
}