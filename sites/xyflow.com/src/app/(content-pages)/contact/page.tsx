import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Card } from 'xy-shared/components/ui/card';
import { Input } from 'xy-shared/components/ui/input';
import { InputLabel } from 'xy-shared/components/ui/input';
import { Text } from 'xy-shared/components/ui/text';
import { BaseLayout } from 'xy-shared/layouts/base';
import { ContactForm } from 'xy-shared/components/contact-form';
import { Hero } from 'xy-shared/components/hero';
import { FC } from 'react';
import { Metadata } from 'next';
import { submitContact } from 'xy-shared/server-actions/contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Got questions about xyflow or any of our libraries? Here's how to reach us.",
};

const Page: FC = () => {
  return (
    <BaseLayout>
      <Hero
        align="center"
        kicker="Contact Us"
        kickerIcon={<EnvelopeIcon />}
        title="We’re happy to answer any questions you have."
        subtitle="Messages go to our email inbox and we aim to respond within a couple of days."
      />
      <Card className="relative mt-16 grid grid-cols-1 gap-4 p-2 md:mt-32 md:grid-cols-2 md:gap-8 md:p-4">
        <div
          className="pointer-events-none absolute left-1/2 h-[200%] w-full -translate-x-1/2 -translate-y-1/4 opacity-5"
          style={{
            background:
              'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
          }}
        />
        <Card className="bg-background relative p-8">
          <ContactForm action={submitContact}>
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
                className="h-32 w-full rounded-lg border border-gray-300 px-4 py-2 md:h-64"
              />
            </InputLabel>
          </ContactForm>
        </Card>

        <div className="space-y-8 px-24 py-8">
          <Text size="lg">You can also find us on...</Text>

          <div className="divide-y divide-gray-200">
            {externalLinks.map(({ name, href }) => (
              <Link key={name} className="group flex justify-between py-4" href={href}>
                <Text size="sm" className="group-hover:underline">
                  {name}
                </Text>
                <ArrowRightCircleIcon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <Text variant="light">
            ... or reach out directly to{' '}
            <a className="text-primary" href="mailto:info@xyflow.com">
              info@xyflow.com
            </a>
            .
          </Text>
        </div>
      </Card>
    </BaseLayout>
  );
};

const externalLinks = [
  { name: 'GitHub', href: 'https://github.com/xyflow' },
  { name: 'Discord', href: 'https://discord.com/invite/RVmnytFmGW' },
  { name: 'Twitter', href: 'https://twitter.com/xyflowdev' },
];

export default Page;
