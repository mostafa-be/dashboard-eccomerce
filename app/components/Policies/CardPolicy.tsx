import { Policy } from "@/app/@types/types";
import Link from "next/link";
import React from "react";
import { Pencil, View } from "lucide-react";
import { AlertDeletePolicy } from "./AlertDeletePolicy";

/**
 * CardPolicy Component
 * Displays a single policy card with a link to view the policy details.
 *
 * @param {CardPolicyProps} props - The component props.
 * @param {Policy} props.policy - The policy data to display.
 * @returns {JSX.Element} The rendered policy card component.
 */
type CardPolicyProps = {
  policy: Policy;
};

const CardPolicy = ({ policy }: CardPolicyProps) => {
  const { type, title } = policy;

  // Replace spaces with hyphens in the type
  const formattedType = type.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-black-100 border  rounded-lg  transition-shadow duration-300">
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 capitalize">
        {title}
      </h4>
      <div className="flex items-center gap-2">
        <AlertDeletePolicy type={type} />
        <Link
          href={`/en/dashboard/layout/policies/edit/${formattedType}`}
          className="flex items-center justify-center"
        >
          <Pencil size={20} className="hover:text-blue-400 transition-all" />
        </Link>
        <Link
          href={`/en/dashboard/layout/policies/${formattedType}`}
          className="flex items-center justify-center"
        >
          <View size={20} className="hover:text-green-400 transition-all" />
        </Link>
      </div>
    </div>
  );
};

export default CardPolicy;
