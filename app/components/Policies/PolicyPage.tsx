import { Policy } from "@/app/@types/types";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import PolicyDetails from "./PolicyDetails";

type PolicyPageProps = {
  policy: Policy;
};

const PolicyPage = ({policy}: PolicyPageProps) => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
    { name: "Policies", url: "/en/dashboard/layout/policies" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter links={links} active="Policy details" />
      <PolicyDetails policy={policy} />
    </section>
  );
};

export default PolicyPage;
