import PageCreateBanner from "@/app/components/Banners/PageCreateBanner";
import Heading from "@/utils/Heading";
import React from "react";

/**
 * Create Banner Page
 * Renders the page for creating a new banner with a heading and form.
 *
 * @returns {JSX.Element} The rendered create banner page.
 */
const Page = () => {
  return (
    <>
      <Heading
        title="Create Banner"
        description="Create a new banner"
        keywords="create, banner, dashboard"
      />
      <PageCreateBanner />
    </>
  );
};

export default Page;
