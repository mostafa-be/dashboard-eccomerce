import { User } from "@/app/@types/types";
import React from "react";
import { columns } from "./columns";
import { Card, CardContent } from "../../ui/card";
import { TableTeam } from "./TableTeam";

type Props = {
  team: User[];
};

/**
 * TeamManagement
 * Displays the team management table inside a styled card.
 * Shows a verified badge icon above the avatar if the user is verified.
 */
const TeamManagement = ({ team }: Props) => {
  // Ensure team is always an array to avoid hydration mismatch
  const safeTeam = Array.isArray(team) ? team : [];

  return (
    <Card className="w-full">
      <CardContent className="w-full px-5 py-5">
        <TableTeam data={safeTeam} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default TeamManagement;
