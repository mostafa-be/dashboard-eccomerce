import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Color, Product, Size } from "@/app/@types/types";

type CardOrderItemProps = {
  item: {
    product:Product;
    color:Color;
    size: Size;
    quantity: number;
    price: number;
  };
};

const CardOrderItem = ({ item }: CardOrderItemProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item?.price || 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item?.quantity * item?.price || 0);

  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-full h-48">
        {item?.product?.images?.[0]?.url ? (
          <Image
            src={item.product.images[0].url}
            alt={item.product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">
              No Image Available
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <CardContent className="p-4 space-y-3">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
          {item?.product?.title}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Price:
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {formattedPrice}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Quantity:
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {item?.quantity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Color:
          </span>
          <div
            title={item?.color?.name}
            style={{ backgroundColor: item?.color?.code }}
            className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Size:
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-white capitalize">
            {item?.size?.name}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Price:
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {totalPrice}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOrderItem;
