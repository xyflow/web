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
import { getPageMap } from 'nextra/page-map';
import { Tabs as NextraTabs } from 'nextra/components';
import { MDXRemote } from 'nextra/mdx-remote';
import { fetchShadcnComponent } from '@/utils';
import { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

function kebabCaseToTitleCase(str: string) {
  const newString = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}

const { h2: H2, h3: H3 } = getMDXComponents();

const UiComponentViewer: FC<{ id: string }> = async ({ id }) => {
  const data = await fetchShadcnComponent(id);

  if (!data) {
    return null;
  }

  const npmDependencies = (data.dependencies || []).map((dep) => ({
    label: dep,
    url: `https://www.npmjs.com/package/${dep}`,
  }));

  const componentPages = (await getPageMap('/components')).reduce((acc, pageMapItem) => {
    if ('children' in pageMapItem) {
      for (const page of pageMapItem.children) {
        if ('name' in page && 'route' in page) {
          acc.set(page.name, page.route);
        }
      }
    }

    return acc;
  }, new Map<string, string>());

  const shadcnDependencies = (data.registryDependencies || []).map((dep) => {
    if (dep.startsWith('https://')) {
      // handle internal dependencies from React Flow components
      const depName = dep.split('/').pop()!.split('.').shift()!;
      const label = kebabCaseToTitleCase(depName);

      const url = componentPages.get(depName);

      if (!url) {
        throw new Error('No page found for component: ' + depName);
      }

      return {
        label,
        url,
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
      <iframe
        className="w-full h-[500px] rounded-md border border-gray-200 "
        src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/components/${data.name}`}
      />
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
            <MDXRemote compiledSource={data.installMDX} components={components} />
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
      <div className="mt-20">
        <H2 id="usage">Usage</H2>
        {data.demoMDX && (
          <>
            <Heading size="xs" className="mt-10">
              1. Copy the component into your app
            </Heading>

            <MDXRemote compiledSource={data.demoMDX} />
          </>
        )}
      </div>

      <Heading size="xs" className="mt-10">
        {data.demoMDX
          ? '2. Connect the component with your React Flow application.'
          : '1. Connect the component with your React Flow application.'}
      </Heading>
      <MDXRemote compiledSource={data.pageMDX} />

      {data.demoExamples ? (
        <>
          <H2>Examples</H2>
          {Object.entries(data.demoExamples).map(([example, codeMDX]) => (
            <div key={example} className="mt-4">
              <H3>{kebabCaseToTitleCase(example)}</H3>
              <Tabs defaultValue="preview" className="mt-5">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <iframe
                    className="w-full h-[500px] rounded-md border mt-4 border-gray-200 "
                    src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/components/${data.name}/examples/${example}`}
                  />
                </TabsContent>

                <TabsContent value="code">
                  <MDXRemote compiledSource={codeMDX} />
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

/*
 * Nextra enhance its `toc` with imported `toc`s from `.md`/`.mdx` files,
 * so we can use `.mdx` prefix on `.tsx` file and export `toc` variable from here
 */
export const toc = [
  { depth: 2, value: 'Installation', id: 'installation' },
  { depth: 2, value: 'Usage', id: 'usage' },
  // TODO: Figure out how to add examples dynamically to the toc
  // { depth: 2, value: 'Examples', id: 'examples' },
];

export default UiComponentViewer;
