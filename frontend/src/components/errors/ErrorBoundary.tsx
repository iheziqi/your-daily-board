import { FallbackProps } from 'react-error-boundary';

function ErrorBoundary(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-xl font-bold sm:text-3xl">
            Something went wrong...
          </h1>
          <p className="py-6">{error.message}</p>
          <button
            className="btn btn-primary my-6"
            type="button"
            onClick={resetErrorBoundary}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
