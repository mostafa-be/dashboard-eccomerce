import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

type UserInfomationProps = {
  user: {
    name: string;
    email: string;
    mobile: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
    functionality: string;
    isVerified: boolean;
    isBlocked: boolean;
    orders: [
      {
        totalPrice: number;
      }
    ];
  };
};

const UserInfomation = ({ user }: UserInfomationProps) => {
  const {
    name,
    email,
    mobile,
    orders,
    role,
    functionality,
    isVerified,
    isBlocked,
  } = user;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${mobile}`;
  const phoneLink = `tel:${mobile}`;
  // Calculate total spent
  const totalSpent = orders.reduce((acc, order) => acc + order?.totalPrice, 0);
  const formattedTotalSpent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalSpent);
  // Determine if the user is a best customer based on total orders
  const isBestCustomer = orders.length > 10; // Example threshold
  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3">
      <HeaderCard className="flex items-center justify-between">
        <TitleCard title="User Information" />
      </HeaderCard>
      <CardContent className="w-full mt-5 flex flex-col">
        <div className="w-full flex gap-1.5 items-center justify-start ">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            User Name
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {name}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Email
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {email}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Phone
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            <a href={phoneLink} className="text-blue-500 hover:underline">
              {mobile}
            </a>
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            WhatsApp
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Chat on WhatsApp
            </a>
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Total Spent
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {formattedTotalSpent}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Total Orders
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {orders?.length}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Role
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {role}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Functionality
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {functionality}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Verified
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {isVerified ? "Yes" : "No"}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Blocked
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {isBlocked ? "Yes" : "No"}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Best Customer
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {isBestCustomer ? "Yes" : "No"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfomation;
