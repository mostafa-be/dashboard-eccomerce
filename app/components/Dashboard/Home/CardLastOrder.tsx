import Link from "next/link";
import React from "react";
import { format } from 'timeago.js';
import AvatarGenerator from "./AvatarGenerator";

type Props = {
  order: {
    id: string;
    customerName: string;
    totalAmount: number;
    date: string;
  };
  index: number;
};

const CardLastOrder = ({ order, index }: Props) => {
  return (
    <Link
      href={`/en/dashboard`}
      className={`${
        index > 0 && "border-t border-t-slate-200/80 dark:border-t-white"
      } w-full py-2.5 flex items-center justify-between`}
    >
      <div className="flex items-center gap-1.5">
        <AvatarGenerator name={order.customerName} />
        <div className="flex flex-col">
          <p className="text-gray-950 dark:text-white text-[16px] font-[500] line-clamp-1">
            {order.customerName}
          </p>
          <span className="text-sm text-gray-500/90">
            { format(order.date)}
          </span>
        </div>
      </div>
      <div className="">
        <h5 className="text-gray-900 dark:text-white text-lg font-semibold">
          ${order.totalAmount}
        </h5>
      </div>
    </Link>
  );
};

export default CardLastOrder;
