"use client"
import { User } from "@/app/@types/types";
import React, { useState } from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Input } from "../ui/input";

type SelectedUserProps = {
  customers: User[];
  setSelectedUserId: (userId: string | null) => void;
  selectedUserId: string | null;
};

/**
 * SelectedUser Component
 * Allows selecting a user ID for the order.
 *
 * @param {SelectedUserProps} props - The component props.
 * @param {User[]} props.customers - The list of customers to select from.
 */
const SelectedUser = ({
  customers,
  selectedUserId,
  setSelectedUserId,
}: SelectedUserProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * Filters customers based on the search term.
   */
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="w-full flex items-center justify-between">
        <TitleCard title="Select Customer" />
        <div className="relative">
          <Input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </HeaderCard>
      <CardContent className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className={`border rounded-lg p-4 flex flex-col items-center justify-between cursor-pointer ${
              selectedUserId === customer._id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => setSelectedUserId(customer._id)}
          >
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {customer.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {customer.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {customer.mobile}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SelectedUser;
