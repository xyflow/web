import Link from 'next/link';
import { Heading, Button, Section } from '@xyflow/xy-ui';
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function SubscribeSection() {
  return (
    <Section className="mx-auto lg:max-w-[800px]">
      <Heading size="sm" as="h3" className="text-center mb-12 mt-32">
        Get started with Svelte Flow and join the community of people building
        node-based UIs
      </Heading>

      <div className="flex justify-center space-x-2 lg:space-x-8">
        <Button size="lg" asChild>
          <Link href="/learn" className="flex shrink-0 items-center">
            <BookOpenIcon className="w-5 h-5 mr-1" />
            Read the Docs
          </Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link
            href="https://discord.gg/RVmnytFmGW"
            className="flex shrink-0 items-center"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5 mr-1" />
            Join Discord
          </Link>
        </Button>
      </div>
    </Section>
  );
}
