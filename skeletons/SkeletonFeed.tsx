import {PostSkeleton} from "./PostSkeleton";

function SkeletonFeed({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}

export default SkeletonFeed;