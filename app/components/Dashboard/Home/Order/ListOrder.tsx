import {
  Card,
  CardContent,
  HeaderCard,
  TitleCard,
} from "@/app/components/ui/card";
import React from "react";
import { TableOrder } from "./TableOrder";
import { columns } from "./columns";
import Link from "next/link";
import { Order } from "@/app/components/Orders/columns";

type ListOrdersProps = {
  data: Order[];
};

const ListOrder = ({ data }: ListOrdersProps) => {
  return (
    <Card className="max-md:mt-5 mt-10 w-full px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard>
        <div className="flex items-center justify-between">
          <TitleCard title="List Order Overview" />
          <Link
            href="/en/dashboard/orders"
            className="text-sm text-orange-600 dark:text-orange-400 underline"
          >
            See More
          </Link>
        </div>
      </HeaderCard>
      <CardContent className="mt-5">
        <TableOrder data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListOrder;
