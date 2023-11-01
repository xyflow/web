import React from 'react';
import { Link } from 'xy-ui';

export default [
  {
    question: <>Is React Flow Pro a different library than React Flow?</>,
    answer: (
      <>
        &quot;React Flow Pro&quot; is not an additional library, but instead a
        paid service built around the open-source{' '}
        <Link variant="primary" href="https://github.com/wbkd/react-flow">
          React Flow library
        </Link>
        .
      </>
    ),
  },
  {
    question: (
      <>I / my company can&apos;t afford the monthly subscription price.</>
    ),
    answer: (
      <>
        If you need access to the Pro Example code for a non-commercial project:
        <ul className="list-disc pl-8 mb-4">
          <li>
            For <strong>educational purposes</strong>, email us at
            info@xyflow.com using your university email address with a link to
            the example you&apos;re looking for.
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
    question: (
      <>Is the subscription cost per project, per user, or per organization?</>
    ),
    answer: <>One subscription is enough for one organization.</>,
  },
  {
    question: (
      <>I need further company details to subscribe through my organization.</>
    ),
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
        <Link
          variant="primary"
          href="https://github.com/sponsors/xyflow"
          target="_blank"
        >
          GitHub Sponsors website
        </Link>{' '}
        for the same subscription price, then send us an email so we can upgrade
        you to the correct plan.
      </>
    ),
  },
  {
    question: <>Can your team build a custom React Flow app for us?</>,
    answer: (
      <>
        We have project partners who would be happy to help build your custom
        React Flow app.{' '}
        <Link
          variant="primary"
          href="https://xyflow.com/contact"
          target="_blank"
        >
          Contact us
        </Link>{' '}
        with a description of what you&apos;re looking to build and the project
        scope, and we&apos;ll put you in touch. (The core team is busy
        maintaining the library, so we don&apos;t take on these projects
        ourselves.)
      </>
    ),
  },
  {
    question: <>What is included in the individual email support?</>,
    answer: (
      <>
        With a Pro subscription, we can provide custom examples for your
        specific use case, answer any questions you have about the library, and
        send your team in the right direction in whatever way we can. This
        support will take place via email for up to 1 hour per month.
      </>
    ),
  },
  {
    question: <>What happens when I unsubscribe?</>,
    answer: (
      <>
        After unsubscribing, you will no longer be able to access the Pro
        Example code through our website. You will still be able to use React
        Flow as usual and continue receiving updates to the library. You can
        continue using the Pro Example code in your projects, even if
        you&apos;re no longer a subscriber.
      </>
    ),
  },
  {
    question: (
      <>
        Can I use React Flow for my commercial project without a subscription?
      </>
    ),
    answer: (
      <>
        Yes. The React Flow library is under an{' '}
        <Link
          variant="primary"
          href="https://github.com/wbkd/react-flow/blob/main/LICENSE"
        >
          MIT License
        </Link>
        . We rely on the support of commercial organizations and projects to
        keep React Flow maintained and consistently updated. If your
        organization is able to afford a subscription, we would recommend it in
        order to make sure React Flow and its ecosystem continue to be a
        reliable resource.
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
