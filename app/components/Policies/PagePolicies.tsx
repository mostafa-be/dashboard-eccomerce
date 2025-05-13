"use client";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import AddPolicyForm from "./AddPolicyForm";
import { useGetAllPoliciesQuery } from "@/redux/features/policies/policiesApi";
import ListPolicies from "./ListPolicies";

/**
 * PagePolicies Component
 * Displays the Policies management content, including a button to create a new policy and a list of policies grouped by type.
 *
 * @returns {JSX.Element} The rendered Policies management content.
 */
const PagePolicies = () => {
  const { data, isLoading, refetch } = useGetAllPoliciesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Breadcrumb navigation links
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
  ];

  // Example policies data
  const policies = isLoading ? [] : data?.policies;

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Policies" />
      <AddPolicyForm refetch={refetch} />
      <ListPolicies policies={policies} isLoading={isLoading} />
    </section>
  );
};

export default PagePolicies;
