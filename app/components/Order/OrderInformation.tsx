import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

type OrderInformationProps = {
  order: {
    _id: string;
    method: string;
    paidAt: Date;
    createdAt: Date;
    orderStatus: string;
    totalPrice: number;
  };
};

const OrderInformation = ({ order }: OrderInformationProps) => {
  const { _id, method, paidAt, createdAt, orderStatus, totalPrice } = order;
  const formattedPaidAt = new Intl.DateTimeFormat("en-US").format(new Date(paidAt));
  const formattedCreatedAt = new Intl.DateTimeFormat("en-US").format(new Date(createdAt));
  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3">
      <HeaderCard className="flex items-center justify-between">
        <TitleCard className="" title="Order Information" />
      </HeaderCard>
      <CardContent className="w-full mt-5 flex flex-col">
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            ID
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {_id}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Payment Method
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {method}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Paid At
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {formattedPaidAt}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Created At
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {formattedCreatedAt}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Order Status
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {orderStatus}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Total Price
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {formattedTotalPrice}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformation;
