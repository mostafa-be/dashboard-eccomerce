import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Policy } from "@/app/@types/types";
import CardPolicy from "./CardPolicy";
//import { Loader } from "../ui/loader";

/**
 * ListPolicies Component
 * Displays a list of policies in a card layout. Shows a loading animation while data is being fetched.
 *
 * @param {ListPoliciesProps} props - The component props.
 * @param {Policy[]} props.policies - The list of policies to display.
 * @param {boolean} [props.isLoading] - Indicates if the data is still loading.
 * @returns {JSX.Element} The rendered list of policies.
 */
type ListPoliciesProps = {
  policies: Policy[];
    isLoading?: boolean;

};

const ListPolicies = ({ policies, isLoading }: ListPoliciesProps) => {
  return (
    <Card className="w-full space-y-6 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="w-full">
        <TitleCard
          title="Policies"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        {isLoading ? (
          Array(5).map((_, index) => (
            <div
              key={index}
              className={`w-full h-12 bg-gray-200 animate-pulse rounded-md `}
            />
          ))
        ) : policies.length > 0 ? (
          policies.map((policy) => (
            <CardPolicy key={policy._id} policy={policy} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            No policies available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ListPolicies;
