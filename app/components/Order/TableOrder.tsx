import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card } from "../ui/card";

type TableOrderProps = {
  orderItems: {
    product: {
      title: string;
    };
    color: {
      name: string;
      code: string;
    };
    size: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
};

const TableOrder = ({ orderItems }: TableOrderProps) => {
  const taxRate = 0.1; // Example tax rate of 10%
  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const taxAmount = totalAmount * taxRate;
  const totalWithTax = totalAmount + taxAmount;

  const formattedTotalAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalAmount);

  const formattedTaxAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(taxAmount);

  const formattedTotalWithTax = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalWithTax);

  return (
    <Card className="w-full mt-10 bg-white dark:bg-black-100 shadow-md rounded-md p-4">
      <Table>
        <TableCaption>Product Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {item.product.title}
              </TableCell>
              <TableCell>{item.color.name}</TableCell>
              <TableCell>{item.size.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Subtotal</TableCell>
            <TableCell className="text-right">{formattedTotalAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Tax (10%)</TableCell>
            <TableCell className="text-right">{formattedTaxAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{formattedTotalWithTax}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
};

export default TableOrder;
