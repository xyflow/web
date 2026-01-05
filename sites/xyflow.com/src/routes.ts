export type Route = ExternalRoute | InternalRoute;

export type ExternalRoute = `https://${string}`;

export type InternalRoute =
  | '/'
  | '/about'
  | '/blog'
  | '/blog/asking-for-money-for-open-source'
  | '/blog/react-flow-fall-2022'
  | '/blog/react-flow-v-11-5'
  | '/blog/react-flow-v10'
  | '/blog/react-flow-v11'
  | '/blog/react-flow-winter-2022'
  | '/blog/reactflow-npm-package-name'
  | '/blog/spring-update-2023'
  | '/blog/svelte-flow-alpha-xyflow'
  | '/contact'
  | '/ethical-standards'
  | '/imprint'
  | '/open-source'
  | '/labs'
  | '/labs/playground'
  | '/labs/collaboration-playground'
  | '/labs/flow-machine'
  | '/privacy'
  | '/terms-of-use';
