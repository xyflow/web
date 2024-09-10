import './index.css';
import '@xyflow/svelte/dist/style.css';

import App from './App.svelte';

const app = new App({
  target: document.querySelector('#app'),
  props: {
    name: 'world',
  },
});
