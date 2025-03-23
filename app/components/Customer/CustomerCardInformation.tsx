"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Order } from "../Orders/columns";
import { User } from "../Customers/columns";

type CustomerCardInformationProps = {
  user: User;
};

const CustomerCardInformation = ({ user }: CustomerCardInformationProps) => {
  const {
    name,
    email,
    mobile,
    role,
    functionality,
    isVerified,
    isBlocked,
    orders,
  } = user;
  const totalOrders = orders.length;
  const totalSpent = orders.reduce(
    (acc, order: Order) => acc + order.totalPrice,
    0
  );

  const formattedTotalSpent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalSpent);
  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3">
      <HeaderCard className="flex items-center justify-between">
        <TitleCard title="Customer Information" />
      </HeaderCard>
      <CardContent className="w-full mt-5 flex flex-col">
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Name
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {name}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Email
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {email}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Mobile
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {mobile}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Role
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {role}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Functionality
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {functionality}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Verified
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {isVerified ? "Yes" : "No"}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Blocked
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {isBlocked ? "Yes" : "No"}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Total Orders
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {totalOrders}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            Total Spent
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {formattedTotalSpent}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCardInformation;
