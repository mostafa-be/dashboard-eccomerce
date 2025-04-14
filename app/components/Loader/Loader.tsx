import React from "react";

const Loader = () => {
  return (
    <section className="w-screen h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading, please wait...
      </h5>
    </section>
  );
};

export default Loader;
