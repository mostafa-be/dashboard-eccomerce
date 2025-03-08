import React from "react";
import { Card, CardContent } from "../ui/card";
import { TableCollections } from "./TableCollections";
import { columns } from "./columns";
type Collection = {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
};
type Props = {
  data: Array<Collection>;
};
const ListCollections = ({ data }: Props) => {
;

  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableCollections data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListCollections;
