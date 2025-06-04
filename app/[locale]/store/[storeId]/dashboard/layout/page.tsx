import React from "react";
import LayoutPage from "@/app/components/Layout/LayoutPage";
import Heading from "@/utils/Heading";

/**
 * Page Component
 * Renders the layout management page using the LayoutPage component.
 *
 * @returns {JSX.Element} The rendered layout management page.
 */
const Page = () => {
  return (
    <>
      <Heading
        title="Website Layout Management"
        keywords="layout, website management, dashboard"
        description="Manage the layout of your website from the dashboard."
      />
      <LayoutPage />
    </>
  );
};

export default Page;
