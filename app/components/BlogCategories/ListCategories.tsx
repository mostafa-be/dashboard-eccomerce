import React from "react";
import { Card, CardContent } from "../ui/card";
import { TableCategories } from "./TableCategories";
import { columns } from "./columns";

type category = {
  _id: string;
  name: string;
};
type Props = {
  data: Array<category>;
};
const ListCategories = ({ data }: Props) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableCategories data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListCategories;
