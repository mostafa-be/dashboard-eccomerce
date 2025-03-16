import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { TableColors } from "./TableColors";

type color = {
  _id: string;
  name: string;
  code: string;
};
type Props = {
  data: Array<color>;
};
const ListColors = ({ data }: Props) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableColors data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListColors;
