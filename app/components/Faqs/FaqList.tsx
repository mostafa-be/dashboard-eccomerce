import { Faq } from "@/app/@types/types";
import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import CardFaq from "./CardFaq";

/**
 * FaqList Component
 * Displays a list of FAQs in cards with options to delete or update each FAQ.
 *
 * @param {FaqListProps} props - The component props.
 * @param {Faq[]} props.faqs - The list of FAQs to display.
 * @param {boolean} props.isLoading - Indicates if the data is loading.
 * @param {Function} props.onDelete - Function to handle deleting an FAQ.
 * @param {Function} props.onUpdate - Function to handle updating an FAQ.
 * @returns {JSX.Element} The rendered FAQ list component.
 */
type FaqListProps = {
  faqs: Faq[];
  isLoading: boolean;
  refetch: () => void;
};

const FaqList = ({ faqs, isLoading,refetch }: FaqListProps) => {
  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6 space-y-6">
      <HeaderCard className="w-full">
        <TitleCard
          title="FAQs"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading FAQs...</p>
        ) : faqs.length > 0 ? (
          <ul className="space-y-4">
            {faqs.map((faq: Faq) => (
              <CardFaq key={faq._id} faq={faq} refetch={refetch} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            No FAQs available. Add a new FAQ using the form above.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FaqList;
