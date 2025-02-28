import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

type AddressShopProps = {
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

const AddressShop = ({ address }: AddressShopProps) => {
  const { street, city, state, postalCode, country } = address;

  return (
    <Card className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3">
      <HeaderCard className="flex items-center justify-between">
        <TitleCard title="Shop Address" />
      </HeaderCard>
      <CardContent className="w-full mt-5 flex flex-col">
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Street
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {street}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            City
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {city}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            State
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {state}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Postal Code
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {postalCode}
          </span>
        </div>
        <div className="w-full flex gap-1.5 items-center justify-start">
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            Country
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal ">
            :
          </span>
          <span className="text-gray-900 dark:text-white text-[16px] font-normal">
            {country}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressShop;
