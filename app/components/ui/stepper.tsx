import React from "react";

export const Stepper = ({ activeStep, children }: any) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-start space-y-4 pr-6 border-r border-gray-300">
        {React.Children.map(children, (child, index) => (
          <div
            className={`flex items-center space-x-2 text-sm font-semibold transition-all duration-200 ${
              index === activeStep ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                index === activeStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {index + 1}
            </span>
            <span>{child.props.title}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 pl-6">{children[activeStep]}</div>
    </div>
  );
};

export const Step = ({ children }: any) => {
  return <div>{children}</div>;
};
