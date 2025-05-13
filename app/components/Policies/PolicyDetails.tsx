import { Policy } from "@/app/@types/types";
import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

/**
 * PolicyDetails Component
 * Displays the details of a policy, including its title and content rendered as HTML.
 *
 * @param {Props} props - The component props.
 * @param {Policy} props.policy - The policy data to display.
 * @returns {JSX.Element} The rendered policy details component.
 */
type Props = {
  policy: Policy;
};

const PolicyDetails = ({ policy }: Props) => {
  return (
    <Card className="w-full space-y-6 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard>
        <TitleCard
          title="Policy Details"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="space-y-6">
        {/* Policy Title */}
        <div className="w-full flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
            {policy.title}
          </h2>
        </div>

        {/* Policy Content */}
        <div
          className="text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      </CardContent>
    </Card>
  );
};

export default PolicyDetails;
