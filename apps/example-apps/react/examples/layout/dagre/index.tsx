import React from 'react';

import { App } from './App';
import { createRoot } from 'react-dom/client';

import './index.css';


const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<App />);
