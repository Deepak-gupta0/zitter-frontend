import SkeletonFeed from "@/components/SkeletonFeed";

export default function Loading() {
  return (
    <div>
      <SkeletonFeed count={5}/>
    </div>
  );
}