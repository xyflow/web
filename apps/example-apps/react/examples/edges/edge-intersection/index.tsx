import React, { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';
import { ReactFlowProvider } from '@xyflow/react';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>,
);
