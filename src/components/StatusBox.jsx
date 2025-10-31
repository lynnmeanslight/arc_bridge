const StatusBox = ({ status, error }) => {
  if (!status && !error) return null;

  const isSuccess = status?.includes('completed successfully') || status?.includes('✓');
  const isProcessing = status?.includes('...') || status?.includes('Waiting') || status?.includes('Retrieving');

  return (
    <div
      className={`animate-fade-in flex items-start gap-3 rounded-2xl border-2 p-4 text-sm shadow-md sm:gap-4 sm:p-5 sm:text-base ${
        error
          ? 'border-red-200 bg-red-50 text-red-800'
          : isSuccess
          ? 'border-green-200 bg-green-50 text-green-800'
          : isProcessing
          ? 'border-blue-200 bg-blue-50 text-blue-800'
          : 'border-gray-200 bg-gray-50 text-gray-900'
      }`}
    >
      {error ? (
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
          <svg className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
      ) : isSuccess ? (
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
          <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      ) : isProcessing ? (
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        </div>
      ) : (
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <div className="flex-1 break-words font-medium leading-relaxed">
        {error ? (
          <>
            <strong className="font-bold">Error:</strong> {error}
          </>
        ) : (
          status
        )}
      </div>
    </div>
  );
};

export default StatusBox;
