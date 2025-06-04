import React from "react";
import Heading from "@/utils/Heading";
import PageFaqs from "@/app/components/Faqs/PageFaqs";

/**
 * FAQs Page Component
 * Renders the FAQs management page with a heading and the PageFaqs component.
 *
 * @returns {JSX.Element} The rendered FAQs management page.
 */
const Page = () => {
  return (
    <>
      <Heading
        title="FAQs Management"
        keywords="FAQs, questions, answers, dashboard"
        description="Manage frequently asked questions (FAQs) from the dashboard."
      />
      <PageFaqs />
    </>
  );
};

export default Page;
