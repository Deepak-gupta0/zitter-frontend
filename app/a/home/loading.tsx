import SkeletonFeed from "@/skeletons/SkeletonFeed";

export default function Loading() {
  return (
    <div>
      <SkeletonFeed count={5}/>
    </div>
  );
}