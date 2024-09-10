import './index.css';
import '@xyflow/react/dist/style.css';

import React from 'react';

import { App } from './App';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<App />);
