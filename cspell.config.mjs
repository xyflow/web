/** @type {import('@cspell/cspell-types').CSpellUserSettings} */
export default {
  language: 'en, de, softwareTerms, misc, companies, npm',
  // Do not lint files from gitignore
  useGitignore: true,
  ignorePaths: [
    'pnpm-lock.yaml',
    '*.json',
    '*.svg',
    '*.js',
    '*.jsx',
    '*.css',
    '*.tsx',
    '*.svelte',
  ],
  ignoreRegExpList: [
    // <Fathom id="..."
    // <YoutubeEmbed id="..."
    /id=".+?"/g,
    /id: '.+?',/g,
    // Words that start with capital letter (like "Moritz")
    /\b[A-Z][a-z]+\b/g,
    /\b[A-Z]+\b/g, // All-caps words like "API"
    /\b[a-z]+[A-Z][a-zA-Z]*\b/g, // camelCase words like "useReactFlow"
    /\b[A-Z][a-zA-Z]*[A-Z][a-zA-Z]*\b/g, // PascalCase words like "ReactFlow"
    /\b[A-Z][a-z]*_[A-Za-z]+\b/g, // Snake case words like "REACT_FLOW"
    /\b\w+-\w+\b/g, // Lowercase kebab case words like "entitree-flex"
    /'[^\s'\n]+'|"[^\s"\n]+"|`[^\s`\n]+`/g, // Single words (no spaces) inside quotes
    // Match words with a colon in them
    /\b\w*:\w*\b/g,
    // Match words with a dot in them
    /\b\w*\.\w*\b/g,
    // Match words with an @ symbol in them (like @username mentions)
    /@\w+/g,
    // Match words containing German special characters
    /\b\w*[äöüÄÖÜß]\w*\b/g,
  ],
  cache: {
    // Cache result in node_modules/.cache instead of root of the project
    useCache: true,
    cacheLocation: 'node_modules/.cache',
  },
  // List of words to be always considered correct
  words: [
    'xyflow',
    'reactflow',
    'svelteflow',
    'datablocks',
    'moritz',
    'shadcn',
    'dagre',
    'elkjs',
    'webkid',
    'layouting',
    'layouted',
    'solidjs',
    'majeure',
    'hayleigh',
    'nodrag',
    'nopan',
    'outgoers',
    'pastable',
    'typosquat',
    'whiteboarding',
    'brainer',
    'crawlable',
    'cryosphere',
    'sumit',
    'nocss',
    'nosource',
    'notarget',
    'pannable',
    'zoomable',
    'trackpad',
    'nokey',
    'reconnectable',
    'subflows',
    'mindmap',
    'classcat',
    'destructures',
    'overwritable',
    'webaudio',
    'simplebezier',
    'ondelete',
    'onedgecreate',
    'onconnectstart',
    'onconnectend',
    'onbeforedelete',
    'writables',
  ],
};
