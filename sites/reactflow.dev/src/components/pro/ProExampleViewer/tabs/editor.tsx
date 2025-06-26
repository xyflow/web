import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackFiles,
} from '@codesandbox/sandpack-react';

const editorHeight = 650;
const ignoreFiles = [
  '/package-lock.json',
  '/public/favicon.ico',
  '/src/vite-env.d.ts',
  '/.gitignore',
  '/config.json',
  '/.eslintrc.cjs',
  '/vite.config.ts',
  '/tsconfig.json',
  '/tsconfig.node.json',
];

const theme = {
  ...aquaBlue,
  colors: { ...aquaBlue.colors, accent: 'hsl(var(--primary))' },
};

function ProExampleCodeEditor({ files }: { files: SandpackFiles }) {
  const visibleFiles = files ? Object.keys(files).filter((file) => !ignoreFiles.includes(file)) : [];

  return (
    <SandpackProvider options={{ visibleFiles, activeFile: 'src/App.tsx' }} files={files} theme={theme}>
      <SandpackLayout>
        <SandpackFileExplorer style={{ height: editorHeight }} autoHiddenFiles />
        <SandpackCodeEditor wrapContent style={{ height: editorHeight }} showLineNumbers showTabs={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default ProExampleCodeEditor;
