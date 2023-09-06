import { json } from "@sveltejs/kit";

export function POST() {
    const files = import.meta.glob('./*', { as: 'raw', eager: true });

    delete files['./+page.svelte'];
    delete files['./+server.svelte'];

    return json(files);
}