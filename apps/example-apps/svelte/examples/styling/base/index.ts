import App from './App.svelte';

import './index.css';

const app = new App({
  target: document.querySelector('#app'),
  props: {
    name: 'world',
  },
});
