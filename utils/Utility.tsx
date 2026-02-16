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
