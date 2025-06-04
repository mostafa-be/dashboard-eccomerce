import PageProfile from "@/app/components/Account/PageProfile";
import Heading from "@/utils/Heading";
import React from "react";

/**
 * Profile Page
 * Displays the user's profile information with a heading and description.
 */
const Page = () => {
  return (
    <>
      <Heading
        title="Profile"
        description="Manage your personal information and account settings."
        keywords="profile, account, settings"
      />
      <PageProfile />
    </>
  );
};

export default Page;
