"use client";

import React from "react";
import { useSelector } from "react-redux";
import { DropdownMenuAccount } from "./DropdownMenuAccount";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { User } from "@/app/@types/types";

/**
 * InfoUser Component
 * Displays user information, including avatar, name, role, and a dropdown menu for account actions.
 *
 * @returns {JSX.Element} The rendered user information component.
 */
const InfoUser = () => {
  // Select user data from the Redux store
  const { user } = useSelector(
    (state: {
      auth: {
        user: User;
      };
    }) => state.auth
  );

  const { name, avatar, functionality } = user;

  return (
    <div className="flex items-center gap-1.5">
      {/* User Avatar */}
      <Avatar>
        {avatar ? (
          <AvatarImage src={avatar?.url} alt={name} />
        ) : (
          <AvatarFallback>{name.toUpperCase().slice(0, 1)}</AvatarFallback>
        )}
      </Avatar>

      {/* User Name and Role */}
      <div className="hidden md:flex flex-col items-center gap-1">
        <p className="text-sm font-[500] text-black dark:text-white/90">
          {name}
        </p>
        <span className="text-sm text-gray-700/90 dark:text-white/90 capitalize">
          {functionality}
        </span>
      </div>

      {/* Dropdown Menu */}
      <DropdownMenuAccount />
    </div>
  );
};

export default InfoUser;
