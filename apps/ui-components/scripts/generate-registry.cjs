const fs = require("fs");
const path = require("path");

const deploymentURL =
  process.env.VERCEL_ENV && process.env.VERCEL_URL
    ? process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_URL}`
      : "https://ui.reactflow.dev"
    : "http://localhost:3004";

const componentsPath = path.join(__dirname, "../registry/components/");
const registryOutputPath = path.join(__dirname, "../public/registry");
const demoOutputPath = path.join(__dirname, "../public/demo");

(async () => {
  console.log("Generating registry files...");

  // Remove old registry files
  try {
    fs.rmSync(registryOutputPath, { recursive: true, force: true });
  } catch (error) {
    console.log("No old registry files found.");
  }

  // Remove old demo files
  try {
    fs.rmSync(demoOutputPath, { recursive: true, force: true });
  } catch (error) {
    console.log("No old registry files found.");
  }

  // Create the output directories if they don't exist
  fs.mkdirSync(registryOutputPath, { recursive: true });
  fs.mkdirSync(demoOutputPath, { recursive: true });

  // Read the components directory
  fs.readdir(componentsPath, { withFileTypes: true }, (_, folders) => {
    const all = { components: [] };
    for (const folder of folders) {
      // Gather all component names
      all.components.push(folder.name);

      // Gather relevant file paths
      const componentPath = path.join(componentsPath, folder.name);
      const appExamplePath = path.join(componentPath, "app-example.tsx");
      const indexPath = path.join(componentPath, "index.tsx");
      const registryPath = path.join(componentPath, "registry.json");
      const demoPath = path.join(componentPath, "component-example.tsx");
      const additionalExamplesPath = path.join(componentPath, "examples");

      // Read registry file and convert it to an object
      const registryRaw = fs.readFileSync(registryPath, "utf8");
      const registry = JSON.parse(registryRaw);

      // Read index file and add it to the registry object
      const index = fs.readFileSync(indexPath, "utf8");
      const page = fs.readFileSync(appExamplePath, "utf8");
      registry.files[0].content = index;

      registry.registryDependencies = registry.registryDependencies.map(
        (dependency) => {
          if (dependency.startsWith("reactflow/")) {
            const component = dependency.split("/")[1];
            return `${deploymentURL}/${component}`;
          }
          return dependency;
        },
      );

      // Write the registry object into the build folder
      const componentOutputPath = path.join(
        registryOutputPath,
        folder.name + ".json",
      );
      fs.writeFileSync(componentOutputPath, JSON.stringify(registry, null, 2));

      let demoContent = null;
      try {
        const demoExists = fs.existsSync(demoPath);
        if (demoExists) {
          demoContent = fs.readFileSync(demoPath, "utf8");
          // Only replace registry paths if we have actual content
          demoContent = demoContent.replace(/registry\//g, "");
        }
      } catch (error) {
        console.log(`No demo file found for ${folder.name}`);
      }

      // If there are additional examples in the additional examples directory, read them and add to the demo content
      // Each example should be stored in a subdirectory with:
      // - example.json file containing the example metadata (right now only title is used),
      // - index.tsx file containing the app example,
      // - component-example.tsx file containing the actual component example demo content.
      const additionalExampleFiles = {};

      if (fs.existsSync(additionalExamplesPath)) {
        const additionalExampleDirs = fs.readdirSync(additionalExamplesPath, {
          withFileTypes: true,
        });

        for (const dir of additionalExampleDirs) {
          if (dir.isDirectory()) {
            const exampleJsonPath = path.join(
              dir.path,
              dir.name,
              "example.json",
            );

            if (!fs.existsSync(exampleJsonPath)) {
              throw new Error(
                `Component example JSON file not found: ${exampleJsonPath}`,
              );
            }

            exampleJsonContent = fs.readFileSync(exampleJsonPath, "utf8");
            const exampleJson = JSON.parse(exampleJsonContent);

            const componentExamplePath = path.join(
              dir.path,
              dir.name,
              "component-example.tsx",
            );

            if (!fs.existsSync(componentExamplePath)) {
              throw new Error(
                `Component example file not found: ${componentExamplePath}`,
              );
            }

            const componentExampleContent =
              fs.readFileSync(componentExamplePath);

            exampleJson.code = componentExampleContent.toString();
            additionalExampleFiles[dir.name] = exampleJson;
          }
        }
      }

      const demoFile = {
        files: [
          {
            content: demoContent || null,
            page: page,
          },
        ],
        examples: additionalExampleFiles,
      };

      // Write the demo file
      fs.writeFileSync(
        path.join(demoOutputPath, folder.name + ".json"),
        JSON.stringify(demoFile, null, 2),
      );
    }

    // Write all.json
    fs.writeFileSync(
      registryOutputPath + "/all-available-components.json",
      JSON.stringify(all, null, 2),
    );
  });

  console.log("Registry files generated successfully!");
})();
