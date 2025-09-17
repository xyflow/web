import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

const container = document.querySelector('#app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
