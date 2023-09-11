// Template for ALL endpoints serving the code snippets
// No need to edit these
// Will be overwritten by "pnpm run create:endpoints"

import { json } from '@sveltejs/kit';

export function POST() {
	const files = import.meta.glob(['./*.js', './*.ts', './*.svelte', './*css', '!**/+server.ts'], {
		as: 'raw',
		eager: true
	});

	const filesClean = {};

	// Loose ./ for each filename
	// +page.svelte becomes App.svelte for correct display in Sandpack
	Object.keys(files).forEach((filename) => {
		if (filename === './+page.svelte') {
			filesClean['App.svelte'] = files[filename];
		} else {
			filesClean[filename.substring(2)] = files[filename];
		}
	});

	return json(filesClean);
}
