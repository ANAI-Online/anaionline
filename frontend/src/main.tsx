import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IS_DEMO, setTransport } from './api/client';
import { App } from './App';
import { registerServiceWorker } from './lib/push';
import './styles.css';

async function start() {
  if (IS_DEMO) {
    const { demoTransport } = await import('./api/demo');
    setTransport(demoTransport);
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
start();
registerServiceWorker();
