const fs = require("fs");
const path = require("path");

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
      const indexPath = path.join(componentPath, "index.tsx");
      const registryPath = path.join(componentPath, "registry.json");
      const demoPath = path.join(componentPath, "demo.tsx");

      // Read registry file and convert it to an object
      const registryRaw = fs.readFileSync(registryPath, "utf8");
      const registry = JSON.parse(registryRaw);

      // Read index file and add it to the registry object
      const index = fs.readFileSync(indexPath, "utf8");
      registry.files[0].content = index;

      // Write the registry object into the build folder
      const componentOutputPath = path.join(
        registryOutputPath,
        folder.name + ".json",
      );
      fs.writeFileSync(componentOutputPath, JSON.stringify(registry, null, 2));

      // Read demo.tsx file and add it to the demo object
      // TODO: support multiple demo files
      const demoTsx = fs.readFileSync(demoPath, "utf8");
      const demoClean = demoTsx.replace(/\/registry\//g, "");
      const demoFile = {
        files: [
          {
            content: demoClean,
          },
        ],
      };

      // Write demo.json
      fs.writeFileSync(
        path.join(demoOutputPath, folder.name + ".json"),
        JSON.stringify(demoFile),
      );
    }

    // Write overview registry file
    fs.writeFileSync(
      registryOutputPath + "/all-available-components.json",
      JSON.stringify(all),
    );
  });

  console.log("Registry files successfully generated!");
})();
