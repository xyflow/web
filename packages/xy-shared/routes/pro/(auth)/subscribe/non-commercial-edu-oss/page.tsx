import DashboardHeader from '../../../../../components/pro/DashboardHeader';
import { Card, CardHeader } from '../../../../../components/ui/card';

import SignUp from './signup';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function SignUpEduPage () {
  return (
    <div className="max-w-2xl">
      <DashboardHeader
        title="Access Pro Examples for Non-Commercial Projects"
        description="We support educational and non-commercial open source projects by providing free access to our pro examples. Fill out the form below to get access for your project."
      />
      <Card className="max-w-xl">
        <CardHeader>
          <SignUp />
        </CardHeader>
      </Card>
    </div>
  );
};
