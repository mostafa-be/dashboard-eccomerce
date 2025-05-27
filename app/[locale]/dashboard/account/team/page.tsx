import PageTeam from "@/app/components/Account/Team/PageTeam";
import Heading from "@/utils/Heading";
import React from "react";

/**
 * Team Management Page
 * Provides an interface for managing team members and their roles.
 * Includes SEO heading for better discoverability.
 */
const page = () => (
  <>
    <Heading
      title="Team Management"
      description="Manage your team members and their roles from the dashboard."
      keywords="team, management, dashboard"
    />
    <PageTeam />
  </>
);

export default page;
