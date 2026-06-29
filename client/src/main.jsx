import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/inter';

import { Toaster } from 'react-hot-toast';

import './styles/reset.css';
import './styles/variables.css';
import './styles/globals.css';
import './index.css';

import App from './App.jsx';

import Providers from './providers/Providers';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <App />

      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: '14px',
            padding: '16px',
            fontSize: '14px',
          },

          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#ffffff',
            },
          },

          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </Providers>
  </StrictMode>
);