"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { TableBlogs } from "./TableBlogs";
import { columns } from "./columns";
import {Blog} from "./columns";
type ListBrandsProps = {
  data: Array<Blog>;
};

const ListBlogs = ({ data }: ListBrandsProps) => {
  return (
    <Card className="w-full mt-10 px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableBlogs data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListBlogs;
