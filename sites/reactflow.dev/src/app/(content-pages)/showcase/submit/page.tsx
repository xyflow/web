import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Button } from '@xyflow/xy-ui';
import { Metadata } from 'next';
import { FC } from 'react';
import { BaseLayout, Hero, ImageUpload } from 'xy-shared';

export const metadata: Metadata = {
  title: 'Submit a showcase',
  description: 'Submit your showcase to React Flow',
};

const Showcase: FC = async () => {
  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={<RocketLaunchIcon />}
        title="Submit your showcase to React Flow"
        subtitle="Thank you for submitting your project to our showcase! Please note that by submitting a showcase here, it is not guaranteed that we will add your project. Accepted projects will appear either on the React Flow or the Svelte Flow website."
        align="center"
        backgroundVariant="gradient"
      />

      <div className="flex flex-col mt-10 gap-10 max-w-screen-md m-auto items-start">
        <FormItem label="Name" description="The name of your project or company">
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>
        <FormItem
          label="Description"
          description="A short description of your project. This will be displayed on the website."
        >
          <textarea
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name=""
            id=""
            placeholder="Deine Antwort"
          />
        </FormItem>
        <FormItem label="Project Website" description="The main website of your project">
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>
        <FormItem
          label="Library"
          description="Are you using React Flow or Svelte Flow in your project?"
        >
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="library"
                value="react-flow"
                className="accent-blue-500"
              />
              React Flow
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="library"
                value="svelte-flow"
                className="accent-blue-500"
              />
              Svelte Flow
            </label>
          </div>
        </FormItem>
        <FormItem
          label="Image"
          description="Please provide a screenshot of your app where React Flow / Svelte Flow is visible."
        >
            <ImageUpload />
        </FormItem>
        <FormItem
          label="Contact Email"
          description="Please provide your email so that we can reach out if we have questions."
        >
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>
        <FormItem
          label="Tags"
          description="Add the tags that you think apply to your project."
        >
          <div className="flex flex-col gap-2">
            <CheckItem label="AI" />
            <CheckItem label="3D" />
            <CheckItem label="Audio" />
            <CheckItem label="Other" />
            <CheckItem label="Org Chart" />
            <CheckItem label="Developer Tool" />
            <CheckItem label="Image Processing" />
            <CheckItem label="Workflow Automation" />
          </div>
        </FormItem>
        <FormItem
          label="Repository URL"
          description="If this is an open source project, please provide the link to your repository."
        >
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>
        <FormItem
          label="Demo Url"
          description="You can provide a direct link to a public demo if you have one"
        >
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>
        <FormItem
          label="Library"
          description="Are you using React Flow or Svelte Flow in your project?"
        >
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="library"
                value="react-flow"
                className="accent-blue-500"
              />
              Open Source
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="library"
                value="svelte-flow"
                className="accent-blue-500"
              />
              Commercial
            </label>
          </div>
        </FormItem>
        <FormItem
          label="Comment"
          description="Add any more information about your project that might be interesting to us (won’t be published)."
        >
          <input
            type="text"
            placeholder="Deine Antwort"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </FormItem>

        <Button title="Submit">Submit</Button>
      </div>
    </BaseLayout>
  );
};

export default Showcase;

function FormItem({ label, description, children }) {
  return (
    <div className="grid gap-2">
      <h2 className="text-2xl font-semibold">{label}</h2>
      <p className="text-gray-600">{description}</p>
      {children}
    </div>
  );
}

function CheckItem({ label }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="technologies"
        value="react"
        className="accent-blue-500"
      />
      {label}
    </label>
  );
}
