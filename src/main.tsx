import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app';

// Styles
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(<App />);
