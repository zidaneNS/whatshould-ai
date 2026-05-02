export function cleanAIResponse(raw: string) {
  return raw
    .replace(/```json|```/g, '') // hapus markdown
    .replace(/\n/g, '') // hapus newline
    .replace(/,\s*}/g, '}') // trailing comma
    .replace(/,\s*]/g, ']');
}