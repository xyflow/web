import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Text } from '../../../';

const xyflow = [
  { title: 'Blog', route: 'https://xyflow.com/blog' },
  { title: 'Open Source', route: 'https://xyflow.com/open-source' },
  { title: 'About', route: 'https://xyflow.com/about' },
  { title: 'Contact', route: 'https://xyflow.com/contact' },
];

const social = [
  { title: 'Discord', route: 'https://discord.gg/RVmnytFmGW' },
  { title: 'Github', route: 'https://github.com/xyflow' },
  { title: 'Mastodon', route: 'https://fosstodon.org/@xyflow' },
  { title: 'Bluesky', route: 'https://bsky.app/profile/xyflow.com' },
];

const baseCategories = [
  {
    title: 'Community',
    items: social,
  },
  {
    title: 'xyflow',
    items: xyflow,
  },
];

type FooterProps = {
  message?: {
    title: string;
    text: string;
  };
  internal?: {
    title: string;
    items: { title: string; route: string }[];
  };
  legal?: { title: string; route: string }[];
  imageSrc?: string;
  baseUrl?: string;
};

// we can pass a baseurl that gets removed from the links in order to have site specific relative links
export default function Footer({
  message = {
    title: 'A project by the xyflow team',
    text: 'We are building and maintaining open source software for node-based UIs since 2019.',
  },
  internal,
  legal,
  imageSrc,
  baseUrl = '',
}: FooterProps) {
  const allCategories = useMemo(() => {
    const categories = [...baseCategories];

    if (internal) {
      categories.unshift(internal);
    }

    if (legal) {
      categories.push({ title: 'Legal', items: legal });
    }

    return categories;
  }, [internal, legal]);

  return (
    <footer className="bg-black print:bg-transparent py-12 lg:py-18">
      <div className="mx-auto lg:flex text-white max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="lg:max-w-[300px] md:max-w-[600px] lg:mr-24 shrink-0">
          {message && (
            <>
              <Text variant="light" className="mb-2">
                {message.title}
              </Text>
              <div className="font-black text-3xl tracking-tight leading-none mb-6 lg:mb-10">
                {message.text}
              </div>
            </>
          )}
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
              {allCategories.map((category) => (
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
