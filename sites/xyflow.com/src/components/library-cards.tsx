import { ContentGrid, ContentGridItem, Text, Heading, Logo } from 'xy-ui';

import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

export default function LibraryCards() {
  return (
    <ContentGrid className="mt-16 lg:mt-24">
      <ContentGridItem route="https://reactflow.dev">
        <Heading size="sm" className="flex items-center">
          <Logo className="mr-2 text-[#ff0071]" /> React Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable React component for building node-based editors and
          interactive diagrams
        </Text>
        <span className="text-[#ff0071] flex items-center">
          Visit Website <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </span>
      </ContentGridItem>

      <ContentGridItem route="https://svelteflow.dev">
        <Heading size="sm" className="flex items-center">
          <Logo className="mr-2 text-[#ff4000]" /> Svelte Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable Svelte component for building node-based editors and
          interactive diagrams
        </Text>
        <span className="text-[#ff4000] flex items-center">
          Visit Website <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </span>
      </ContentGridItem>
    </ContentGrid>
  );
}
