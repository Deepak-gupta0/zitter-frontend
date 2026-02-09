import { MoreHorizontal, User } from "lucide-react";
import Image from "next/image";

interface UserPrfileBtnProps {
  username: string;
  fullName?: string;
  avatar?: string;
  email: string;
}

const UserProfileBtn = ({
  email,
  username,
  avatar,
  fullName,
}: UserPrfileBtnProps) => {
  return (
    <div className="mb-3">
      <button className="w-full flex items-center gap-3 p-3 rounded-full hover:bg-gray-100/10 transition-colors">
        <div className="w-10 h-10 bg-gray-300 rounded-full relative overflow-hidden flex items-center justify-center">
          {avatar ? (
            <Image
              src={avatar}
              alt="Profile image"
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-gray-600" />
          )}
        </div>
        <div className="flex-1 text-left">
          <div className="font-bold text-sm">{fullName || username}</div>
          <div className="text-gray-500 text-sm">@{username}</div>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserProfileBtn;
