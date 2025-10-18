import { ContentBlock } from "@langchain/core/messages";

export function extractText(content: string | (ContentBlock | Text)[]): string {
  if (typeof content === 'string') {
    return content.trim();
  }
  return content
    .map(block => {
      if (typeof block === 'string') return block;
      if ('text' in block) return block.text;
      return '';
    })
    .join(' ')
    .trim();
}
