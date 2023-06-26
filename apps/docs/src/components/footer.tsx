import Link from 'next/link';

const docs = [
  { title: 'React Flow API', route: '/react-flow' },
  { title: 'Svelte Flow API', route: '/svelte-flow' },
];

const libraries = [
  { title: 'React Flow', route: '/react-flow' },
  { title: 'Svelte Flow', route: '/svelte-flow' },
];

const company = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Terms of Service', route: '/terms' },
  { title: 'Imprint', route: '/imprint' },
];

const social = [
  { title: 'Open Source', route: '/open-source' },
  { title: 'Showcase', route: '/showcase' },
  { title: 'Case studies', route: '/case-studies' },
];

const categories = [
  {
    title: 'Docs',
    items: docs,
  },
  {
    title: 'Libraries',
    items: libraries,
  },
  {
    title: 'Company',
    items: company,
  },
  {
    title: 'Social',
    items: social,
  },
];

export default function Footer() {
  return (
    <footer className="bg-black print:bg-transparent py-10">
      <div className="mx-auto flex text-white max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="min-w-[300px] shrink-0">image</div>
        <div className="grow self-end">
          <div className="grid grid-cols-4 grid-gap-4">
            {categories.map((category) => (
              <div key={category.title}>
                <div className="text-gray-400 mb-2">{category.title}</div>
                {category.items.map((item) => (
                  <Link href={item.route} className="block" key={item.route}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
