import { Card, CardContent } from "@/app/components/ui/card";
import React from "react";
import { TableUsers } from "./TableUsers";
import { columns, User } from "./columns";

interface ListCustomerProps {
  data: User[];
}

const ListCustomer: React.FC<ListCustomerProps> = ({ data }) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableUsers data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListCustomer;
