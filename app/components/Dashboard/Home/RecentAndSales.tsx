import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../ui/card";
import Link from "next/link";
import CardLastOrder from "./CardLastOrder";
import { Order } from "@/app/@types/types";

type RecentAndSalesProps = {
  data:Order[]
}
const RecentAndSales = ({data}:RecentAndSalesProps) => {

  return (
    <Card className=" max-md:mt-5 md:col-span-4 lg:col-span-3 bg-white dark:bg-black-100 shadow rounded-lg px-5">
      <HeaderCard className="w-full h-[60px] flex items-center justify-between">
        <TitleCard
          className="text-lg font-[500] text-gray-900 dark:text-white"
          title="Recent Sales"
        />
        <Link
          href={`/en/dahboard/order`}
          className="text-sm text-orange-600 dark:text-orange-400 underline"
        >
          See More
        </Link>
      </HeaderCard>
      <CardContent className=" mb-1.5 overflow-y-auto w-full h-[380px] bg-transparent layout-scroll transition-all duration-300 transform ease-in-out">
        <div className="w-full flex flex-col pr-1">
          {data ? (
            data.map((order, index) => (
              <CardLastOrder key={index} index={index} order={order} />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-black text-xl dark:text-white">No result</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAndSales;
