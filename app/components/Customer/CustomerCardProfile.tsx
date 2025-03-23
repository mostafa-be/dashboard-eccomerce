"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import Image from "next/image";

type CustomerCardProfileProps = {
  user:User;
};

const CustomerCardProfile = ({ user }: CustomerCardProfileProps) => {
  const { name, avatar, email, mobile } = user;

  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3">
      <HeaderCard className="flex items-center justify-between">
        <TitleCard title="Customer Profile" />
      </HeaderCard>
      <CardContent className="w-full mt-5 flex flex-col items-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-blue-500">
          <Image
            src={avatar?.url || "/default-avatar.png"}
            alt={name}
            width={120}
            height={120}
            className="object-cover"
          />
        </div>
        <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{mobile}</p>
      </CardContent>
    </Card>
  );
};

export default CustomerCardProfile;
