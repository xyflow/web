import * as React from 'react';

export type FooterCategory = { title: React.ReactNode; route: string };
export type FooterCategoryConfig = Record<string, FooterCategory[]>;

export const defaultCategories = {
  Projects: [
    { title: 'React Flow', route: 'https://reactflow.dev/' },
    { title: 'Svelte Flow', route: 'https://svelteflow.dev/' },
  ],
  Community: [
    { title: 'Discord', route: 'https://discord.gg/RVmnytFmGW' },
    { title: 'Github', route: 'https://github.com/xyflow' },
    { title: 'X / Twitter', route: 'https://x.com/xyflowdev' },
    { title: 'Bluesky', route: 'https://bsky.app/profile/xyflow.com' },
  ],
  xyflow: [
    { title: 'Blog', route: 'https://xyflow.com/blog' },
    { title: 'Open Source', route: 'https://xyflow.com/open-source' },
    { title: 'About', route: 'https://xyflow.com/about' },
    { title: 'Contact', route: 'https://xyflow.com/contact' },
    {
      title: (
        <div className="flex items-center gap-1">
          Careers{' '}
          <span className="bg-primary-foreground text-primary rounded-full text-xs px-1 py-0.5">
            hiring
          </span>
        </div>
      ),
      route: 'https://xyflow.com/careers',
    },
  ],
  Legal: [
    { title: 'Terms of Use', route: 'https://xyflow.com/terms-of-use' },
    {
      title: 'Ethical Standards',
      route: 'https://xyflow.com/ethical-standards',
    },
    { title: 'Privacy Policy', route: 'https://xyflow.com/privacy' },
    { title: 'Imprint', route: 'https://xyflow.com/imprint' },
  ],
};
