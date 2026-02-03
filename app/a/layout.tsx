import { ReactNode } from "react";
import { Navbar } from "@heroui/navbar";
import SideNavigateBar from "@/components/SideNavigateBar";
import MainSidebar from "@/components/mainSidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen container mx-auto justify-center">
      <div className="h-full border w-1/5 hidden md:block">
        <SideNavigateBar />
      </div>
      <main className="flex justify-between border md:w-[67%] w-full">
        {children}
        <div className="border w-1/3 md:block hidden">
        <MainSidebar />
        </div>
      </main>
    </div>
  );
}
