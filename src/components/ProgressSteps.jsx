import { STEPS } from '../utils/constants';

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      {/* Steps */}
      <div className="mb-6 flex justify-between gap-2 sm:gap-4">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-1 flex-col items-center gap-2 sm:gap-3"
          >
            {/* Step Number */}
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 sm:h-12 sm:w-12 ${
                index < currentStep
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : index === currentStep
                  ? 'bg-gray-900 text-white ring-4 ring-gray-900/10 shadow-lg'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Step Label */}
            <span
              className={`text-center text-xs font-semibold sm:text-sm ${
                index <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step}
            </span>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={`absolute left-[calc(50%+24px)] top-5 hidden h-0.5 w-[calc(100%-24px)] sm:block ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gray-900 to-gray-700 transition-all duration-700 ease-out"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressSteps;
