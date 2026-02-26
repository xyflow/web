import ProExamplesPage from 'xy-shared/components/pro/ProExamplesPage';
import { getPageMap as getExamplesPageMap } from '../[...slug]/utils';

export { SignUpButton } from 'xy-shared/components/pro/SignUpButton';

export default async function ProPage() {
  return (
    <ProExamplesPage
      framework="react"
      getExamplesPageMap={getExamplesPageMap}
      logoIconClassName="text-[#D0D0D0]"
      freeTrialSection={{
        title: 'Helper Lines',
        description:
          'Have guiding lines appear when the sides of your nodes are nearly lined up to assist users in aligning and positioning nodes in a diagram. Great for precise layouting and visual consistency like in design tools such as Figma and Miro.',
        route: '/examples/interaction/helper-lines',
        demoLabel: 'Demo',
        signUpDescription: 'to get this example for free',
      }}
    />
  );
}
