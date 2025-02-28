import React, { useState } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import toast from "react-hot-toast";
import { useEditStatusOrderMutation } from "@/redux/features/orders/ordersApi";

type ChangeStatusProps = {
  orderId: string;
  currentStatus: string;
};

const ChangeStatus = ({ orderId, currentStatus }: ChangeStatusProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [editStatusOrder, { isSuccess, isError }] =
    useEditStatusOrderMutation();

  const handleChange = async (newStatus: string) => {
    setStatus(newStatus);
    await editStatusOrder({ id: orderId, data: { status: newStatus } });
  };

  if (isSuccess) {
    toast.success("Order status updated successfully!");
  }

  if (isError) {
    toast.error("Failed to update order status.");
  }

  return (
    <div className="w-full  flex gap-4 items-center justify-end mt-5">
      <div className="max-w-[400px]">
        <Select value={status} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue className=" uppercase" placeholder="Select status">{status}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChangeStatus;
