import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";

export default function PostSkeleton() {
  return (
    <Card
      radius="none"
      className="border-b border-gray-700 bg-black px-4 py-3"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />

        {/* Right content */}
        <div className="flex-1 space-y-3">
          {/* Name + username */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>

          {/* Tweet text */}
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-5/6 rounded-md" />
          <Skeleton className="h-3 w-2/3 rounded-md" />

          {/* Image preview (optional like Twitter) */}
          <Skeleton className="h-48 w-full rounded-xl mt-2" />
        </div>
      </div>
    </Card>
  );
}