
export  function extractErrorMessage(html: unknown): string | null {
  if (typeof html !== "string") return null;

  // Step 1: <pre>...</pre> content extract
  const preMatch = html.match(/<pre>([\s\S]*?)<\/pre>/i);
  if (!preMatch) return null;

  let text = preMatch[1];

  // Step 2: <br> ke pehle ka text
  text = text.split("<br>")[0];

  // Step 3: "Error:" hatao
  text = text.replace(/^Error:\s*/i, "");

  return text.trim() || null;
}