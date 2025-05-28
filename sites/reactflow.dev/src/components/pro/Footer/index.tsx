import { Footer } from '@xyflow/xy-ui';

const categories = {
  'React Flow Pro': [
    { route: '/', title: 'Dashboard' },
    { route: '/pro/signin', title: 'Sign In' },
    { route: '/pro/signup', title: 'Sign Up' },
    { route: '/pro/reset-password', title: 'Reset Password' },
  ],
  'More Info': [
    { route: 'https://reactflow.dev/pro', title: 'Pricing' },
    { route: 'https://reactflow.dev/pro/examples', title: 'Pro Examples' },
    { route: 'https://reactflow.dev/pro/case-studies', title: 'Case Studies' },
    { route: 'https://reactflow.dev/pro/enterprise', title: 'Enterprise' },
  ],
  xyflow: [
    { route: 'https://xyflow.com/contact', title: 'Contact Us' },
    { route: 'https://xyflow.com/blog', title: 'Blog' },
    { route: 'https://xyflow.com/about', title: 'About' },
    { route: 'https://xyflow.com/open-source', title: 'Open Source' },
  ],
  Legal: [
    {
      title: 'Terms of Use',
      route: 'https://xyflow.com/terms-of-use',
    },
    {
      title: 'Ethical Standards',
      route: 'https://xyflow.com/ethical-standards',
    },
    {
      title: 'Privacy Policy',
      route: 'https://xyflow.com/privacy',
    },
    { title: 'Imprint', route: 'https://xyflow.com/imprint' },
  ],
};

export default function ProPlatformFooter() {
  return (
    <Footer variant="light" categories={categories} showDesignCredits={false} />
  );
}
