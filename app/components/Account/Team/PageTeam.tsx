"use client";
import React from "react";
import ChangerExporter from "../../ui/ChangerExporter";
import { useGetTeamMembersQuery } from "@/redux/features/users/usersApi";
import { User } from "@/app/@types/types";
import TeamManagement from "./TeamManagement";

/**
 * PageTeam Component
 * Displays team management UI with breadcrumb navigation and team member list.
 */
const PageTeam = () => {
  const { data, isLoading, error } = useGetTeamMembersQuery({}, {});
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Account", url: "/en/dashboard/account" },
  ];

  if (isLoading) {
    console.log("Loading team members...");
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500">Failed to load team members.</div>;
  }

  // Fallback if no team data
  const teamMembers: User[] = data?.team || [];

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Team" />

<TeamManagement team={teamMembers} />
   </section>
  );
};

export default PageTeam;
