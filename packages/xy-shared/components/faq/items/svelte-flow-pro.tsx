import { Link } from '../../ui/link';
import { type FAQItem } from '..';

const items: FAQItem[] = [
  {
    question: <>Is Svelte Pro Pro a different library than Svelte Pro?</>,
    answer: (
      <>
        &quot;Svelte Pro Pro&quot; is not an additional library, but instead a paid
        service built around the open-source{' '}
        <Link variant="primary" href="https://github.com/xyflow/xyflow">
          Svelte Pro library
        </Link>
        . When subscribed, you get access to Pro Content like advanced examples and
        templates which are built on top of the open-source library.
      </>
    ),
  },
  {
    question: <>How can I use the Pro Examples in my work?</>,
    answer: (
      <>
        You can use the Pro Examples and Templates in unlimited commercial and
        non-commercial projects within your company. The examples are provided via a
        Download link and can be integrated into your apps. More information on allowed
        usage can be found in the{' '}
        <Link variant="primary" href="https://xyflow.com/pro-license">
          xyflow Pro License
        </Link>
        .
      </>
    ),
  },
  {
    question: <>Can I get a free trial of Svelte Pro Pro?</>,
    answer: (
      <>
        When you{' '}
        <Link variant="primary" href="https://pro.reactflow.dev/signup">
          create a Svelte Pro Pro account
        </Link>
        , you can log in to the pro platform and access the Helper Lines pro example for
        free. If you subscribe, you can access all of the pro examples.
      </>
    ),
  },
  {
    question: <>I / my company can&apos;t afford the monthly subscription price.</>,
    answer: (
      <>
        If you need access to the Pro Example code for a non-commercial project:
        <ul className="list-disc pl-8 mb-4">
          <li>
            For <strong>educational purposes</strong>, email us at info@xyflow.com using
            your university email address with a link to the example you&apos;re looking
            for.
          </li>
          <li>
            For <strong>non-commercial open source projects</strong>,{' '}
            <Link variant="primary" href="https://xyflow.com/contact">
              contact us
            </Link>{' '}
            with the link to the github or gitlab repository.
          </li>
        </ul>
        <div>
          If you are a <strong>pre-revenue startup</strong>,{' '}
          <Link variant="primary" href="https://xyflow.com/contact">
            contact us
          </Link>{' '}
          for a startup discount.
        </div>
      </>
    ),
  },
  {
    id: 'team-members',
    question: <>Can my team members access the pro examples?</>,
    answer: (
      <>
        Yes. You can add a team member{"'"}s email address in the Pro Platform, and they
        will receive an email to create an account.
        <br />
        Then they will have access to the Pro Platform where they can access the Pro
        Example code.
      </>
    ),
  },
  {
    question: <>I need further company details to subscribe through my organization.</>,
    answer: (
      <>
        You can find all of our company and invoicing details{' '}
        <Link
          variant="primary"
          href="https://wbkd.notion.site/Company-and-Invoicing-Details-for-subscribing-to-React-Flow-125f6b699fb24c93aa7016c588b3ae35"
          target="_blank"
        >
          here
        </Link>
        .
        <br />
        If your organization already uses GitHub sponsorships, feel free to do a
        sponsorship on our{' '}
        <Link variant="primary" href="https://github.com/sponsors/xyflow" target="_blank">
          GitHub Sponsors website
        </Link>{' '}
        for the same subscription price, then send us an email so we can upgrade you to
        the correct plan.
      </>
    ),
  },
  {
    question: <>Can your team build a custom Svelte Pro app for us?</>,
    answer: (
      <>
        We have project partners who would be happy to help build your custom Svelte Pro
        app.{' '}
        <Link variant="primary" href="https://xyflow.com/contact" target="_blank">
          Contact us
        </Link>{' '}
        with a description of what you&apos;re looking to build and the project scope, and
        we&apos;ll put you in touch. (The core team is busy maintaining the library, so we
        don&apos;t take on these projects ourselves.)
      </>
    ),
  },
  {
    id: 'email-support',
    question: <>What is included in the individual email support?</>,
    answer: (
      <>
        With a Pro subscription, we can provide custom examples for your specific use
        case, answer any questions you have about the library, and send your team in the
        right direction in whatever way we can. This support will take place via email for
        up to 1 hour per month.
      </>
    ),
  },
  {
    question: <>What happens when I unsubscribe?</>,
    answer: (
      <>
        After unsubscribing, you will no longer be able to access the Pro Example code
        through our website. You will still be able to use Svelte Pro as usual and
        continue receiving updates to the library. You can continue using the Pro Example
        code in your projects, even if you&apos;re no longer a subscriber.
      </>
    ),
  },
  {
    question: <>Can I use Svelte Pro for my commercial project without a subscription?</>,
    answer: (
      <>
        Yes. The Svelte Pro library is under an{' '}
        <Link variant="primary" href="https://github.com/xyflow/xyflow/blob/main/LICENSE">
          MIT License
        </Link>
        . We rely on the support of commercial organizations and projects to keep React
        Flow maintained and consistently updated. If your organization is able to afford a
        subscription, we would recommend it in order to make sure Svelte Pro and its
        ecosystem continue to be a reliable resource.
      </>
    ),
  },
  {
    question: <>I still have questions about subscribing.</>,
    answer: (
      <>
        We&apos;re happy to answer any questions you have.{' '}
        <Link variant="primary" href="https://xyflow.com/contact">
          Contact us
        </Link>
        , we check our email regularly and usually reply in a day or two.
      </>
    ),
  },
];

export default items;
