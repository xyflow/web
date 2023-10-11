import Link from 'next/link';
import Image from 'next/image';
import { Text } from '../../ui/text';

const libraries = [
  { title: 'React Flow', route: 'https://reactflow.dev/' },
  { title: 'Svelte Flow', route: 'https://svelteflow.dev/' },
  { title: 'Project Showcase', route: 'https://reactflow.dev/showcase' },
  { title: 'Case Studies', route: 'https://reactflow.dev/pro/case-studies' },
];

const xyflow = [
  { title: 'Blog', route: 'https://xyflow.com/blog' },
  { title: 'Open Source', route: 'https://xyflow.com/open-source' },
  { title: 'About', route: 'https://xyflow.com/about' },
  { title: 'Contact', route: 'https://xyflow.com/contact' },
];

const legal = [
  { title: 'Terms of Use', route: 'https://xyflow.com/terms-of-use' },
  { title: 'Ethical Standards', route: 'https://xyflow.com/ethical-standards' },
  { title: 'Privacy Policy', route: 'https://xyflow.com/privacy' },
  { title: 'Imprint', route: 'https://xyflow.com/imprint' },
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
  baseUrl?: string;
};

// we can pass a baseurl that gets remove from the links in order to have site specific relative links
export default function Footer({ imageSrc, baseUrl = '' }: FooterProps) {
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
                    <Link
                      href={item.route.replace(baseUrl, '')}
                      className="block"
                      key={item.title}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <Text variant="light" className="pt-6 text-sm mt-auto">
              <a href="mailto:info@xyflow.com">info@xyflow.com</a> — Copyright
              © {new Date().getFullYear()}{' '}
              <a href="https://webkid.io" target="_blank">
                webkid GmbH
              </a>
              . All rights reserved — website design by{' '}
              <a target="_blank" href="https://facumontanaro.com/">
                Facu Montanaro
              </a>
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer, type FooterProps };
