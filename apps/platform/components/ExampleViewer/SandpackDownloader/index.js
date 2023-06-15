import React from 'react';
import { Button } from '@chakra-ui/react';
import { useSandpack } from '@codesandbox/sandpack-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import indexHtml from '!raw-loader!./template/index.html';
import craPackageJson from './template/package.json';
import craAppEnv from '!raw-loader!./template/react-app-env.d.ts';
import tsConfigJson from './template/tsconfig.json';
import readmeMd from '!raw-loader!./template/README.md';

const ignoreSrcFiles = ['/package.json', 'tsconfig.json'];

function useSandpackDownloader({ fileName = 'react-flow-pro-example' }) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const downloadZip = async () => {
    const zip = new JSZip();

    // create package.json
    const packageJson = JSON.parse(files['/package.json'].code);

    packageJson.name = 'react-flow-pro-example';
    packageJson.scripts = craPackageJson.scripts;
    packageJson.browserslist = craPackageJson.browserslist;
    packageJson.dependencies['react-scripts'] = '^5.0.0';

    zip.file('package.json', JSON.stringify(packageJson, null, 2));

    // create index.html
    zip.file('public/index.html', indexHtml);

    // create src folder
    Object.entries(files).map(([fileName, fileContent]) => {
      if (!ignoreSrcFiles.includes(fileName)) {
        zip.file(`src${fileName}`, fileContent.code);
      }
    });

    // create cra env file
    zip.file('src/react-app-env.d.ts', craAppEnv);

    // create tsconfig.json
    zip.file('tsconfig.json', JSON.stringify(tsConfigJson, null, 2));

    // create README.MD
    zip.file('README.md', readmeMd);

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${fileName}.zip`);
  };

  return downloadZip;
}

export default useSandpackDownloader;
