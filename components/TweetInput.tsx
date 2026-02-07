import { highlightText } from "@/utils/Utility";
import React from "react";

interface TweetInputProps {
  textareaRef: any;
  handleInput: () => void;
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
}

export default function TweetInput({textareaRef, handleInput, context, setContext} : TweetInputProps) {
  
  return (
    <div className="max-w-[90vw] md:w-lg lg:w-xl px-4 ">
      <div
        className="
          whitespace-pre-wrap
          break-words
          text-xl
          pointer-events-none
        "
      >
        {highlightText(context)}
      </div>

      {/* Actual textarea */}
      <textarea
        ref={textareaRef}
        value={context}
        onChange={(e) => setContext(e.target.value)}
        rows={1}
        placeholder="What’s happening?"
        className="
          relative
          w-full
          resize-none
          bg-transparent
          text-xl
          outline-none
          caret-black
          text-transparent
        "
      />
    </div>
  );
}
