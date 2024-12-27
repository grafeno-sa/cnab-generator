export function replaceSubstring(string, startIndex, endIndex, replacement) {
  const before = string.slice(0, startIndex - 1);
  const after = string.slice(endIndex);

  return before + replacement + after;
}
