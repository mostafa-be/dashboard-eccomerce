"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

type BrandInformationProps = {
  brand: {
    _id: string;
    name: string;
    logo: {
      url: string;
      public_id: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid date"
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
};

const BrandInformation = ({ brand }: BrandInformationProps) => {
  const { name, createdAt, updatedAt,logo } = brand;
  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-5">
      <HeaderCard className="w-full  flex items-center justify-between">
        <TitleCard
          title="Brand Information"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full mt-5 space-y-4">
        <div className="w-full flex items-center justify-center">
          {logo?.url ? (
            <Image
            src={logo?.url}
            alt={name}
            className="w-40 h-40 object-cover rounded-full"
            width={80}
            height={80}
            title="Brand Logo"
            priority={true}
          />
          ) : (
            <Skeleton className="w-40 h-40 rounded-full" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Name
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Created At
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {formatDate(createdAt)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Updated At
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {formatDate(updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandInformation;
