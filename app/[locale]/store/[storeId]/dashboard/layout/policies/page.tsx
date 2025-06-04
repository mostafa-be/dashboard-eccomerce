import React from "react";
import Heading from "@/utils/Heading";
import PagePolicies from "@/app/components/Policies/PagePolicies";

/**
 * Policies Page Component
 * Renders the Policies management page with a heading and the PagePolicies component.
 *
 * @returns {JSX.Element} The rendered Policies management page.
 */
const Page = () => {
  return (
    <>
      <Heading
        title="Policies Management"
        keywords="policies, terms, dashboard"
        description="Manage website policies and terms from the dashboard."
      />
      <PagePolicies />
    </>
  );
};

export default Page;
