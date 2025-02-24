import { Card, CardContent } from "@/app/components/ui/card";
import React from "react";
import { TableOrder } from "./TableOrder";
import { columns, Order } from "./columns";
interface ListOrderGeneralProps {
  data: Order[];

}

const ListOrderGeneral: React.FC<ListOrderGeneralProps> = ({
  data,

}) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableOrder data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListOrderGeneral;
