import { FallbackProps } from 'react-error-boundary';

function EmailSubmittingError(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Something went wrong when submitting email
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

export default EmailSubmittingError;
