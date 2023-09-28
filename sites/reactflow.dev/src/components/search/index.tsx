import dynamic from 'next/dynamic';

// @todo check why we get hydration errors when docsearch isn't loaded dynamically
const DynamicSearch = dynamic(() => import('./lazy'), {
  ssr: false,
});

export default () => (
  <>
    <DynamicSearch />
  </>
);
