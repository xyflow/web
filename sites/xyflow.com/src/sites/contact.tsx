import Hero from '@/page-sections/hero';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BaseLayout, Card, Input, InputLabel, Text } from 'xy-ui';

import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <BaseLayout>
      <Hero
        align="center"
        kicker="Contact Us"
        kickerIcon={EnvelopeIcon}
        title="We're happy to answer any questions you have"
        subtitle="Messages go to our email inbox and we aim to respond within a couple of days."
      />
      <Card className="relative mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-2 md:p-4">
        <div
          className="absolute opacity-5 w-full h-[200%] left-1/2 -translate-x-1/2 -translate-y-1/4 pointer-events-none"
          style={{
            background:
              'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
          }}
        />
        <Card className="p-8 bg-white relative">
          <ContactForm>
            <InputLabel>
              <span>Your Email</span>
              <Input name="email" type="email" required variant="square" />
            </InputLabel>

            {/* <div className="col-span-4 flex flex-col space-y-2">
              <p className="mb-1 block text-sm font-bold text-muted-foreground">
                What are you reaching out about?
              </p>
              {contactReasons.map(({ name, value }) => (
                <InputLabel key={name} className="ml-4 flex items-center gap-2">
                  <Checkbox name="contact-reason" value={value} />
                  <span>{name}</span>
                </InputLabel>
              ))}
            </div> */}

            <InputLabel className="col-span-4">
              <span>Your message</span>
              {/* Maybe we should wrap this in a component and drop it into xy-ui/TextArea
                  or something similar. */}
              <textarea
                name="message"
                required
                // These classes are copied from the `<Input />` component.
                className="px-4 py-2 border border-gray-300 rounded-lg w-full h-32 md:h-64"
              />
            </InputLabel>
          </ContactForm>
        </Card>

        <div className="py-8 px-24 space-y-8">
          <Text size="lg">You can also find us on...</Text>

          <div className="divide-y">
            {externalLinks.map(({ name, href }) => (
              <Link
                key={name}
                className="group flex justify-between py-4"
                href={href}
              >
                <Text size="sm" className="group-hover:underline">
                  {name}
                </Text>
                <ArrowRightCircleIcon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          <Text variant="light">
            ... or reach out directly to{' '}
            <a className="text-primary" href="mailto:info@reactflow.dev">
              info@reactflow.dev
            </a>
            .
          </Text>
        </div>
      </Card>
    </BaseLayout>
  );
}

const externalLinks = [
  { name: 'GitHub', href: 'https://github.com/wbkd/reactflow' },
  { name: 'Discord', href: 'https://discord.com/invite/RVmnytFmGW' },
  { name: 'Twitter', href: 'https://twitter.com/reactflowdev' },
];

const toFormName = (name: string) => name.toLowerCase().replace(' ', '-');
