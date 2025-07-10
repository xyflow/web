'use client';

import { createShowcasePR } from '@/app/(content-pages)/showcase/submit/create-showcase-pr';
import { Button } from '@xyflow/xy-ui';
import { useState } from 'react';
import { ImageUpload } from 'xy-shared';

export function ShowcaseForm({token}) {
  const [title, set_title] = useState('');
  const [description, set_description] = useState('');
  const [url, set_url] = useState('');
  const [library, set_library] = useState('');
  const [image, set_image] = useState('');
  const [email, set_email] = useState('');
  const [tags, set_tags] = useState({});
  const [repoUrl, set_repoUrl] = useState('');
  const [demoUrl, set_demoUrl] = useState('');
  const [projectType, set_projectType] = useState('');
  const [comment, set_comment] = useState('');
  const [createdAt, set_createdAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createShowcasePR({
      title,
      description,
      url,
      library,
      image,
      email,
      tags,
      repoUrl,
      demoUrl,
      projectType,
      comment,
      createdAt: Date.now().toLocaleString(),
    }, token);
    if (data.success) {
      alert('Pull request created: ' + data.prUrl);
    } else {
      alert('Error creating PR');
    }
  };

  return (
    <div className="flex flex-col mt-10 gap-10 max-w-screen-md m-auto items-start">
      <FormItem label="Name" description="The name of your project or company">
        <input
          type="text"
          placeholder="Deine Antwort"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="title"
          id="title"
          value={title}
          onChange={(e) => set_title(e.target.value)}
        />
      </FormItem>
      <FormItem
        label="Description"
        description="A short description of your project. This will be displayed on the website."
      >
        <textarea
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="title"
          id="title"
          value={description}
          onChange={(e) => set_description(e.target.value)}
          placeholder="Deine Antwort"
        />
      </FormItem>
      <FormItem label="Project Website" description="The main website of your project">
        <input
          type="text"
          placeholder="Deine Antwort"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="url"
          id="url"
          value={url}
          onChange={(e) => set_url(e.target.value)}
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
              name="react-flow"
              value="react-flow"
              onSelect={(e) => set_library('React Flow')}
              className="accent-blue-500"
            />
            React Flow
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="svelte-flow"
              value="svelte-flow"
              onSelect={(e) => set_library('Svelte Flow')}
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
        <ImageUpload url={image} set_url={set_image} />
      </FormItem>
      <FormItem
        label="Contact Email"
        description="Please provide your email so that we can reach out if we have questions."
      >
        <input
          type="text"
          placeholder="Deine Antwort"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="email"
          id="email"
          value={email}
          onChange={(e) => set_email(e.target.value)}
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
          placeholder="Deine Antwort"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="demoUrl"
          id="demoUrl"
          value={demoUrl}
          onChange={(e) => set_demoUrl(e.target.value)}
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
