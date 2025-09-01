
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Initializes and mounts the React application to the DOM.
 */
const initializeApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    // This is a critical failure; the app cannot start without its root element.
    throw new Error("Could not find root element to mount to. The application cannot be rendered.");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// To prevent a race condition where the script executes before the DOM is fully parsed,
// we must ensure the DOM is ready before trying to mount the React app.
//
// We check the document.readyState. If it's 'interactive' or 'complete',
// the DOM is already ready, and we can initialize the app immediately.
// Otherwise, we add an event listener for 'DOMContentLoaded' to run the
// initialization logic as soon as the DOM is ready. This approach makes
// the application startup robust and reliable.
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initializeApp();
} else {
  document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
}
