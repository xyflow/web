'use client';

import { Button } from '@xyflow/xy-ui';
import { ChangeEvent, ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { ImageUpload, Library } from '../';

export function ShowcaseForm({ library = 'React Flow' }: { library: Library }) {
  const [title, set_title] = useState('');
  const [description, set_description] = useState('');
  const [url, set_url] = useState('');
  const [image, set_image] = useState('');
  const [email, set_email] = useState('');
  const [tags, set_tags] = useState<string[]>([]);
  const [repoUrl, set_repoUrl] = useState('');
  const [demoUrl, set_demoUrl] = useState('');
  const [comment, set_comment] = useState('');
  const [openSource, set_openSource] = useState(false);

  const handleSubmit = async () => {
    const formData = {
      title,
      description,
      url,
      image,
      email,
      tags,
      repoUrl,
      status: 'confirm',
      demoUrl,
      openSource,
      createdAt: new Date().toString(),
      library,
      comment,
    };
    await fetch('/api/create-showcase-pull-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  const handleCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) set_tags((tags) => [...new Set([e.target.name, ...tags])]);
    if (!e.target.checked)
      set_tags((tags) => {
        const oldTags = new Set([...tags]);
        oldTags.delete(e.target.name);
        return [...oldTags];
      });
  }, []);

  return (
    <div className="flex flex-col mt-10 gap-10 max-w-screen-md m-auto items-start">
      <FormItem label="Name*" description="The name of your project or company">
        <input
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => set_title(e.target.value)}
        />
      </FormItem>
      <FormItem
        label="Description*"
        description="A short description of your project. This will be displayed on the website."
      >
        <textarea
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="title"
          id="title"
          value={description}
          onChange={(e) => set_description(e.target.value)}
        />
      </FormItem>
      <FormItem label="Project Website*" description="The main website of your project">
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="url"
          id="url"
          value={url}
          onChange={(e) => set_url(e.target.value)}
        />
      </FormItem>
      <FormItem
        label="Email*"
        description="Please provide your email so that we can reach out if we have questions."
      >
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="email"
          id="email"
          value={email}
          onChange={(e) => set_email(e.target.value)}
        />
      </FormItem>
      <FormItem
        label="Image*"
        description="Please provide a screenshot of your app where React Flow / Svelte Flow is visible."
      >
        <ImageUpload url={image} set_url={set_image} />
      </FormItem>
      <FormItem
        label="Tags"
        description="Add the tags that you think apply to your project."
      >
        <div className="flex flex-col gap-2">
          <CheckItem onSelect={handleCheck} label="AI" />
          <CheckItem onSelect={handleCheck} label="3D" />
          <CheckItem onSelect={handleCheck} label="Audio" />
          <CheckItem onSelect={handleCheck} label="Other" />
          <CheckItem onSelect={handleCheck} label="Org Chart" />
          <CheckItem onSelect={handleCheck} label="Developer Tool" />
          <CheckItem onSelect={handleCheck} label="Image Processing" />
          <CheckItem onSelect={handleCheck} label="Workflow Automation" />
        </div>
      </FormItem>
      <FormItem
        label="Repository URL"
        description="If this is an open source project, please provide the link to your repository."
      >
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="repoUrl"
          id="repoUrl"
          value={repoUrl}
          onChange={(e) => set_repoUrl(e.target.value)}
        />
      </FormItem>
      <FormItem
        label="Demo Url"
        description="You can provide a direct link to a public demo if you have one"
      >
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="demoUrl"
          id="demoUrl"
          value={demoUrl}
          onChange={(e) => set_demoUrl(e.target.value)}
        />
      </FormItem>
      <FormItem label="Project Type" description="Is your project open source?">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="openSource"
              onChange={(e) => {
                if (e.target.checked) set_openSource(true);
                else set_openSource(false);
              }}
              className="accent-blue-500"
            />
            Open Source
          </label>
        </div>
      </FormItem>
      <FormItem
        label="Comment"
        description="Add any more information about your project that might be interesting to us (won’t be published)."
      >
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => set_comment(e.target.value)}
        />
      </FormItem>

      <Button onClick={handleSubmit} title="Submit">
        Submit
      </Button>
    </div>
  );
}

function FormItem({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <h2 className="text-2xl font-semibold">{label}</h2>
      <p className="text-gray-600">{description}</p>
      {children}
    </div>
  );
}

function CheckItem({
  label,
  onSelect,
}: {
  label: string;
  onSelect: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name={label}
        onChange={onSelect}
        className="accent-blue-500"
      />
      {label}
    </label>
  );
}
