import {
  Heading,
  Text,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Link,
} from '@xyflow/xy-ui';
import { useData } from 'nextra/hooks';
import { getPagesUnderRoute } from 'nextra/context';
import { Code, Tabs as NextraTabs } from 'nextra/components';
import { RemoteContent } from 'xy-shared';
import clsx from 'clsx';

const components = {
  code: Code,
  $Tabs: NextraTabs,
};

function kebabCaseToTitleCase(str: string) {
  const newString = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}

function UiComponentViewer() {
  const data = useData();

  if (!data) {
    return null;
  }

  const npmDependencies = (data.dependencies || []).map((dep) => ({
    label: dep,
    url: `https://www.npmjs.com/package/${dep}`,
  }));

  const componentPages = getPagesUnderRoute('/components').reduce(
    (acc, folder) => {
      const pages = getPagesUnderRoute(folder.route);
      for (const page of pages) {
        acc.set(page.name, page.route);
      }
      return acc;
    },
    new Map<string, string>(),
  );

  const shadcnDependencies = (data.registryDependencies || []).map((dep) => {
    if (dep.startsWith('https://')) {
      const depName = dep.split('/').pop().split('.').shift();
      const label = kebabCaseToTitleCase(depName);

      const url = componentPages.get(depName);

      if (!url) {
        throw new Error('No page found for component: ' + depName);
      }

      return {
        label,
        url: url,
        highlight: true,
      };
    }
    return {
      label: `shadcn/ui/${dep}`,
      url: `https://ui.shadcn.com/docs/components/${dep}`,
      highlight: false,
    };
  });

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
            className={clsx(
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
        <Heading className="mb-5" size="sm">
          Installation
        </Heading>
        <Tabs defaultValue="shadcn">
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
            <RemoteContent
              {...data.installMDX}
              mdx={data.installMDX.compiledSource}
              components={components}
              scope={{}}
            />
          </TabsContent>
          <TabsContent value="manual">
            <Heading size="xs" className="mt-5">
              1. Install Dependencies
            </Heading>
            <RemoteContent
              {...data.npmMDX}
              mdx={data.npmMDX.compiledSource}
              components={components}
              scope={{}}
            />
            <Heading size="xs" className="mt-10">
              2. Copy Paste into your app
            </Heading>
            <RemoteContent
              {...data.componentMDX}
              mdx={data.componentMDX.compiledSource}
              components={components}
              scope={{}}
            />
            <Heading size="xs" className="mt-10">
              3. Update the import paths to match your project setup.
            </Heading>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-20">
        <Heading className="mb-5" size="sm">
          Usage
        </Heading>
        {data.demoMDX?.compiledSource && (
          <>
            <Heading size="xs" className="mt-10">
              1. Copy the component into your app
            </Heading>

            <RemoteContent
              {...data.demoMDX}
              mdx={data.demoMDX.compiledSource}
              components={components}
              scope={{}}
            />
          </>
        )}
      </div>

      <Heading size="xs" className="mt-10">
        {data.demoMDX?.compiledSource
          ? '2. Connect the component with your React Flow application.'
          : '1. Connect the component with your React Flow application.'}
      </Heading>
      <RemoteContent
        {...data.pageMDX}
        mdx={data.pageMDX.compiledSource}
        components={components}
        scope={{}}
      />
    </div>
  );
}

export default UiComponentViewer;
