import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Order } from "@/app/@types/types";

type Props = {
  order: Order;
  index: number;
};

const CardLastOrder = ({ order, index }: Props) => {
  const { _id, user, totalPrice, paidAt } = order;
  // Defensive: fallback if user or user.name is missing
  const name = user?.name || "Unknown";
  const email = user?.email || "No email";
  const avatar = user?.avatar;
  return (
    <Link
      href={`/en/dashboard/orders/${_id}`}
      className={`${
        index > 0 && "border-t border-t-slate-200/80 dark:border-t-white"
      } w-full py-2.5 flex items-center justify-between`}
    >
      <div className="flex items-center gap-1.5">
        <Avatar>
          {avatar ? (
            <AvatarImage src={avatar?.url} alt={name} />
          ) : (
            <AvatarFallback>{name.toUpperCase().slice(0, 1)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
          <p className="text-gray-950 dark:text-white text-[16px] font-[500] line-clamp-1">
            {name || email}
          </p>
          <span className="text-sm text-gray-500/90">
            {new Date(paidAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>
      <div className="">
        <h5 className="text-gray-900 dark:text-white text-lg font-semibold">
          ${totalPrice}
        </h5>
      </div>
    </Link>
  );
};

export default CardLastOrder;
