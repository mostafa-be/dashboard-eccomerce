import React from "react";

type Props = {
  className?: string;
  message: string;
  onRetry: () => void;
};

const CardError = ({ message="", onRetry, className }: Props) => {
  return (
    <div
      className={`w-full flex items-center justify-center bg-gray-200 animate-pulse rounded-md ${className}`}
    >

      <p className="text-sm text-center font-medium text-red-700 dark:text-red-400">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-all"
      >
        Retry
      </button>
    </div>
  );
};

export default CardError;
