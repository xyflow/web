import Express from 'express';
import Cors from 'cors';

import * as Glob from 'glob';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import * as Process from 'node:process';
import * as Vite from 'vite';

const examplesGlob = './{react,svelte}/**/index.html';
const examples = Glob.globSync(examplesGlob);
const sources = examples.map(
  (example) => '/' + example.replace('/index.html', '/source.json'),
);

const { dependencies } = JSON.parse(
  Fs.readFileSync(Path.join(Process.cwd(), 'package.json'), 'utf-8'),
);

const app = Express();
const vite = await Vite.createServer({
  configFile: Path.join(Process.cwd(), 'vite.config.js'),
  root: Process.cwd(),
  server: { middlewareMode: true, cors: true },
  appType: 'mpa',
});

app.use(Cors());

for (const source of sources) {
  app.get(source, (req, res) => {
    const dir = Path.join(Process.cwd(), Path.dirname(req.url));

    if (Fs.existsSync(Path.join(dir, 'dependencies.json'))) {
      const source = { files: {}, dependencies: {} };

      for (const file of Fs.readdirSync(dir, { recursive: true })) {
        const content = Fs.readFileSync(Path.join(dir, file), 'utf-8');

        if (file == 'dependencies.json') {
          for (const pkg of JSON.parse(content)) {
            if (dependencies[pkg]) {
              source.dependencies[pkg] = dependencies[pkg];
            }
          }
        } else {
          source.files[file] = content;
        }
      }

      res.json(source);
    } else {
      res.sendStatus(404);
    }
  });
}

app.use(vite.middlewares);
app.listen(5173, '0.0.0.0');
