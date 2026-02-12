import { Skeleton } from "@heroui/skeleton";
export default async function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1280px] mx-auto flex gap-0">

        {/* Left Sidebar Skeleton */}
        <aside className="lg:w-[275px] hidden md:block flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-gray-700 px-4 py-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 rounded-full bg-gray-800"
            />
          ))}
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 min-w-0 border-r border-l border-gray-700 px-4 py-6 space-y-6">

          {/* Page header */}
          <Skeleton className="h-6 w-1/3 rounded bg-gray-800" />

          {/* Posts */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-xl p-4 space-y-4"
            >
              {/* Avatar + username */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full bg-gray-800" />
                <Skeleton className="h-4 w-1/4 rounded bg-gray-800" />
              </div>

              {/* Content lines */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-gray-800" />
                <Skeleton className="h-4 w-5/6 rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar Skeleton */}
        <aside className="lg:w-[350px] hidden lg:block flex-shrink-0 sticky top-0 h-screen overflow-y-auto px-4 py-6 space-y-4">
          <Skeleton className="h-6 w-2/3 rounded bg-gray-800" />

          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-12 rounded-xl bg-gray-800"
            />
          ))}
        </aside>

      </div>
    </div>
  );
}