"use client"
import { useState, useRef } from "react";
import { AIInputWithSearchDemo } from "./demo";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const isPostActive = text.trim().length > 0 || images.length > 0;

  // highlight @ and #
  const formatText = (value: string) => {
    return value
      .replace(/(@\w+)/g, `<span class="text-red-500">$1</span>`)
      .replace(/(#\w+)/g, `<span class="text-red-500">$1</span>`)
      .replace(/\n/g, "<br/>");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imgs = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...imgs]);
  };

  return (
    <AIInputWithSearchDemo />
  )
}