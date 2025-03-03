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
    const category = path.basename(path.dirname(mdxFile));
    const fileName = path.basename(mdxFile);
    const destFolder = path.parse(fileName).name;
    const destFolderPath = path.join(destDir, category, destFolder);

    const readmePath = path.join(destFolderPath, 'README.mdx');

    if (!fs.existsSync(destFolderPath)) {
      console.log('[Warning]: this path does not exist:', destFolderPath);
    } else {
      fs.copyFileSync(mdxFile, readmePath);
    }
  });
}

copyMdxFiles(examplesSrcDir, examplesDestDir);
console.log('MDX files copied successfully.');
