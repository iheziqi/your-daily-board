import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Landing, { action as newsletterAction } from './pages/Landing';
import Error from './pages/Error';
import ErrorBoundaryFallback from './components/errors/ErrorBoundary';
import NewsletterSettings, {
  loader as settingsLoader,
} from './pages/NewsletterSettings';
import LoginForm, { action as loginFormAction } from './components/LoginForm';
import LoadingModal from './components/LoadingModal';
import YourDailyBoardPreview from './components/YourDailyBoardPreview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
    action: newsletterAction,
    children: [
      {
        index: true,
        element: <YourDailyBoardPreview />,
        errorElement: <p>Something went wrong :(</p>,
      },
    ],
  },
  {
    path: '/subscriptions',
    element: <NewsletterSettings />,
    errorElement: <Error />,
    loader: settingsLoader,
    id: 'subscriptions',
  },
  {
    path: '/login',
    element: <LoginForm />,
    errorElement: <Error />,
    action: loginFormAction,
    id: 'login',
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function WrappedApp() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <App />
      </ErrorBoundary>
    </Suspense>
  );
}

export default WrappedApp;
