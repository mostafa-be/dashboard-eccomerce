import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { TableSizes } from "./TableSizes";


type Size = {
  _id: string;
  name: string;
};
type Props = {
  data: Array<Size>;
};
const ListSizes = ({ data }: Props) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableSizes data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListSizes;
