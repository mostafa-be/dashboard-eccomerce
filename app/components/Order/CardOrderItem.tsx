import React from "react";
import { Card, HeaderCard, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type CardOrderItemProps = {
  item: {
    product: {
      title: string;
    };
    color: {
      name: string;
      code: string;
    };
    size: {
      name: string;
    };
    quantity: number;
    price: number;
  };
};

const CardOrderItem = ({ item }: CardOrderItemProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item?.price || 0);

  return (
    <Card className="w-full min-h-32 bg-white dark:bg-black-100 rounded-t-lg drop-shadow-sm overflow-hidden">
      <HeaderCard className="w-full h-[250px]">
        <Skeleton className="w-full h-full rounded-none" />
      </HeaderCard>
      <CardContent className="w-full flex-col gap-1.5 p-2">
        <h5 className="text-lg text-gray-900 dark:text-white">
          {item?.product?.title}
        </h5>
        <div className="w-full flex gap-1 items-center">
          <span className="text-gray-900 text-[16px] font-normal dark:text-white w-16">
            Price
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            :
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            {formattedPrice}
          </span>
        </div>
        <div className="w-full flex gap-1 items-center">
          <span className="text-gray-900 text-[16px] font-normal dark:text-white w-16">
            Color
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            :
          </span>
          <div
            title={`Color ${item?.color?.name}`}
            style={{ backgroundColor: item?.color?.code }}
            className="rounded-full p-2"
          />
        </div>
        <div className="w-full flex gap-1 items-center">
          <span className="text-gray-900 text-[16px] font-normal dark:text-white w-16">
            Quantity
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            :
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            {item?.quantity}
          </span>
        </div>
        <div className="w-full flex gap-1 items-center">
          <span className="text-gray-900 text-[16px] font-normal dark:text-white w-16">
            Size
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white">
            :
          </span>
          <span className="text-gray-900 text-[16px] font-normal dark:text-white capitalize">
            {item?.size?.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOrderItem;
