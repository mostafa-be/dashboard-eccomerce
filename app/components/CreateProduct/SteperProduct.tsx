import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

const SteperProduct = ({
  active,
  setActive,
}: {
  active: number;
  setActive: (active: number) => void;
}) => {
  const steps = [
    "Product Description",
    "Product Information",
    "Product Media",
    "Product Preview",
  ];

  return (
    <Card className="w-full  bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="flex flex-col items-center justify-center space-y-4">
        <TitleCard
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
          title="Product Steps"
        />
      </HeaderCard>
      <CardContent className="w-full">
        <div className="w-full flex flex-col gap-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 cursor-pointer transition-transform duration-300 ${
                index === active
                  ? "text-blue-600 dark:text-blue-400 transform scale-105"
                  : index < active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  index === active
                    ? "border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-400"
                    : index < active
                    ? "border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-400"
                    : "border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-600 dark:bg-gray-800"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-base font-medium transition-opacity duration-300 ${
                    index === active ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SteperProduct;
