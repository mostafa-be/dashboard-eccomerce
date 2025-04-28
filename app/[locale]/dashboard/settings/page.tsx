import SettingsPage from "@/app/components/Settings/SettingsPage";
import Heading from "@/utils/Heading";
import React from "react";

const Page = () => {
  return (
    <>
      <Heading
        title="CRM Settings"
        keywords="CRM, Settings"
        description="CRM Settings"
      />
      <SettingsPage />
    </>
  );
};

export default Page;
