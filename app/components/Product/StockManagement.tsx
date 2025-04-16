import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

type StockManagementProps = {
  quantity: number;
  quantityOriginal: number;
};

const StockManagement = ({
  quantity,
  quantityOriginal,
}: StockManagementProps) => {
  const stockProgress = ((quantity / quantityOriginal) * 100).toFixed(2);
  return (
    <Card className="bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="w-full">
        <TitleCard
          className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          title="Stock Management"
        />
      </HeaderCard>
      <CardContent className="mt-6">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">
          Stock Progress
        </h4>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
          <div
            title="Stock Progress"
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${stockProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {stockProgress}% of stock sold
        </p>
      </CardContent>
    </Card>
  );
};

export default StockManagement;
