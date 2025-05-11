"use client";

import React from "react";
import ChangerExporter from "../ui/ChangerExporter";

import { useGetAllFaqsQuery } from "@/redux/features/faqs/faqsApi";

import AddFaqForm from "./AddFaqForm";
import FaqList from "./FaqList";

/**
 * PageFaqs Component
 * Displays the FAQs management content, including breadcrumb navigation, a list of FAQs, a form to add a new FAQ, and delete functionality.
 *
 * @returns {JSX.Element} The rendered FAQs management content.
 */
const PageFaqs = () => {
  const { data, isLoading, refetch } = useGetAllFaqsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const faqs = data?.faqs || [];

  // Breadcrumb navigation links
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "layout", url: "/en/dashboard/layout" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="FAQs Management" />

      {/* Add FAQ Form */}
      <AddFaqForm refetch={refetch} />

      {/* FAQs List */}
      <FaqList faqs={faqs} isLoading={isLoading} refetch={refetch} />
    </section>
  );
};

export default PageFaqs;
