"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";
import { TableEnquiries } from "./TableEnquiries";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  createdAt: Date;
};

type ListEnquiriesProps = {
  data: Array<Enquiry>;
};

const ListEnquiries = ({ data }: ListEnquiriesProps) => {
  return (
    <Card className="w-full  px-5 py-5 col-span-9 bg-white dark:bg-black-100 shadow rounded-lg">
      <CardContent className="w-full">
        <TableEnquiries data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListEnquiries;
