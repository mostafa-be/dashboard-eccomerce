import React from "react";
import { Card, CardContent } from "../ui/card";
import { TableExpenses } from "./TableExpenses";
import { columns } from "./columns";
import { Expense } from "@/app/@types/types";

type Props = {
  data: Expense[];
};

const ListExpenses = ({ data }: Props) => {
  return (
    <Card className="w-full  px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableExpenses data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListExpenses;
