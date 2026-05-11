import { Link } from '../ui/link';

import { FeatureConfig } from './types';

export const features: Record<string, FeatureConfig> = {
  reactFlowProExamples: {
    label: (
      <span>
        Access to{' '}
        <Link variant="primary" href="https://reactflow.dev/pro/content">
          Pro Examples
        </Link>{' '}
        and{' '}
        <Link variant="primary" href="https://reactflow.dev/ui/templates/workflow-editor">
          Templates
        </Link>
      </span>
    ),
  },
  svelteFlowProExamples: {
    label: (
      <span>
        Access to{' '}
        <Link variant="primary" href="https://svelteflow.dev/pro/content">
          Pro Examples
        </Link>
        .
      </span>
    ),
  },
  teamMembers1: {
    label: 'Invite 1 team member',
    description: 'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers5: {
    label: 'Invite 5 team members',
    description: 'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers10: {
    label: 'Invite 10 team members',
    description: 'You can purchase additional seats through the platform as-needed.',
  },
  prioritizedIssues: {
    label: 'Prioritized Github Issues',
  },
  mitLicense: {
    label: 'Keep the library running and maintained under an MIT License',
  },
  reactFlowPro: {
    label: 'Additional access to React Flow Pro',
  },
  svelteFlowPro: {
    label: 'Additional access to Svelte Flow Pro',
  },
  proSupport: {
    label: 'Up to 1 hour of individual support via email per month',
  },
  enterpriseSupport: {
    label: '1 hour of individual support via voice, video or email per month',
  },
  customPayment: {
    label: 'Custom procurement and payment process',
  },
  reactFlowIntro: {
    label: 'Introduction call with one of the creators of React Flow',
  },
  svelteFlowIntro: {
    label: 'Introduction call with one of the creators of Svelte Flow',
  },
};
