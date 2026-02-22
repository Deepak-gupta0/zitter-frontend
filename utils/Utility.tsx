export const highlightText = (text: string) => {
  const regex = /([#@][\w]+)/g;

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-blue-500">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
};

export function formatViewsCount(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}