import { Card, CardContent } from "@/app/components/ui/card";
import React from "react";

import { columns, Product, } from "./columns";
import { TableProducts } from "./TableProducts";
interface ListProductsProps {
  data: Product[];

}

const ListProducts: React.FC<ListProductsProps> = ({
  data,

}) => {
  return (
    <Card className="w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full ">
        <TableProducts data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListProducts;
