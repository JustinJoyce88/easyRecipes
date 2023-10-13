export default function renderIf(condition: any, content: any) {
  if (condition) {
    return content;
  }
  return null;
}
