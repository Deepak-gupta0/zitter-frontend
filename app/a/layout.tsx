import { ReactNode } from "react";
import SideNavigateBar from "@/components/SideNavigateBar";
import MainSidebar from "@/components/mainSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1280px] mx-auto flex">
        {/* Left Sidebar - Navigation */}
        <aside className="w-[275px] hidden md:block flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-gray-800">
          <SideNavigateBar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 border-r border-gray-800">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden lg:block">
          <MainSidebar />
        </aside>
      </div>
    </div>
  );
}