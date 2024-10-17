const fs = require("fs");
const path = require("path");

const componentsPath = path.join(__dirname, "../registry/components");
const pagesPath = path.join(__dirname, "../app/components");
const templatePath = path.join(__dirname, "../templates");

function toCamelCase(str) {
  const words = str.split("-");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

(async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("\nPlease provide a component name as an argument.\n");
    console.log("pnpm add-component <component-name>");
    return;
  }

  const componentName = args[0];
  const componentNameCamelCase = toCamelCase(componentName);
  const componentDir = path.join(componentsPath, componentName);

  if (fs.existsSync(componentDir)) {
    console.log(`\nComponent "${componentName}" already exists!`);
    return;
  }

  const pageDir = path.join(pagesPath, componentName);

  if (fs.existsSync(pageDir)) {
    console.log(`\nPage for "${componentName}" already exists!`);
    return;
  }

  // Create component and page directories
  fs.mkdirSync(componentDir, { recursive: true });
  fs.mkdirSync(pageDir, { recursive: true });

  // Copy template files to page and component directory
  fs.cpSync(path.join(templatePath, "component"), componentDir, {
    recursive: true,
  });
  fs.cpSync(path.join(templatePath, "page"), pageDir, { recursive: true });

  // Function for replacing all template strings
  const replaceTemplateStrings = (filePath) => {
    const file = fs.readFileSync(filePath, "utf8");
    const newFile = file
      .replace(/\$CAMELCOMPONENT/g, componentNameCamelCase)
      .replace(/\$COMPONENT/g, componentName);
    fs.writeFileSync(filePath, newFile);
  };

  // Replace template strings
  replaceTemplateStrings(path.join(componentDir, "index.tsx"));
  replaceTemplateStrings(path.join(componentDir, "demo.tsx"));
  replaceTemplateStrings(path.join(componentDir, "registry.json"));

  replaceTemplateStrings(path.join(pageDir, "page.tsx"));

  console.log(`\nComponent "${componentName}" created!`);
})();
