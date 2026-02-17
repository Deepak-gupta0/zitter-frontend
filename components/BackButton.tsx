"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className="p-2 rounded-full text-[#e7e9ea] hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer flex">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2z" />
      </svg>
    </button>
  );
};

export default BackButton;
