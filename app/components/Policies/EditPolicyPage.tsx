import { Policy } from "@/app/@types/types";
import React from "react";
import AddPolicyForm from "./AddPolicyForm";
import ChangerExporter from "../ui/ChangerExporter";

type EditPolicyPageProps = {
    policy: Policy;
    refetch: () => void;
};

const EditPolicyPage = ({ policy,refetch }: EditPolicyPageProps) => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
    { name: "Policies", url: "/en/dashboard/layout/policies" },
  ];
  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Edit Policy" />

      {/* Policy form */}
          <AddPolicyForm policy={policy} isEdit refetch={refetch} />
    </section>
  );
};

export default EditPolicyPage;
