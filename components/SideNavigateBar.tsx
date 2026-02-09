"use client"
import Image from "next/image";
import logo from "@/public/origami.png";
import {
  Home,
  Search,
  Bell,
  Mail,
  Users,
  Bookmark,
  User,
  MoreHorizontal,
} from "lucide-react";
import UserProfileBtn from "./UserProfileBtn";
import Link from "next/link";
import type { ProfileNullResponse, ProfileResponse } from "@/app/a/layout";
import { usePathname } from "next/navigation";


const SideNavigateBar = ({res}:{res: ProfileResponse | ProfileNullResponse}) => {
  const pathName = usePathname()
  console.log(pathName)

  const isActive = (path: string) =>
  pathName === path || pathName.startsWith(path + "/");

  const navItems = [
    { icon: Home, label: "Home", active: isActive("/a/home"), redirectTo: "/a/home" },
    { icon: Search, label: "Explore", redirectTo: "/a/explore", active: isActive("/a/explore") },
    { icon: Bell, label: "Notifications", redirectTo: "/a/notification", active: isActive("/a/notification") },
    { icon: Mail, label: "Messages", redirectTo: "/a/message", active: isActive("/a/message") },
    { icon: Users, label: "Communities", redirectTo: "/a/communities", active: isActive("/a/communities") },
    { icon: Bookmark, label: "Bookmarks", redirectTo: "/a/bookmarks", active: isActive("/a/bookmarks") },
    { icon: User, label: "Profile", redirectTo: res.success ? `/a/profile/${res.username}` : "/login" },
    { icon: MoreHorizontal, label: "More", redirectTo: "/a/more", active: isActive("/a/more") },
  ];
  
  return (
    <div className="h-screen flex flex-col justify-between px-3 py-2 ">
      {/* Top Section */}
      <div className="flex-1">
        {/* Logo */}
        <div className="p-3 ml-3 mb-2 w-12 h-12 dark:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
          <Image
            alt="logo"
            src={logo}
            width={30}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              href={item.redirectTo}
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-full ${item.active ? `bg-gray-100/10` : null} hover:bg-gray-100/10 transition-colors ${
                item.active ? "font-bold" : "font-normal"
              }`}
            >
              <item.icon
                className="w-7 h-7"
                strokeWidth={2}
                fill={item.active ? "white" : "none"}
              />
              <span className="lg:text-xl text-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Post Button */}
        {res.success ? (
          <button className="w-full mt-4 bg-blue-500 text-white font-bold text-lg py-3 rounded-full hover:bg-blue-600 transition-colors">
            Post
          </button>
        ) : (
          <div>
            <Link
              href={"/login"}
              className="w-full mt-4 bg-blue-500 text-white font-bold text-lg py-3 rounded-full hover:bg-blue-600 transition-colors block text-center"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="w-full mt-4 bg-gray-100 text-black font-bold text-lg py-3 rounded-full block text-center"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Profile Section */}
      {res.success && (
        <UserProfileBtn
          username={res.username}
          fullName={res.fullName}
          email={res.email}
          avatar={res.avatar}
        />
      )}
    </div>
  );
};

export default SideNavigateBar;
