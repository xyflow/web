import {
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@xyflow/xy-ui';
import { useData } from 'nextra/data';
import { Code } from 'nextra/components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function UiComponentViewer() {
  const data = useData();

  if (!data) {
    return null;
  }

  const npmDependencies = (data.dependencies || []).map((dep) => ({
    label: dep,
    url: `https://www.npmjs.com/package/${dep}`,
  }));

  const shadcnDependencies = (data.registryDependencies || []).map((dep) => ({
    label: `shadcn/ui/${dep}`,
    url: `https://ui.shadcn.com/docs/components/${dep}`,
  }));

  const jsonUrl = `${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/registry/${data.name}.json`;
  const componentSrc = data.files?.[0]?.content;
  const demoSrc = data.demo?.files?.[0]?.content;

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
            src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/${data.name}`}
          />
        </TabsContent>
        <TabsContent className="min-h-[500px]" value="code">
          <SyntaxHighlighter
            className="[&>code]:block"
            language="tsx"
            style={theme}
          >
            {demoSrc}
          </SyntaxHighlighter>
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
            className="bg-gray-100 rounded-md px-1 py-0.5"
            key={dep.label}
            href={dep.url}
          >
            {dep.label}
          </a>
        ))}
      </div>
      <div>
        <Heading size="sm">Installation</Heading>
        <Tabs defaultValue="shadcn">
          <TabsList>
            <TabsTrigger value="shadcn">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="shadcn">
            <SyntaxHighlighter
              className="[&>code]:block"
              language="bash"
              style={theme}
            >
              {`npx shadcn add ${jsonUrl}`}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="manual">
            <Heading size="xs">1. Install Dependencies</Heading>
            <SyntaxHighlighter
              className="[&>code]:block"
              language="bash"
              style={theme}
            >
              {`npm install ${npmDependencies
                .map((dep) => dep.label)
                .join(' ')}`}
            </SyntaxHighlighter>
            <Heading size="xs">2. Copy Paste into your app</Heading>
            <SyntaxHighlighter
              className="[&>code]:block"
              language="tsx"
              style={theme}
            >
              {componentSrc}
            </SyntaxHighlighter>
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
