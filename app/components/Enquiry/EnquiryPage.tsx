import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  useEditEnquiryMutation,
  useGetAllEnquiriesQuery,
} from "@/redux/features/enquiries/enquiriesApi";
import toast from "react-hot-toast";
import ExportAndchange from "./ExportAndchange";
type Props = {
  enquiry: {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    comment: string;
    status: string;
  };
};

const EnquiryPage = ({ enquiry }: Props) => {
  const [status, setStatus] = useState(enquiry.status);
  const [editEnquiry, { isLoading }] = useEditEnquiryMutation();
  const { refetch } = useGetAllEnquiriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const handleUpdateStatus = async () => {
    try {
      const data = { status: status };
      await editEnquiry({ id: enquiry._id, data }).unwrap();
      toast.success("Enquiry status updated successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to update status.";
      toast.error(errorMessage);
    }
  };
  return (
    <section className="w-full">
      <ExportAndchange enquiry={enquiry} />
      <div className="w-full mt-10 grid grid-cols-1 lg:grid-cols-2">
        <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg">
          <HeaderCard className="w-full p-5">
            <TitleCard
              title="Enquiry Information"
              className="text-xl font-semibold text-black dark:text-white"
            />
          </HeaderCard>
          <CardContent className="w-full p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-white">
                  Name:
                </span>
                <span className="text-gray-900 dark:text-gray-300">
                  {enquiry.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-white">
                  Email:
                </span>
                <span className="text-gray-900 dark:text-gray-300">
                  {enquiry.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-white">
                  Mobile:
                </span>
                <span className="text-gray-900 dark:text-gray-300">
                  {enquiry.mobile}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-white">
                  Comment:
                </span>
                <span className="text-gray-900 dark:text-gray-300">
                  {enquiry.comment}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-white">
                  Status:
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {enquiry.status}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-5">
            <div className="w-max">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black-200">
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleUpdateStatus}
              className="bg-blue-650 hover:bg-blue-600 dark:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default EnquiryPage;
