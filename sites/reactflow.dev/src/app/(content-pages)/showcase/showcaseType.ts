type Showcase = {
  // required
  title: string;
  description: string;
  url: string;
  library: 'React Flow' | 'Svelte Flow' | 'Vue Flow';
  image: string;
  email: string;

  // optional
  tags?: {
    id: string;
    name:
      | 'Image Processing'
      | 'Developer Tool'
      | '3D'
      | 'AI'
      | 'Workflow Automation'
      | 'Audio'
      | 'Knowledge Graph';
  }[];
  repoUrl?: string;
  demoUrl?: string;
  projectType?: 'commercial' | 'open source';
  comment?: string;

  // internal
  internalComment?: string;
  createdAt?: string;
  priority?: 1 | 2 | 3 | 4 | 5;
  status: 'published' | 'hidden' | 'confirm';
};