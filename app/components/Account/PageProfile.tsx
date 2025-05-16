import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import ProfileContent from "./ProfileContent";

const PageProfile = () => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Account", url: "/en/dashboard/account" },
  ];
  return (
    <section className="w-full space-y-10">
          <ChangerExporter links={links} active="Profile" />
          <ProfileContent />
    </section>
  );
};

export default PageProfile;
