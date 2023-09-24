import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Landing from './pages/Landing';
import Error from './pages/Error';
import EmailSubmittingError from './components/EmailSubmittingError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
    // action: newsletterAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function WrappedApp() {
  return (
    <ErrorBoundary FallbackComponent={EmailSubmittingError}>
      <App />;
    </ErrorBoundary>
  );
}

export default WrappedApp;
