import Link from 'next/link';
import Image from 'next/image';

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
  { title: 'Terms of Use', route: '/terms-of-use' },
  { title: 'Ethical Standards', route: '/ethical-standards' },
  { title: 'Privacy', route: '/privacy' },
  { title: 'Imprint', route: '/imprint' },
];

const social = [
  { title: 'Open Source', route: '/open-source' },
  { title: 'Showcase', route: '/showcase' },
  { title: 'Case Studies', route: '/case-studies' },
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
      <div className="mx-auto lg:flex text-white max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="lg:max-w-[300px] lg:mr-24 shrink-0">
          <div>A message from the team</div>
          <div className="font-black text-3xl tracking-tight leading-none mb-4 lg:mb-8">
            Cared for by the Xyflow team. We’ve been building and maintaining
            React Flow since 2021.
          </div>

          <Image
            src="/img/footer-about.jpg"
            alt="Team photo"
            width={795}
            height={338}
          />
        </div>
        <div className="grow">
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-gap-4">
            {categories.map((category) => (
              <div key={category.title} className="mt-4 lg:mt-0">
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
