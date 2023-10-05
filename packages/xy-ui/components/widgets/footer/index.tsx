import Link from 'next/link';
import Image from 'next/image';
import { Text } from '../../ui/text';

const libraries = [
  { title: 'React Flow', route: '/react-flow' },
  { title: 'Svelte Flow', route: '/svelte-flow' },
  { title: 'Project Showcase', route: '/' },
  { title: 'Case Studies', route: '/' },
];

const xyflow = [
  { title: 'About', route: '/' },
  { title: 'Contact', route: '/' },
  { title: 'Open Source', route: '/' },
];

const legal = [
  { title: 'Terms of Use', route: '/terms-of-use' },
  { title: 'Ethical Standards', route: '/ethical-standards' },
  { title: 'Privacy Policy', route: '/privacy' },
  { title: 'Imprint', route: '/imprint' },
];

const social = [
  { title: 'Discord', route: 'https://discord.gg/RVmnytFmGW' },
  { title: 'Github', route: 'https://github.com/xyflow' },
  { title: 'Mastodon', route: 'https://fosstodon.org/@reactflowdev' },
  { title: 'Bluesky', route: 'https://bsky.app/profile/xyflow.com' },
];

const categories = [
  {
    title: 'Libraries',
    items: libraries,
  },
  {
    title: 'Community',
    items: social,
  },
  {
    title: 'xyflow',
    items: xyflow,
  },
  {
    title: 'Legal',
    items: legal,
  },
];

type FooterProps = {
  imageSrc?: string;
};

export default function Footer({ imageSrc }: FooterProps) {
  return (
    <footer className="bg-black print:bg-transparent py-12 lg:py-18">
      <div className="mx-auto lg:flex text-white max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="lg:max-w-[300px] md:max-w-[600px] lg:mr-24 shrink-0">
          <Text variant="light" className="mb-2">
            A message from the team
          </Text>
          <div className="font-black text-3xl tracking-tight leading-none mb-6 lg:mb-10">
            Cared for by the xyflow team– building and maintaining React Flow
            since 2021.
          </div>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="photo of the xyflow team sitting in an office"
              width={300}
              height={136}
            />
          )}
        </div>
        <div className="grow">
          <div className="flex flex-col grow h-[100%]">
            <div className="grid grid-cols-2 lg:grid-cols-4 grid-gap-4">
              {categories.map((category) => (
                <div key={category.title} className="mt-4 lg:mt-0">
                  <Text variant="light" className="text-light mb-2">
                    {category.title}
                  </Text>
                  {category.items.map((item) => (
                    <Link href={item.route} className="block" key={item.route}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <Text variant="light" className="text-sm mt-auto">
              info@xyflow.com — Copyright © {new Date().getFullYear()} webkid
              GmbH. All rights reserved. - website designed by facu
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer, type FooterProps };
