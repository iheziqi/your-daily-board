/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

/**
 * Error page.
 */
function Error() {
  // inside of an errorElement, this hook returns
  // anything thrown during an action, loader, or rendering.
  const error = useRouteError();

  // This returns true if a route error is a route error response.
  if (isRouteErrorResponse(error)) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">
              {error.data.message || '404 Not Found'}
            </h1>
            <Link to="/" className="btn btn-primary my-6">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">
            Something went wrong :( Please try again later
          </h1>
          <Link to="/" className="btn btn-primary my-6">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
