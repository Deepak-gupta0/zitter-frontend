import { ReactNode } from "react";
import SideNavigateBar from "@/components/SideNavigateBar";
import MainSidebar from "@/components/mainSidebar";
import { getUserProfile } from "@/services/ProfileServices/profile.server.services";


export interface ProfileResponse {
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  success: true;
}

export interface ProfileNullResponse {
  success: false;
}

export default async function Layout({ children }: { children: ReactNode }) {
  const res: ProfileResponse | ProfileNullResponse = await getUserProfile();
  // console.log(res);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1280px] mx-auto flex">
        {/* Left Sidebar - Navigation */}
        <aside className="lg:w-[275px] hidden md:block flex-shrink-0 sticky top-0 h-screen overflow-y-auto ">
          <SideNavigateBar res={res}/>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 border-r border-l border-gray-700">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="lg:w-[350px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden lg:block">
          <MainSidebar />
        </aside>
      </div>
    </div>
  );
}