import { compileCodeSnippet } from 'xy-shared/lib/get-static-props/compile-code-snippet';
import { loadJSONFile } from 'xy-shared/lib/get-static-props/utils';

type Demo = {
  files: [{ content: string }];
};

type RegistryComponent = {
  name: string;
  description: string;
  dependencies: string[];
  files: [{ content: string }];
  tags: string[];
  version: string;
};

function kebabCaseToCamelCase(str: string) {
  const newString = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}

export default function getUiComponentConfig(id: string) {
  return async () => {
    const data = loadJSONFile<RegistryComponent>(
      `../../apps/ui-components/public/registry/${id}.json`,
    );

    const demo = loadJSONFile<Demo>(
      `../../apps/ui-components/public/demo/${id}.json`,
    );

    const componentName = kebabCaseToCamelCase(id);

    const demoString = demo.files[0].content;
    const demoMDX = await compileCodeSnippet(demoString, {
      filetype: 'tsx',
      showCopy: true,
      highlight: componentName,
    });

    const componentString = data.files[0].content;
    const componentMDX = await compileCodeSnippet(componentString, {
      filetype: 'tsx',
      showCopy: true,
      filename: `${componentName}.tsx`,
    });

    const jsonUrl = `${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/${data.name}`;
    const installMDX = await compileCodeSnippet(`npx shadcn add ${jsonUrl}`, {
      filetype: 'bash',
      showCopy: true,
    });

    const npmDependencies = (data.dependencies || []).map((dep) => ({
      label: dep,
      url: `https://www.npmjs.com/package/${dep}`,
    }));
    const npmString = `npm install ${npmDependencies
      .map((dep) => dep.label)
      .join(' ')}`;
    const npmMDX = await compileCodeSnippet(npmString, {
      filetype: 'bash',
      showCopy: true,
    });

    return {
      props: {
        ssg: {
          ...data,
          demo,
          demoMDX,
          componentMDX,
          installMDX,
          npmMDX,
        },
      },
      revalidate: 60 * 60 * 24,
    };
  };
}
