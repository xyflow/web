export enum Framework {
  REACT = 'react',
}

export type ProExampleVariant = {
  id: string;
  label: string;
};

export type ProExampleConfig = {
  id: string;
  name?: string;
  description?: string;
  framework: string;
  hidden?: boolean;
  variants?: ProExampleVariant[];
  free?: boolean;
  type?: 'template' | 'example';
  previewUrl?: string;
};
