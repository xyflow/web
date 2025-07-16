import { ShowcaseForm } from '@/app/(content-pages)/showcase/submit/showcase-form';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { createAppAuth } from '@octokit/auth-app';
import { Metadata } from 'next';
import { FC } from 'react';
import { BaseLayout, Hero } from 'xy-shared';

export const metadata: Metadata = {
  title: 'Submit a showcase',
  description: 'Submit your showcase to React Flow',
};

const Showcase: FC = async () => {
  const ghAppAuth = createAppAuth({
    appId: process.env.NEXT_PUBLIC_GH_APP_ID,
    privateKey: process.env.NEXT_PUBLIC_GH_APP_PRIVATE_KEY,
    clientId: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_SECRET,
  });

  const { token } = await ghAppAuth({
    type: 'installation',
    installationId: process.env.NEXT_PUBLIC_GH_APP_INSTALL_ID,
  });

  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={<RocketLaunchIcon />}
        title="Submit your showcase to React Flow"
        subtitle="Thank you for submitting your project to our showcase! Please note that by submitting a showcase here, it is not guaranteed that we will add your project. Accepted projects will appear either on the React Flow or the Svelte Flow website."
        align="center"
        backgroundVariant="gradient"
      />
      <ShowcaseForm token={token} />
    </BaseLayout>
  );
};

export default Showcase;
