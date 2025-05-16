import React from "react";
import ChangerExporter from "../../ui/ChangerExporter";
import SettingsContent from "./SettingsContent";

const PageSettings = () => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Account", url: "/en/dashboard/account" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter links={links} active="Settings" />
      <SettingsContent />
    </section>
  );
};

export default PageSettings;
