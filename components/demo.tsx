import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";

export function AIInputWithSearchDemo() {
  return (
    <div className="min-w-[350px]">
      <AIInputWithSearch
        onSubmit={(value, withSearch) => {
          console.log("Message:", value);
          console.log("Search enabled:", withSearch);
        }}
        onFileSelect={(file) => {
          console.log("Selected file:", file);
        }}
      />
    </div>
  );
}