import { Card, InputLabel, Input } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ContactForm, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Enterprise() {
  return (
    <BaseLayout>
      <Hero
        title="React Flow Pro Enterprise"
        subtitle="Pro subscribers have access to advanced examples and guides that can be used as a starting point or inspiration for building node-based UIs."
        kicker="React Flow Pro"
        kickerIcon={SparklesIcon}
        align="center"
        backgroundVariant="gradient"
      />
      <Card className="p-8 bg-white relative max-w-xl mx-auto mt-16">
        <ContactForm>
          <InputLabel>
            <span>Your Name</span>
            <Input name="name" type="text" required variant="square" />
          </InputLabel>
          <InputLabel>
            <span>Your Email</span>
            <Input name="email" type="email" required variant="square" />
          </InputLabel>
          <InputLabel>
            <span>Your Company Website</span>
            <Input
              placeholder="https://..."
              name="company"
              type="url"
              required
              variant="square"
            />
          </InputLabel>
          <InputLabel className="col-span-4">
            <span>
              Tell us how you are using React Flow and how we might be able to
              support
            </span>
            {/* Maybe we should wrap this in a component and drop it into xy-ui/TextArea
                  or something similar. */}
            <textarea
              name="message"
              required
              placeholder="Your message..."
              // These classes are copied from the `<Input />` component.
              className="px-4 py-2 border border-gray-300 rounded-lg w-full h-32 md:h-64"
            />
          </InputLabel>
        </ContactForm>
      </Card>
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
