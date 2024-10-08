import { type Node } from '@xyflow/react';

export type TextNode = Node<{ text: string }, 'text'>;
export type ResultNode = Node<{}, 'result'>;
export type UppercaseNode = Node<{ text: string }, 'uppercase'>;
export type MyNode = TextNode | ResultNode | UppercaseNode;

export function isTextNode(
  node: any,
): node is TextNode | UppercaseNode | undefined {
  return !node ? false : node.type === 'text' || node.type === 'uppercase';
}
