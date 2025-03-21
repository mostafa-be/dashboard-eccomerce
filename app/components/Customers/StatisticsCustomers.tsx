"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { User } from "./columns";
import { Users, ShieldOff, ShoppingCart, UserX } from "lucide-react";

type StatisticsCustomersProps = {
  customers: Array<User>;
};

const StatisticsCustomers = ({ customers }: StatisticsCustomersProps) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [blockedCustomers, setBlockedCustomers] = useState(0);
  const [customersWithOrders, setCustomersWithOrders] = useState(0);
  const [customersWithoutOrders, setCustomersWithoutOrders] = useState(0);

  useEffect(() => {
    const total = customers.length;
    const blocked = customers.filter((customer) => customer.isBlocked).length;
    const withOrders = customers.filter(
      (customer) => customer.orders.length > 0
    ).length;
    const withoutOrders = total - withOrders;

    setTotalCustomers(total);
    setBlockedCustomers(blocked);
    setCustomersWithOrders(withOrders);
    setCustomersWithoutOrders(withoutOrders);
  }, [customers]);

  const statistics = [
    {
      title: "Total Customers",
      value: totalCustomers,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      textColor: "text-white",
      icon: <Users size={90} className="text-white" />,
    },
    {
      title: "Blocked Customers",
      value: blockedCustomers,
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      textColor: "text-white",
      icon: <ShieldOff size={90} className="text-white" />,
    },
    {
      title: "Customers with Orders",
      value: customersWithOrders,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      textColor: "text-white",
      icon: <ShoppingCart size={90} className="text-white" />,
    },
    {
      title: "Customers without Orders",
      value: customersWithoutOrders,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-black",
      icon: <UserX size={90} className="text-black" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {statistics.map((statistic, index) => (
        <Card
          key={index}
          className={`relative w-full rounded-lg shadow-lg p-5 flex flex-col items-center justify-center overflow-hidden ${statistic.bgColor} hover:shadow-xl transition-shadow duration-300`}
        >
          <div
            className={` absolute top-1 left-2 opacity-40  ${statistic.textColor}`}
          >
            {statistic.icon}
          </div>
          <CardContent className=" flex flex-col items-center">
            <TitleCard
              title={statistic.title}
              className={`text-lg font-semibold text-center ${statistic.textColor}`}
            />
            <span className={`text-4xl font-extrabold ${statistic.textColor}`}>
              {statistic.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCustomers;
