import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';
import { Button } from '@xyflow/xy-ui';
import { CodeViewer } from 'xy-shared';

type IframeViewerProps = {
  example: string;
  activeFile?: string;
  editorHeight: number | string;
};

export default function IframeViewer({
  example,
  editorHeight = '70vh',
  activeFile = 'App.tsx',
  ...rest
}: IframeViewerProps) {
  const [files, setFiles] = useState<{ [key: string]: string }>(null);
  const [fileFetchFailed, setFileFetchFailed] = useState(false);

  // function openInStackblitz() {
  //   const reactSetup = setup({
  //     dependencies: tailwind
  //       ? {
  //           ...dependencies,
  //           tailwindcss: 'latest',
  //           postcss: 'latest',
  //           autoprefixer: 'latest',
  //         }
  //       : dependencies,
  //     tailwind,
  //   });
  //   // rename files to land in folder src/example/ on stackblitz
  //   const stackblitzFiles = Object.entries(files).reduce(
  //     (filesAcc: { [key: string]: string }, [fileName, file]) => {
  //       const newFileName = `src/example/${fileName}`;
  //       filesAcc[newFileName] = file;

  //       return filesAcc;
  //     },
  //     {},
  //   );

  //   sdk.openProject(
  //     {
  //       title: 'react Example',
  //       files: {
  //         ...reactSetup,
  //         ...stackblitzFiles,
  //       },
  //       template: 'node',
  //     },
  //     {
  //       openFile: activeFile
  //         ? `src/example/${activeFile}`
  //         : 'src/example/App.react',
  //     },
  //   );
  // }

  useEffect(() => {
    const loadFiles = () => {
      const url = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/react/${example}/source.json`;

      fetch(url)
        .then((res) => res.json())
        .then((source) => setFiles(source.files))
        .catch(() => setFileFetchFailed(true));
    };

    loadFiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!files && fileFetchFailed) {
    return (
      <div
        style={{ height: editorHeight }}
        className={`w-full color nx-bg-primary-100 flex justify-center content-center flex-wrap`}
      >
        <p className="text-react">Example failed to load</p>
      </div>
    );
  }

  return (
    <CodeViewer
      files={files ? files : { 'App.tsx': 'Loading...' }}
      editorHeight={editorHeight}
      showOpenInCodeSandbox={false}
      framework="react"
      readOnly
      activeFile={activeFile}
      customPreview={
        <iframe
          src={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/react/${example}/index.html`}
          loading="lazy"
          width="100%"
          height="100%"
          className="example"
        />
      }
      customOpenButton={
        <Button
          // onClick={openInStackblitz}
          size="sm"
          className="font-medium text-[10px] h-6 bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Open in Stackblitz
        </Button>
      }
      {...rest}
    />
  );
}
