import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Landing, { action as newsletterAction } from './pages/Landing';
import Error from './pages/Error';
import EmailSubmittingError from './components/errors/ErrorBoundary';
import NewsletterSettings, {
  loader as settingsLoader,
} from './pages/NewsletterSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
    action: newsletterAction,
  },
  {
    path: '/subscriptions',
    element: <NewsletterSettings />,
    errorElement: <Error />,
    loader: settingsLoader,
    id: 'subscriptions',
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function WrappedApp() {
  return (
    <ErrorBoundary FallbackComponent={EmailSubmittingError}>
      <App />
    </ErrorBoundary>
  );
}

export default WrappedApp;
