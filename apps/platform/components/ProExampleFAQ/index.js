import React from 'react';
import { FAQItem, FAQWrapper } from '../FAQ';

export default function PricingFAQ(props) {
  return (
    <FAQWrapper>
      <FAQItem
        title="Are the Pro examples made with a separate library to React Flow?"
        text={
          <>
            No. The Pro examples are advanced examples created using the free React Flow library. Some Pro examples
            include dependencies to other free libraries like d3.
          </>
        }
      />
      <FAQItem
        title="After I subscribe, where/how can I use the Pro Examples?"
        text={
          <>
            After subscribing, you will be given access to the code for all of our Pro Examples. You are free to use the
            code anywhere, anytime, forever. You can download the code, copy-paste it, and integrate it into your
            applications however you wish, or use them as a starting point for a new application.
          </>
        }
      />
      <FAQItem
        title="Can I download the code for Pro Examples?"
        text={
          <>
            When you are a subscriber to React Flow Pro, yes. After you log in to your account, there will be a
            “download” button next to each Pro example where you can download the code for the Pro Example as a .zip
            file.
          </>
        }
      />
    </FAQWrapper>
  );
}
