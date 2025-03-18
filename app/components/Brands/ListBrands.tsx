"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { TableBrands } from "./TableBrands";

type Brand = {
  _id: string;
  name: string;
  logo: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

type ListBrandsProps = {
  data: Array<Brand>;
};

const ListBrands = ({ data }: ListBrandsProps) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableBrands data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListBrands;
