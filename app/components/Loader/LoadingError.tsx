import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

type LoadingErrorProps = {
  message?: string;
  onRetry: () => void;
};

const LoadingError = ({
  message = "Something went wrong.",
  onRetry,
}: LoadingErrorProps) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <AlertCircle size={48} className="text-red-500" />
      <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {message}
      </h5>
      <Button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
      >
        Retry
      </Button>
    </section>
  );
};

export default LoadingError;
