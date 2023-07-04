import Link from 'next/link';

export default [
  {
    question: <>Is React Flow Pro a different library than React Flow?</>,
    answer: (
      <>
        React Flow Pro is not an additional library, it is a paid subscription
        around the React Flow open-source library that gives you access to
        exclusive services like Pro examples, individual support from the React
        Flow team or prioritized bug reports.
      </>
    ),
  },
  {
    question: <>Can we try out React Flow before purchasing it?</>,
    answer: (
      <>
        Yes, you can start using React Flow and all of the features of the
        library without paying anything.
      </>
    ),
  },
  {
    question: <>I / my company can't afford the monthly subscription price.</>,
    answer: (
      <>
        1. If you need access to the Pro Example code for a non-commercial
        project:
        <ul>
          <li>
            For <strong>educational purposes</strong>, email us at
            info@reactflow.dev using your university email address with a link
            to the example you're looking for.
          </li>
          <li>
            For <strong>non-commercial open source projects</strong>,{' '}
            <Link href="/contact">contact us</Link> with the link to the github
            or gitlab repository.
          </li>
        </ul>
        <div>
          2. If you are a <strong>pre-revenue startup</strong>,{' '}
          <Link href="/contact">contact us</Link> for a startup discount.
        </div>
      </>
    ),
  },
  {
    question: (
      <>Is the subscription cost per project, per user, or per organization?</>
    ),
    answer: <>One subscription is enough for one organization</>,
  },
  {
    question: (
      <>I need further company details to subscribe through my organization.</>
    ),
    answer: (
      <>
        You can find all of our company and invoicing details{' '}
        <Link
          href="https://wbkd.notion.site/Company-and-Invoicing-Details-for-subscribing-to-React-Flow-125f6b699fb24c93aa7016c588b3ae35"
          target="_blank"
        >
          here
        </Link>
        .
        <br />
        If your organization already uses GitHub sponsorships, feel free to do a
        sponsorship on our{' '}
        <Link href="https://github.com/sponsors/wbkd" target="_blank">
          GitHub Sponsors website
        </Link>{' '}
        for the same subscription price, then send us an email so we can upgrade
        you to the correct plan.
      </>
    ),
  },
  {
    question: <>Will React Flow work for my project’s specific use case?</>,
    answer: (
      <>
        We’ve built React Flow to be flexible and low-level, so it works for
        many use cases. Take a look at our{' '}
        <Link
          href="https:reactflow.dev/docs/examples/overview/"
          target="_blank"
        >
          Examples
        </Link>{' '}
        and our{' '}
        <Link href="https:reactflow.dev/showcase/" target="_blank">
          Project Showcase
        </Link>{' '}
        see some of what is possible to build with React Flow.
      </>
    ),
  },
  {
    question: <>Can your team build a custom React Flow app for us?</>,
    answer: (
      <>
        We have project partners who would be happy to help build your custom
        React Flow app.{' '}
        <Link href="https:pro.reactflow.dev/contact" target="_blank">
          Contact us
        </Link>{' '}
        with a description of what you’re looking to build and the project
        scope, and we’ll put you in touch. (The core team is busy maintaining
        the library, so we don{"'"}t take on these projects ourselves.)
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
        Flow as usual and continue receiving updates to the library.
      </>
    ),
  },
  {
    question: <>I still have questions about subscribing.</>,
    answer: (
      <>
        We’re happy to answer any questions you have.{' '}
        <Link href="/contact">Contact us</Link>, we check our email regularly
        and usually reply in a day or two.
      </>
    ),
  },
];
