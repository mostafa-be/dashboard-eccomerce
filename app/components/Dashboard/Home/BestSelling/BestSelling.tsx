"use client";
import * as React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../../ui/card";
import { columns, Product } from "./columns";
import { TableBestSelling } from "./TableBestSelling";

type BestSellingProps = {
  data:Product[]
}

const BestSelling = ({data}:BestSellingProps) => {

  return (
    <Card className="max-md:mt-5 w-full min-h-[200px]  px-5 py-5   md:col-span-9 lg:col-span-6 bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard className="flex flex-wrap gap-3 items-center justify-between">
        <TitleCard title="Best Selling products" />
      </HeaderCard>
      <CardContent className="w-full  ">
        <TableBestSelling columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default BestSelling;
