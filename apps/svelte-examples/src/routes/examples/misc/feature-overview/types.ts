import { type BuiltInNode, type Node } from '@xyflow/svelte';

export type AnnotationNode = Node<{ label: string; level: number; arrowStyle?: string }>;
export type CircleNode = Node<{}>;

export type AppNode = BuiltInNode | AnnotationNode | CircleNode;
