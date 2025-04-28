"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { TableTags } from "./TableTags";

type Tag = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type ListTagsProps = {
  data: Array<Tag>;
};

const ListTags = ({ data }: ListTagsProps) => {
  console.log(data);
  return (
    <Card className="w-full px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableTags data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListTags;
