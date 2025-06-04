import PageSettings from "@/app/components/Account/Settings/PageSettings";
import Heading from "@/utils/Heading";
import React from "react";

/**
 * Settings Page
 * Displays the user's account settings and preferences management interface.
 */
const page = () => {
  return (
    <>
      <Heading
        title="Account Settings"
        description="Update your profile, privacy, security, notifications, integrations, and more. Manage all your account preferences in one place."
        keywords="account settings, user preferences, profile, privacy, security, notifications, integrations, dashboard"
      />
      <PageSettings />
    </>
  );
};

export default page;
