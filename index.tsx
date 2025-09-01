import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // This is a critical failure; the app cannot start without its root element.
  throw new Error("Could not find root element to mount to. The application cannot be rendered.");
}

// Create the React root and render the application.
// This is the standard entry point for a Vite + React application.
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
