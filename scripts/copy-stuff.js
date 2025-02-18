const fs = require('fs');
const path = require('path');

const examplesSrcDir = path.resolve(
  __dirname,
  '../sites/reactflow.dev/src/content/examples',
);
const examplesDestDir = path.resolve(
  __dirname,
  '../apps/example-apps/react/examples',
);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function copyMdxFiles(srcDir, destDir) {
  const mdxFiles = getAllFiles(srcDir).filter((file) => file.endsWith('.mdx'));

  mdxFiles.forEach((mdxFile) => {
    const fileName = path.basename(mdxFile);
    const destFolder = path.parse(fileName).name;
    const destFolderPath = path.join(destDir, destFolder);

    const readmePath = path.join(destFolderPath, 'README.mdx');
    fs.copyFileSync(mdxFile, readmePath);
    console.log(`Copied ${mdxFile} to ${readmePath}`);
  });
}

copyMdxFiles(examplesSrcDir, examplesDestDir);
console.log('MDX files copied successfully.');
