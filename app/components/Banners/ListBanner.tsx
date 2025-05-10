"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { Banner } from "@/app/@types/types";
import { TableBanners } from "./TableBanners";

type ListBannersProps = {
  data: Array<Banner>;
};

const ListBanners = ({ data }: ListBannersProps) => {
  return (
    <Card className="w-full  px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableBanners data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListBanners;
