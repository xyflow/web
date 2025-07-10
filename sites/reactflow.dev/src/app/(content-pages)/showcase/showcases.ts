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

export const externalShowcases: Showcase[] = [
  {
    title: 'Attio',
    description: 'Build out workflows to automate common actions across CRM processes',
    url: 'https://attio.com/product/automations',
    library: 'React Flow',
    email: '',
    image: 'https://f20vdoobtdxrjemr.public.blob.vercel-storage.com/showcases/217f4645-2242-8150-bf63-fb926c18c3de.png',
    status: 'published',
    project_type: 'commercial',
    tags: [
      {
        id: 0,
        name: 'Workflow Automation',
      },
    ],
    priority: 5,
    created_at: 'January 14, 2025 8:49 PM',
  },
  {
    title: 'ChartDB',
    email: '',
    description:
      'Open-source database diagrams editor, visualize and design your DB with a single query.',
    url: 'https://chartdb.io',
    library: 'React Flow',
    image: 'https://f20vdoobtdxrjemr.public.blob.vercel-storage.com/showcases/1c9f4645-2242-818b-b09d-e9d402957e91.png',
    demoUrl: 'https://app.chartdb.io',
    repoUrl: 'https://github.com/chartdb/chartdb',
    status: 'published',
    project_type: 'open source',
    tags: [{ id: '1', name: 'AI' }],
    priority: 3,
    created_at: 'January 14, 2025 8:49 PM',
  },
];
