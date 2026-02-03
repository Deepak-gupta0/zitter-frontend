import Image from "next/image";
import logo from "@/public/origami.png";
import { Home, Search, Bell, Mail, Users, Bookmark, User, MoreHorizontal } from "lucide-react";

const SideNavigateBar = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Explore" },
    { icon: Bell, label: "Notifications" },
    { icon: Mail, label: "Messages" },
    { icon: Users, label: "Communities" },
    { icon: Bookmark, label: "Bookmarks" },
    { icon: User, label: "Profile" },
    { icon: MoreHorizontal, label: "More" },
  ];

  return (
    <div className="h-screen flex flex-col justify-between px-3 py-2 border-r border-gray-200">
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
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-full hover:bg-gray-100/10 transition-colors ${
                item.active ? "font-bold" : "font-normal"
              }`}
            >
              <item.icon className="w-7 h-7" strokeWidth={item.active ? 2.5 : 2} />
              <span className="text-xl">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Post Button */}
        <button className="w-full mt-4 bg-blue-500 text-white font-bold text-lg py-3 rounded-full hover:bg-blue-600 transition-colors">
          Post
        </button>
      </div>

      {/* Bottom Profile Section */}
      <div className="mb-3">
        <button className="w-full flex items-center gap-3 p-3 rounded-full hover:bg-gray-100/10 transition-colors">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold text-sm">Your Name</div>
            <div className="text-gray-500 text-sm">@username</div>
          </div>
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SideNavigateBar;