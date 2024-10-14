import {
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@xyflow/xy-ui';
import { useData } from 'nextra/data';
import { Code } from 'nextra/components';
import { MDXRemote } from 'next-mdx-remote';
import clsx from 'clsx';

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
          <MDXRemote {...data.demoMDX} components={{ code: Code }} scope={{}} />
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
            <MDXRemote
              {...data.installMDX}
              components={{ code: Code }}
              scope={{}}
            />
          </TabsContent>
          <TabsContent value="manual">
            <Heading size="xs">1. Install Dependencies</Heading>
            <MDXRemote
              {...data.npmMDX}
              components={{ code: Code }}
              scope={{}}
            />
            <Heading size="xs">2. Copy Paste into your app</Heading>
            <MDXRemote
              {...data.componentMDX}
              components={{ code: Code }}
              scope={{}}
            />
            <Heading size="xs">
              3. Update the import paths to match your project setup.
            </Heading>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UiComponentViewer;
