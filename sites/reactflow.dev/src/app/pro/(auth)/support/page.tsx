import DashboardHeader from '@/components/pro/DashboardHeader';
import SubscriptionFeature from '@/components/pro/SubscriptionFeature';
import { SubscriptionPlan } from '@/types';
import { Link } from '@xyflow/xy-ui';

const SupportPage = () => {
  return (
    <div>
      <DashboardHeader
        title="Support"
        description="The xyflow team is based in Europe and offers individual support for subscribers to the Professional and Enterprise plans. You can expect a response from us within 48 hours during working days."
      />
      <div className="max-w-2xl">
        <div className="text-xl font-black mb-2">
          How to quickly get support for your problem
        </div>
        <ul className="list-disc text-light mb-8 leading-7 pl-4">
          <li>
            The best way to contact us is via email. If you’re a Professional or
            Enterprise subscriber, click the link below to use that email
            address.
          </li>
          <li>
            Include a codesandbox that we can access which reproduces your
            issue. You can use our codesandbox starters:{' '}
            <Link className="text-primary" href="https://new.reactflow.dev/js">
              Javascript
            </Link>
            ,{' '}
            <Link className="text-primary" href="https://new.reactflow.dev/ts">
              Typescript
            </Link>
          </li>
          <li>
            If you think you found a bug in the library, please{' '}
            <Link
              className="text-primary"
              href="https://github.com/xyflow/xyflow/issues/new"
            >
              open an issue on github
            </Link>
            . Subscribers can prioritize issues by sending us an mail with the
            link to{' '}
            <Link className="text-primary" href="mailto:info@xyflow.com">
              info@xyflow.com
            </Link>
          </li>
          <li>
            Email us using the account you’re currently logged into, or
            reference it so we can check your subscription status
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-7 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          <SubscriptionFeature
            title="Support Email"
            description="The Professional and Enterprise plans include one hour of 1:1 support per month"
            plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{
              label: 'Contact Support',
              href: 'mailto:support@xyflow.com',
            }}
          />
          <SubscriptionFeature
            title="Video Call"
            description="Enterprise subscribers can schedule a video call with our team to get 1:1 support."
            plans={[SubscriptionPlan.ENTERPRISE]}
            button={{
              label: 'Schedule Call',
              href: 'https://cal.com/team/xyflow/enterprise-support',
            }}
          />
          <SubscriptionFeature
            title="Discord Community"
            description="Ask and answer questions in our active community of React Flow developers"
            plans={[
              SubscriptionPlan.FREE,
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
              SubscriptionPlan.STUDENT,
              SubscriptionPlan.OSS,
            ]}
            button={{
              label: 'Launch Discord',
              href: 'https://discord.gg/RVmnytFmGW',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
