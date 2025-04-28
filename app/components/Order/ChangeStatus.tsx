import React, { useState, useEffect } from "react";
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
  refetch: () => void;
};

const ChangeStatus = ({
  orderId,
  currentStatus,
  refetch,
}: ChangeStatusProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [editStatusOrder, { isSuccess, isError, error }] =
    useEditStatusOrderMutation();

  const handleChange = async (newStatus: string) => {
    setStatus(newStatus);
    await editStatusOrder({ id: orderId, data: { status: newStatus } });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order status updated successfully!");
      refetch(); // Refetch the order data after successful update
    }
    if (isError) {
      if (error && "data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  return (
    <div className="w-full flex gap-4 items-center justify-end mt-5">
      <div className="max-w-[400px]">
        <Select value={status} onValueChange={handleChange}>
          <SelectTrigger className="dark:bg-black-100">
            <SelectValue className="uppercase" placeholder="Select status">
              {status}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="dark:bg-black-100">
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChangeStatus;
