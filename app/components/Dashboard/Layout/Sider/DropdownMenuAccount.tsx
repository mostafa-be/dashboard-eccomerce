import {
  CreditCard,
  EllipsisVertical,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import React from "react";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function DropdownMenuAccount() {
  const [logout, setLogout] = React.useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logOutHandler = async () => {
    setLogout(true);
    redirect("/");
    await signOut();

  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="p-0 !outline-none  !bg-transparent  border-none shadow-none"
        >
          {" "}
          <EllipsisVertical
            size={20}
            className={" text-gray-700 dark:text-white cursor-pointer"}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 dark:!bg-black-100">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={logOutHandler}>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
