"use client";
import * as React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../../ui/card";
import { columns } from "./columns";
import { TableBestSelling } from "./TableBestSelling";

const BestSelling = () => {
  const data = [
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 0,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 0,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
    {
      _id: "15278",
      title: "T-short",
      price: 1235,
      quantityOriginal: 7687,
      quantity: 12,
      purchased: 1246,
      ratings: 5,
    },
  ];

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
