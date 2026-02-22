import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";

interface PostProps {
  type: "post";
  placeholder: string;
}
interface CommentProps {
  type: "comment";
  placeholder: string;
  tweet: string;
}

interface ReplyProps {
  type: "reply";
  placeholder: string;
  tweet: string;
  parentComment: string;
}

export function AIInputWithSearchDemo(props: PostProps | CommentProps | ReplyProps) {
  return (
    <div className="min-w-[350px]">
      {props.type === "post" ? (
        <AIInputWithSearch type="post" placeholder={props.placeholder} />
      ) : (
        <AIInputWithSearch
          type="comment"
          placeholder={props.placeholder}
          tweet={props.tweet}
        />
      )}
    </div>
  );
}
