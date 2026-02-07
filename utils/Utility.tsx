export const highlightText = (text: string) => {
  const regex = /([#@][\w]+)/g;

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-blue-500">
        {part}
      </span>
    ) : (
      part
    )
  );
};
