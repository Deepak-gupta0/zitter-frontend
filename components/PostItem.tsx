import social from "@/public/origami.png";
import Image from "next/image";
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share } from "lucide-react";

interface Owner {
  _id: string;
  username: string;
  avartar: string;
  fullName: string;
}

interface MediaFile {
  type: "image" | "video" | "gif";
  url: string;
  publicId: string;
  width: number;
  height: number;
  duration?: number;
}

interface Post {
  _id: string;
  content: string;
  owner: Owner;
  media: MediaFile[];
  replyCount: number;
  repostCount: number;
  quoteCount: number;
  likesCount: number;
  viewCount: number;
  type: "QUOTE" | "TWEET";
  createdAt: string;
  updatedAt: string;
}

const PostItem = ({ post }: { post: Post }) => {
  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderMedia = () => {
    if (!post.media || post.media.length === 0) return null;

    const mediaCount = post.media.length;

    // 1 media - full width
    if (mediaCount === 1) {
      return (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-700">
          <div className="relative w-full aspect-video max-h-[500px] bg-gray-800">
            {post.media[0].type === "image" ? (
              <Image
                src={post.media[0].url}
                alt="Post media"
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={post.media[0].url}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      );
    }

    // 2 media - side by side
    if (mediaCount === 2) {
      return (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-2 gap-0.5">
            {post.media.map((item, index) => (
              <div key={index} className="relative aspect-square bg-gray-800">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt="Post media"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3 media - first big, other 2 stacked on right
    if (mediaCount === 3) {
      return (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-2 gap-0.5 h-[400px]">
            {/* First media - takes full left side */}
            <div className="relative bg-gray-800">
              {post.media[0].type === "image" ? (
                <Image
                  src={post.media[0].url}
                  alt="Post media"
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={post.media[0].url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Right side - 2 media stacked */}
            <div className="grid grid-rows-2 gap-0.5">
              {post.media.slice(1, 3).map((item, index) => (
                <div key={index} className="relative bg-gray-800">
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt="Post media"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 4+ media - 2x2 grid
    return (
      <div className="mb-3 rounded-2xl overflow-hidden border border-gray-700">
        <div className="grid grid-cols-2 gap-0.5">
          {post.media.slice(0, 4).map((item, index) => (
            <div key={index} className="relative aspect-square bg-gray-800">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt="Post media"
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              {/* Show +N badge if more than 4 media */}
              {index === 3 && post.media.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    +{post.media.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-3 border-b border-gray-700 px-4 py-3 hover:bg-gray-900/30 transition-colors cursor-pointer">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
          <Image 
            src={post.owner.avartar || social} 
            alt={post.owner.fullName}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-1 mb-1">
          <span className="font-bold text-white hover:underline">
            {post.owner.fullName}
          </span>
          <span className="text-gray-500">@{post.owner.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 text-sm">
            {formatTime(post.createdAt)}
          </span>
        </div>

        {/* Post Content */}
        <p className="text-white text-[15px] mb-3 whitespace-pre-wrap break-words">
          {post.content}
        </p>

        {/* Media */}
        {renderMedia()}

        {/* Action Buttons */}
        <div className="flex items-center justify-between max-w-[425px] mt-2">
          {/* Reply */}
          <button className="flex items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-blue-900/30 transition-colors">
              <MessageCircle className="w-[18px] h-[18px] text-gray-500 group-hover:text-blue-500" />
            </div>
            {post.replyCount > 0 && (
              <span className="text-sm text-gray-500 group-hover:text-blue-500">
                {formatCount(post.replyCount)}
              </span>
            )}
          </button>

          {/* Repost */}
          <button className="flex items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-green-900/30 transition-colors">
              <Repeat2 className="w-[18px] h-[18px] text-gray-500 group-hover:text-green-500" />
            </div>
            {post.repostCount > 0 && (
              <span className="text-sm text-gray-500 group-hover:text-green-500">
                {formatCount(post.repostCount)}
              </span>
            )}
          </button>

          {/* Like */}
          <button className="flex items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-pink-900/30 transition-colors">
              <Heart className="w-[18px] h-[18px] text-gray-500 group-hover:text-pink-500" />
            </div>
            {post.likesCount > 0 && (
              <span className="text-sm text-gray-500 group-hover:text-pink-500">
                {formatCount(post.likesCount)}
              </span>
            )}
          </button>

          {/* Views */}
          <button className="flex items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-blue-900/30 transition-colors">
              <BarChart3 className="w-[18px] h-[18px] text-gray-500 group-hover:text-blue-500" />
            </div>
            {post.viewCount > 0 && (
              <span className="text-sm text-gray-500 group-hover:text-blue-500">
                {formatCount(post.viewCount)}
              </span>
            )}
          </button>

          {/* Bookmark & Share */}
          <div className="flex items-center gap-0">
            <button className="p-2 rounded-full hover:bg-blue-900/30 transition-colors group">
              <Bookmark className="w-[18px] h-[18px] text-gray-500 group-hover:text-blue-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-900/30 transition-colors group">
              <Share className="w-[18px] h-[18px] text-gray-500 group-hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;