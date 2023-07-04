import React from 'react';
import { Box, Link, UnorderedList, ListItem, LinkProps } from '@chakra-ui/react';
import { FAQItem, FAQWrapper } from '../FAQ';

type PricingFAQProps = {
  showTitle?: boolean;
};

const PinkLink = (props: LinkProps) => <Link color="pink.500" _hover={{ color: 'pink.700' }} {...props} />;

export default function PricingFAQ({ showTitle = true }: PricingFAQProps) {
  return (
    <FAQWrapper showTitle={showTitle}>
      <FAQItem
        title="Is React Flow Pro a different library than React Flow?"
        text={
          <>
            React Flow Pro is not an additional library, it is a paid subscription around the React Flow open-source
            library that gives you access to exclusive services like Pro examples, individual support from the React
            Flow team or prioritized bug reports.
          </>
        }
      />
      <FAQItem
        title="Can we try out React Flow before purchasing it?"
        text={<>Yes, you can start using React Flow and all of the features of the library without paying anything.</>}
      />
      <FAQItem
        title="I / my company can't afford the monthly subscription price."
        text={
          <>
            1. If you need access to the Pro Example code for a non-commercial project:
            <UnorderedList pl={4} maxW={600} mt={1}>
              <ListItem>
                For <strong>educational purposes</strong>, email us at info@reactflow.dev using your university email
                address with a link to the example you{"'"}re looking for.
              </ListItem>
              <ListItem>
                For <strong>non-commercial open source projects</strong>,{' '}
                <PinkLink href="https://pro.reactflow.dev/contact" target="_blank">
                  contact us
                </PinkLink>{' '}
                with the link to the github or gitlab repository.
              </ListItem>
            </UnorderedList>
            <Box mt={2}>
              2. If you are a <strong>pre-revenue startup</strong>,{' '}
              <PinkLink href="https://pro.reactflow.dev/contact" target="_blank">
                contact us
              </PinkLink>{' '}
              for a startup discount.
            </Box>
          </>
        }
      />
      <FAQItem
        title="Is the subscription cost per project, per user, or per organization?"
        text={<>One subscription is enough for one organization.</>}
      />
      <FAQItem
        title="I need further company details to subscribe through my organization."
        text={
          <>
            You can find all of our company and invoicing details{' '}
            <PinkLink
              href="https://wbkd.notion.site/Company-and-Invoicing-Details-for-subscribing-to-React-Flow-125f6b699fb24c93aa7016c588b3ae35"
              target="_blank"
            >
              here
            </PinkLink>
            .
            <br />
            If your organization already uses GitHub sponsorships, feel free to do a sponsorship on our{' '}
            <PinkLink href="https://github.com/sponsors/wbkd" target="_blank">
              GitHub Sponsors website
            </PinkLink>{' '}
            for the same subscription price, then send us an email so we can upgrade you to the correct plan.
          </>
        }
      />
      <FAQItem
        title="Will React Flow work for my project’s specific use case?"
        text={
          <>
            We’ve built React Flow to be flexible and low-level, so it works for many use cases. Take a look at our{' '}
            <PinkLink href="https://reactflow.dev/docs/examples/overview/" target="_blank">
              Examples
            </PinkLink>{' '}
            and our{' '}
            <PinkLink href="https://reactflow.dev/showcase/" target="_blank">
              Project Showcase
            </PinkLink>{' '}
            see some of what is possible to build with React Flow.
          </>
        }
      />
      <FAQItem
        title="Can your team build a custom React Flow app for us?"
        text={
          <>
            We have project partners who would be happy to help build your custom React Flow app.{' '}
            <PinkLink href="https://pro.reactflow.dev/contact" target="_blank">
              Contact us
            </PinkLink>{' '}
            with a description of what you’re looking to build and the project scope, and we’ll put you in touch. (The
            core team is busy maintaining the library, so we don{"'"}t take on these projects ourselves.)
          </>
        }
      />

      <FAQItem
        id="faq-email"
        title="What is included in the individual email support?"
        text={
          <>
            With a Pro subscription, we can provide custom examples for your specific use case, answer any questions you
            have about the library, and send your team in the right direction in whatever way we can. This support will
            take place via email for up to 1 hour per month.
          </>
        }
      />
      <FAQItem
        title="What happens when I unsubscribe?"
        text={
          <>
            After unsubscribing, you will no longer be able to access the Pro Example code through our website. You will
            still be able to use React Flow as usual and continue receiving updates to the library.
          </>
        }
      />
      <FAQItem
        title="I still have questions about subscribing."
        text={
          <>
            We’re happy to answer any questions you have.{' '}
            <PinkLink href="https://pro.reactflow.dev/contact" target="_blank">
              Contact us
            </PinkLink>
            , we check our email regularly and usually reply in a day or two.
          </>
        }
      />
    </FAQWrapper>
  );
}
