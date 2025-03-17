/*
 * Nextra enhance its `toc` with imported `toc`s from `.md`/`.mdx` files,
 * so we can use `.mdx` prefix on `.tsx` file and export `toc` variable from here
 */

import {
  Heading,
  Text,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Link,
  cn,
} from '@xyflow/xy-ui';
import { Tabs as NextraTabs } from 'nextra/components';
import { MDXRemote } from 'nextra/mdx-remote';
import { fetchShadcnComponent } from '@/utils';
import { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

export const toc = [{ depth: 2, value: 'Installation', id: 'installation' }];

function kebabCaseToTitleCase(str: string) {
  const newString = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}

const { h2: H2 } = getMDXComponents();

const UiComponentViewer: FC<{ id: string }> = async ({ id }) => {
  const data = await fetchShadcnComponent(id);

  if (!data) {
    return null;
  }

  const npmDependencies = (data.dependencies || []).map((dep) => ({
    label: dep,
    url: `https://www.npmjs.com/package/${dep}`,
  }));

  // @ts-expect-error -- fixme I think it never exist? can be removed?
  const shadcnDependencies = (data.registryDependencies || []).map((dep) => {
    if (dep.startsWith('https://ui.reactflow')) {
      const depName = dep.split('/').pop().split('.').shift();
      const label = kebabCaseToTitleCase(depName);
      return {
        label,
        url: `/components/${depName}`,
        highlight: true,
      };
    }
    return {
      label: `shadcn/ui/${dep}`,
      url: `https://ui.shadcn.com/docs/components/${dep}`,
      highlight: false,
    };
  });
  const components = { $Tabs: NextraTabs };

  return (
    <div className="mt-5">
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Demo Code</TabsTrigger>
        </TabsList>
        <TabsContent
          className="data-[state=inactive]:hidden min-h-[500px]"
          forceMount
          value="preview"
        >
          <iframe
            className="w-full h-[500px] rounded-md border border-gray-200 "
            src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/components/${data.name}`}
          />
        </TabsContent>
        <TabsContent className="min-h-[500px]" value="code">
          <MDXRemote compiledSource={data.demoMDX} />
        </TabsContent>
      </Tabs>
      <div className="flex gap-2 items-center my-5">
        <div>Dependencies:</div>
        {npmDependencies.map((dep) => (
          <a
            className="bg-gray-100 rounded-md px-1 py-0.5"
            key={dep.label}
            href={dep.url}
          >
            {dep.label}
          </a>
        ))}
        {shadcnDependencies.map((dep) => (
          <a
            className={cn(
              'rounded-md px-1 py-0.5',
              dep.highlight ? 'text-primary bg-primary/5' : 'bg-gray-100',
            )}
            key={dep.label}
            href={dep.url}
          >
            {dep.label}
          </a>
        ))}
      </div>
      <div className="mt-20">
        {/* @ts-expect-error -- false positive */}
        <H2 id="installation">Installation</H2>
        <Tabs defaultValue="shadcn" className="mt-5">
          <TabsList>
            <TabsTrigger value="shadcn">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="shadcn">
            <Text className="mt-5">
              Make sure to follow the{' '}
              <Link href="/components#prerequisites" variant="primary">
                prerequisites
              </Link>{' '}
              before installing the component.
            </Text>
            <MDXRemote
              compiledSource={data.installMDX}
              components={components}
            />
          </TabsContent>
          <TabsContent value="manual">
            <Heading size="xs" className="mt-5">
              1. Install Dependencies
            </Heading>
            <MDXRemote compiledSource={data.npmMDX} components={components} />
            <Heading size="xs" className="mt-10">
              2. Copy Paste into your app
            </Heading>
            <MDXRemote compiledSource={data.componentMDX} />
            <Heading size="xs" className="mt-10">
              3. Update the import paths to match your project setup.
            </Heading>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UiComponentViewer;
