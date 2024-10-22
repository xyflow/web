// vite.config.ts
import react from "file:///Users/peter/code/xyflow/web/node_modules/.pnpm/@vitejs+plugin-react@4.3.2_vite@5.4.9_@types+node@22.5.4_less@4.2.0_terser@5.36.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as Fs from "node:fs";
import * as Path from "node:path";
import * as Process from "node:process";
import { defineConfig } from "file:///Users/peter/code/xyflow/web/node_modules/.pnpm/vite@5.4.9_@types+node@22.5.4_less@4.2.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import { globSync } from "file:///Users/peter/code/xyflow/web/node_modules/.pnpm/glob@11.0.0/node_modules/glob/dist/esm/index.js";
import { resolve } from "node:path";
import { svelte } from "file:///Users/peter/code/xyflow/web/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@3.1.2_svelte@4.2.19_vite@5.4.9_@types+node@22.5.4_less@4.2.0_terser@5.36.0_/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
var __vite_injected_original_dirname = "/Users/peter/code/xyflow/web/apps/example-apps";
var examplesGlob = "./{react,svelte}/**/index.html";
var examples = globSync(examplesGlob);
var vite_config_default = defineConfig({
  plugins: [generatePublicAssets(), svelte(), react()],
  server: {
    host: "0.0.0.0",
    cors: true
  },
  build: {
    rollupOptions: {
      // Rollup expects input to be an object, but vite discards the keys and
      // uses its own system internally. Because of that we just use the index
      // of any given input as the "key".
      input: {
        index: resolve(__vite_injected_original_dirname, "index.html"),
        ...Object.fromEntries(
          examples.map((path, i) => [i, resolve(__vite_injected_original_dirname, path)])
        )
      }
    }
  }
});
function generatePublicAssets() {
  let examples2 = { react: [], svelte: [] };
  return {
    name: "generate-public-assets",
    options() {
      walkExamples(Path.join(Process.cwd(), "react"), (dir) => {
        const relative2 = Path.relative(Process.cwd(), dir);
        examples2.react.push(relative2);
        generateAssetsForExample(dir);
      });
      walkExamples(Path.join(Process.cwd(), "svelte"), (dir) => {
        const relative2 = Path.relative(Process.cwd(), dir);
        examples2.svelte.push(relative2);
        generateAssetsForExample(dir);
      });
      Fs.writeFileSync(
        Path.join(out, "all.json"),
        JSON.stringify(examples2, null, 2)
      );
    },
    handleHotUpdate({ modules }) {
      if (!modules.length) return modules;
      let dir = Path.dirname(modules[0].file);
      while (!Fs.existsSync(Path.join(dir, "index.html"))) {
        dir = Path.join(dir, "..");
      }
      walkExamples(dir, generateAssetsForExample);
      return modules;
    }
  };
}
var out = Path.join(Process.cwd(), "public");
var { dependencies } = JSON.parse(
  Fs.readFileSync(Path.join(Process.cwd(), "package.json"), "utf-8")
);
function walkExamples(dir, cb = generateAssetsForExample) {
  if (Fs.existsSync(Path.join(dir, "dependencies.json"))) {
    cb(dir);
  } else {
    for (const file of Fs.readdirSync(dir, { withFileTypes: true })) {
      if (file.isDirectory()) {
        walkExamples(Path.join(dir, file.name), cb);
      }
    }
  }
}
function generateAssetsForExample(dir) {
  const relative2 = Path.relative(Process.cwd(), dir);
  const source = { files: {}, dependencies: {} };
  for (const file of Fs.readdirSync(dir, {
    recursive: true,
    encoding: "utf-8"
  })) {
    const filePath = Path.join(dir, file);
    if (Fs.lstatSync(filePath)?.isDirectory()) continue;
    const content = Fs.readFileSync(filePath, "utf-8");
    if (file == "dependencies.json") {
      for (const pkg of JSON.parse(content)) {
        if (!dependencies[pkg]) continue;
        source.dependencies[pkg] = dependencies[pkg];
      }
    } else if (file === "preview.jpg") {
      Fs.cpSync(filePath, Path.join(out, relative2, "preview.jpg"));
    } else {
      source.files[file] = content;
    }
  }
  const json = JSON.stringify(source, null, 2);
  Fs.mkdirSync(Path.join(out, relative2), { recursive: true });
  Fs.writeFileSync(Path.join(out, relative2, "source.json"), json);
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGV0ZXIvY29kZS94eWZsb3cvd2ViL2FwcHMvZXhhbXBsZS1hcHBzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGV0ZXIvY29kZS94eWZsb3cvd2ViL2FwcHMvZXhhbXBsZS1hcHBzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wZXRlci9jb2RlL3h5Zmxvdy93ZWIvYXBwcy9leGFtcGxlLWFwcHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBGcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCAqIGFzIFBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCAqIGFzIFByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGdsb2JTeW5jIH0gZnJvbSAnZ2xvYic7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xuXG5jb25zdCBleGFtcGxlc0dsb2IgPSAnLi97cmVhY3Qsc3ZlbHRlfS8qKi9pbmRleC5odG1sJztcbmNvbnN0IGV4YW1wbGVzID0gZ2xvYlN5bmMoZXhhbXBsZXNHbG9iKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW2dlbmVyYXRlUHVibGljQXNzZXRzKCksIHN2ZWx0ZSgpLCByZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIGNvcnM6IHRydWUsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gUm9sbHVwIGV4cGVjdHMgaW5wdXQgdG8gYmUgYW4gb2JqZWN0LCBidXQgdml0ZSBkaXNjYXJkcyB0aGUga2V5cyBhbmRcbiAgICAgIC8vIHVzZXMgaXRzIG93biBzeXN0ZW0gaW50ZXJuYWxseS4gQmVjYXVzZSBvZiB0aGF0IHdlIGp1c3QgdXNlIHRoZSBpbmRleFxuICAgICAgLy8gb2YgYW55IGdpdmVuIGlucHV0IGFzIHRoZSBcImtleVwiLlxuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgaW5kZXg6IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICAuLi5PYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgICAgZXhhbXBsZXMubWFwKChwYXRoLCBpKSA9PiBbaSwgcmVzb2x2ZShfX2Rpcm5hbWUsIHBhdGgpXSksXG4gICAgICAgICksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcblxuLy9cblxuZnVuY3Rpb24gZ2VuZXJhdGVQdWJsaWNBc3NldHMoKTogUGx1Z2luIHtcbiAgbGV0IGV4YW1wbGVzID0geyByZWFjdDogW10gYXMgc3RyaW5nW10sIHN2ZWx0ZTogW10gYXMgc3RyaW5nW10gfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdnZW5lcmF0ZS1wdWJsaWMtYXNzZXRzJyxcbiAgICBvcHRpb25zKCkge1xuICAgICAgd2Fsa0V4YW1wbGVzKFBhdGguam9pbihQcm9jZXNzLmN3ZCgpLCAncmVhY3QnKSwgKGRpcikgPT4ge1xuICAgICAgICBjb25zdCByZWxhdGl2ZSA9IFBhdGgucmVsYXRpdmUoUHJvY2Vzcy5jd2QoKSwgZGlyKTtcblxuICAgICAgICBleGFtcGxlcy5yZWFjdC5wdXNoKHJlbGF0aXZlKTtcbiAgICAgICAgZ2VuZXJhdGVBc3NldHNGb3JFeGFtcGxlKGRpcik7XG4gICAgICB9KTtcblxuICAgICAgd2Fsa0V4YW1wbGVzKFBhdGguam9pbihQcm9jZXNzLmN3ZCgpLCAnc3ZlbHRlJyksIChkaXIpID0+IHtcbiAgICAgICAgY29uc3QgcmVsYXRpdmUgPSBQYXRoLnJlbGF0aXZlKFByb2Nlc3MuY3dkKCksIGRpcik7XG5cbiAgICAgICAgZXhhbXBsZXMuc3ZlbHRlLnB1c2gocmVsYXRpdmUpO1xuICAgICAgICBnZW5lcmF0ZUFzc2V0c0ZvckV4YW1wbGUoZGlyKTtcbiAgICAgIH0pO1xuXG4gICAgICBGcy53cml0ZUZpbGVTeW5jKFxuICAgICAgICBQYXRoLmpvaW4ob3V0LCAnYWxsLmpzb24nKSxcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXhhbXBsZXMsIG51bGwsIDIpLFxuICAgICAgKTtcbiAgICB9LFxuICAgIGhhbmRsZUhvdFVwZGF0ZSh7IG1vZHVsZXMgfSkge1xuICAgICAgaWYgKCFtb2R1bGVzLmxlbmd0aCkgcmV0dXJuIG1vZHVsZXM7XG4gICAgICBsZXQgZGlyID0gUGF0aC5kaXJuYW1lKG1vZHVsZXNbMF0uZmlsZSEpO1xuXG4gICAgICB3aGlsZSAoIUZzLmV4aXN0c1N5bmMoUGF0aC5qb2luKGRpciwgJ2luZGV4Lmh0bWwnKSkpIHtcbiAgICAgICAgZGlyID0gUGF0aC5qb2luKGRpciwgJy4uJyk7XG4gICAgICB9XG5cbiAgICAgIHdhbGtFeGFtcGxlcyhkaXIsIGdlbmVyYXRlQXNzZXRzRm9yRXhhbXBsZSk7XG5cbiAgICAgIHJldHVybiBtb2R1bGVzO1xuICAgIH0sXG4gIH07XG59XG5cbmNvbnN0IG91dCA9IFBhdGguam9pbihQcm9jZXNzLmN3ZCgpLCAncHVibGljJyk7XG5jb25zdCB7IGRlcGVuZGVuY2llcyB9ID0gSlNPTi5wYXJzZShcbiAgRnMucmVhZEZpbGVTeW5jKFBhdGguam9pbihQcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJyksICd1dGYtOCcpLFxuKTtcblxuZnVuY3Rpb24gd2Fsa0V4YW1wbGVzKFxuICBkaXI6IHN0cmluZyxcbiAgY2I6IChkaXI6IHN0cmluZykgPT4gdm9pZCA9IGdlbmVyYXRlQXNzZXRzRm9yRXhhbXBsZSxcbikge1xuICAvLyBJZiB0aGUgZGlyZWN0b3J5IGNvbnRhaW5zIGEgYGRlcGVuZGVuY2llcy5qc29uYCBmaWxlLCB3ZSBrbm93IGl0J3MgYW4gZXhhbXBsZS5cbiAgLy8gSW4gdGhhdCBjYXNlIHdlIHJlY3Vyc2l2ZWx5IHJlYWQgZXZlcnkgZmlsZSBpbiB0aGUgZGlyZWN0b3J5IGFuZCBjb25zdHJ1Y3RcbiAgLy8gYSBKU09OIG9iamVjdCBtYXBwaW5nIGZpbGUgcGF0aHMgdG8gdGhlaXIgY29udGVudC5cbiAgaWYgKEZzLmV4aXN0c1N5bmMoUGF0aC5qb2luKGRpciwgJ2RlcGVuZGVuY2llcy5qc29uJykpKSB7XG4gICAgY2IoZGlyKTtcbiAgfVxuXG4gIC8vIE90aGVyd2lzZSwgd2UgcmVjdXJzaXZlbHkgd2FsayBhbnkgc3ViZGlyZWN0b3JpZXMgdW50aWwgd2UgZmluZCBhbiBleGFtcGxlXG4gIC8vIG9yIGhpdCBhIGRlYWQgZW5kLlxuICBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgRnMucmVhZGRpclN5bmMoZGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSkpIHtcbiAgICAgIGlmIChmaWxlLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgd2Fsa0V4YW1wbGVzKFBhdGguam9pbihkaXIsIGZpbGUubmFtZSksIGNiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVBc3NldHNGb3JFeGFtcGxlKGRpcjogc3RyaW5nKSB7XG4gIGNvbnN0IHJlbGF0aXZlID0gUGF0aC5yZWxhdGl2ZShQcm9jZXNzLmN3ZCgpLCBkaXIpO1xuICBjb25zdCBzb3VyY2UgPSB7IGZpbGVzOiB7fSwgZGVwZW5kZW5jaWVzOiB7fSB9O1xuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBGcy5yZWFkZGlyU3luYyhkaXIsIHtcbiAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgZW5jb2Rpbmc6ICd1dGYtOCcsXG4gIH0pKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBQYXRoLmpvaW4oZGlyLCBmaWxlKTtcbiAgICBpZiAoRnMubHN0YXRTeW5jKGZpbGVQYXRoKT8uaXNEaXJlY3RvcnkoKSkgY29udGludWU7XG5cbiAgICBjb25zdCBjb250ZW50ID0gRnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKTtcblxuICAgIGlmIChmaWxlID09ICdkZXBlbmRlbmNpZXMuanNvbicpIHtcbiAgICAgIGZvciAoY29uc3QgcGtnIG9mIEpTT04ucGFyc2UoY29udGVudCkpIHtcbiAgICAgICAgaWYgKCFkZXBlbmRlbmNpZXNbcGtnXSkgY29udGludWU7XG5cbiAgICAgICAgc291cmNlLmRlcGVuZGVuY2llc1twa2ddID0gZGVwZW5kZW5jaWVzW3BrZ107XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChmaWxlID09PSAncHJldmlldy5qcGcnKSB7XG4gICAgICBGcy5jcFN5bmMoZmlsZVBhdGgsIFBhdGguam9pbihvdXQsIHJlbGF0aXZlLCAncHJldmlldy5qcGcnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvdXJjZS5maWxlc1tmaWxlXSA9IGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHNvdXJjZSwgbnVsbCwgMik7XG5cbiAgRnMubWtkaXJTeW5jKFBhdGguam9pbihvdXQsIHJlbGF0aXZlKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIEZzLndyaXRlRmlsZVN5bmMoUGF0aC5qb2luKG91dCwgcmVsYXRpdmUsICdzb3VyY2UuanNvbicpLCBqc29uKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsT0FBTyxXQUFXO0FBRTlVLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7QUFDdEIsWUFBWSxhQUFhO0FBRXpCLFNBQVMsb0JBQTRCO0FBQ3JDLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsZUFB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
