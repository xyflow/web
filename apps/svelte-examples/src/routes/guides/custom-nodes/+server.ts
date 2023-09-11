// Template for ALL endpoints serving the code snippets
// No need to edit these
// Will be overwritten by "pnpm run create:endpoints"

import { json } from '@sveltejs/kit';

export function POST() {
  const files = import.meta.glob(['./*.js', './*.ts', './*.svelte', './*css', '!**/+server.ts'], {
    as: 'raw',
    eager: true
  });

  let filesClean: { [key: string]: string } = {};

  // Loose ./ for each filename
  // +page.svelte becomes App.svelte for correct display in Sandpack
  filesClean = Object.keys(files).reduce((filesCleanAcc: { [key: string]: string }, filename) => {
    if (filename === './+page.svelte') {
      filesCleanAcc['App.svelte'] = files[filename];
    } else {
      filesCleanAcc[filename.substring(2)] = files[filename];
    }

    return filesCleanAcc;
  }, {});

  return json(filesClean);
}
