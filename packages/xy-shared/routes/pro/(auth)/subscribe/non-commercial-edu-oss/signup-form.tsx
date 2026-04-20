'use client';

import { useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { Input } from '../../../../../components/ui/input';
import { InputLabel } from '../../../../../components/ui/input';
import { callNhostFunction } from '../../../../../server-actions/call-nhost-function';
import { Button } from '../../../../../components/ui/button';
import { getFramework } from '../../../../../lib/get-framework';
const { library } = getFramework();

import { Success } from './sucess';

export function SignUpForm() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [projectType, setProjectType] = useState<'oss' | 'student' | undefined>(
    undefined,
  );

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    setLoading(true);
    evt.preventDefault();

    const response = await callNhostFunction('/subscribe-edu-oss', {
      plan: projectType,
    });

    if (response.error) {
      setError(true);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  const changeProjectType = (type: 'oss' | 'student') => {
    setProjectType(type);
    setEmail('');
    setUrl('');
    setConfirmed(false);
  };

  const isDisabled =
    !confirmed ||
    !projectType ||
    (projectType === 'student' && !email) ||
    (projectType === 'oss' && !url);

  if (isSuccess) {
    return <Success />;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {isError && (
            <div>
              Something went wrong. Please{' '}
              <Link className="text-primary" href="https://xyflow.com/contact">
                Contact Us
              </Link>{' '}
              for support.
            </div>
          )}
          <div>
            <div className="mb-2 text-lg font-bold">Project Type</div>
            <div className="text-md text-muted-foreground mb-2 flex items-center gap-x-2">
              <input
                type="radio"
                id="oss"
                name="oss"
                value="oss"
                checked={projectType === 'oss'}
                onChange={(evt) => changeProjectType(evt.target.value as 'oss')}
                className="h-4 w-4"
              />
              <label htmlFor="oss">Non-commercial open source project</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                id="student"
                name="student"
                value="student"
                checked={projectType === 'student'}
                onChange={(evt) => changeProjectType(evt.target.value as 'student')}
                className="h-4 w-4"
              />
              <label htmlFor="student">Educational project (university, students)</label>
            </div>
          </div>
          {projectType === 'student' && (
            <div>
              <InputLabel htmlFor="email">Your University Email</InputLabel>
              <Input
                variant="square"
                placeholder="Email"
                required
                id="email"
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                autoComplete="on"
              />
            </div>
          )}
          {projectType === 'oss' && (
            <div>
              <InputLabel htmlFor="url">Project Link</InputLabel>
              <Input
                variant="square"
                placeholder="A link to your project (e.g. Github)"
                id="url"
                type="url"
                required
                value={url}
                onChange={(evt) => setUrl(evt.target.value)}
              />
            </div>
          )}
          {projectType && (
            <div className="mb-4 flex">
              <input
                className="mb-auto mr-1 mt-1 h-4 w-4 shrink-0"
                id="confirm"
                type="checkbox"
                required
                checked={confirmed}
                onChange={(evt) => setConfirmed(evt.target.checked)}
              />
              <label className="text-muted-foreground text-sm" htmlFor="confirm">
                {projectType === 'student'
                  ? `I confirm that I am using ${library} Pro only for educational purposes.`
                  : `I confirm that I am using ${library} Pro only for non-commercial purposes in my open source project.`}
              </label>
            </div>
          )}
          <Button
            loading={isLoading}
            size="lg"
            className="w-full"
            type="submit"
            disabled={isDisabled}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}
