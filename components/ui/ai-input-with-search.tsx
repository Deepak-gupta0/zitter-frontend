"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";
import { createTweet } from "@/services/Tweets-services/tweets.services";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import CircularProgress from "../CircularProgress";

type PreviewItem = {
  url: string;
  type: "image" | "video";
};

export function AIInputWithSearch({
  id = "ai-input-with-search",
  placeholder = "What's happening? Create your own tweets",
  minHeight = 48,
  maxHeight = 164,
  className,
}: any) {
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState<PreviewItem[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]); // ✅ real files
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [loading, setLoading] = useState(false);
  const isDisabled =
    loading || (!value && !mediaFiles.length) || value.length > 280;
  const progress = Math.ceil((value.length * 100) / 280);

  // ✅ FILE SELECT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreview((prev: any) => [...prev, ...newPreviews]);
    setMediaFiles((prev) => [...prev, ...files]); // ✅ store files
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!value.trim() && !mediaFiles.length) return;

    //calling api.
    setLoading(true);
    const res = await createTweet(mediaFiles, value);

    if (res.success) {
      addToast({
        title: "Post published 🎉",
        description: "Your post has been shared successfully.",
        color: "success",
        variant: "flat",
        timeout: 3000,
      });
    } else {
      addToast({
        title: "Something went wrong",
        description: "Please try again later.",
        color: "danger",
        variant: "flat",
        timeout: 4000,
      });
    }

    // reset
    setValue("");
    setMediaFiles([]);
    setPreview([]);
    adjustHeight(true);
    setLoading(false);
  };

  // ✅ revoke preview URLs
  useEffect(() => {
    return () => {
      preview.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [preview]);


  return (
    <div className={cn("w-full py-4 border-b border-gray-700", className)}>
      <div className="relative max-w-xl w-full mx-auto outline rounded-xl">
        <Textarea
          id={id}
          value={value}
          placeholder={placeholder}
          ref={textareaRef}
          className="w-full rounded-xl rounded-b-none px-4 py-3 resize-none"
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
        />
        {value.length > 280 ? (
          <p className="mx-4 text-xs text-red-500">* Text limit exceed</p>
        ) : null}

        {/* PREVIEW */}
        <div className="flex flex-wrap px-3">
          {preview.map((item, i) => (
            <div key={i} className="mt-2 mr-2">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  className="w-20 h-20 rounded-md object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-20 h-20 rounded-md object-cover"
                  muted
                />
              )}
            </div>
          ))}
        </div>

        {/* ACTION BAR */}
        <div className="h-12 rounded-b-xl flex items-center justify-between px-3">
          <label className="cursor-pointer">
            <input
              type="file"
              name="media"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <ImagePlus className="w-5 h-5" />
          </label>

          <div className="flex gap-3 justify-center items-center">
            <div>
              <CircularProgress progress={progress} count={value.length} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-3xl disabled:bg-transparent disabled:outline disabled:cursor-not-allowed"
            >
              {loading ? (
                <Spinner color="warning" size="sm" />
              ) : (
                <span>Post</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
