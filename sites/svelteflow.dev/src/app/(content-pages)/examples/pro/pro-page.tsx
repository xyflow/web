import ProExamplesPage from 'xy-shared/components/pro/ProExamplesPage';
import { getPageMap as getExamplesPageMap } from '../[...slug]/utils';

export { SignUpButton } from 'xy-shared/components/pro/SignUpButton';

export default async function ProPage() {
  return <ProExamplesPage framework="svelte" getExamplesPageMap={getExamplesPageMap} />;
}
