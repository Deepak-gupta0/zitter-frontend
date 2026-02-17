import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";

export function AIInputWithSearchDemo({type, placeholder}: {type: "comment" | "post", placeholder: string}) {
  return (
    <div className="min-w-[350px]">
      <AIInputWithSearch type={type} placeholder={placeholder}/>
    </div>
  );
}
