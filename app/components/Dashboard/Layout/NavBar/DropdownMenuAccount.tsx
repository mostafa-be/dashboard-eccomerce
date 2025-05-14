import {
  CreditCard,
  EllipsisVertical,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
  HelpCircle,
  Shield,
  Globe,
  Bell,
  FileText,
  Star,
} from "lucide-react";
import Link from "next/link";
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

/**
 * DropdownMenuAccount Component
 * Displays a dropdown menu for account-related actions, including navigation links and logout functionality.
 *
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
export function DropdownMenuAccount() {
  const [logout, setLogout] = React.useState(false);

  // Trigger logout query
  useLogOutQuery(undefined, {
    skip: !logout,
  });

  // Logout handler
  const logOutHandler = async () => {
    setLogout(true);
    redirect("/");
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="md:w-10 md:h-10 border-none rounded-full flex items-center justify-center p-0 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        >
          <EllipsisVertical
            size={20}
            className="text-gray-700 dark:text-white cursor-pointer"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 bg-white dark:bg-black-100 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <DropdownMenuLabel className="text-gray-800 dark:text-gray-200 font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Profile */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <User className="text-blue-600 dark:text-blue-400" />
              <span className="text-gray-800 dark:text-gray-200">Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          {/* Billing */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/billing"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <CreditCard className="text-green-600 dark:text-green-400" />
              <span className="text-gray-800 dark:text-gray-200">Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          {/* Settings */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Settings className="text-yellow-600 dark:text-yellow-400" />
              <span className="text-gray-800 dark:text-gray-200">Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Team */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/team"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Users className="text-purple-600 dark:text-purple-400" />
              <span className="text-gray-800 dark:text-gray-200">Team</span>
            </Link>
          </DropdownMenuItem>

          {/* New Team */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/new-team"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Plus className="text-pink-600 dark:text-pink-400" />
              <span className="text-gray-800 dark:text-gray-200">New Team</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Notifications */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/notifications"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Bell className="text-orange-600 dark:text-orange-400" />
              <span className="text-gray-800 dark:text-gray-200">
                Notifications
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Documents */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/documents"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <FileText className="text-teal-600 dark:text-teal-400" />
              <span className="text-gray-800 dark:text-gray-200">
                Documents
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Favorites */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/favorites"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Star className="text-yellow-600 dark:text-yellow-400" />
              <span className="text-gray-800 dark:text-gray-200">
                Favorites
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Help */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/help"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <HelpCircle className="text-cyan-600 dark:text-cyan-400" />
              <span className="text-gray-800 dark:text-gray-200">Help</span>
            </Link>
          </DropdownMenuItem>

          {/* Privacy */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/privacy"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Shield className="text-teal-600 dark:text-teal-400" />
              <span className="text-gray-800 dark:text-gray-200">Privacy</span>
            </Link>
          </DropdownMenuItem>

          {/* Language */}
          <DropdownMenuItem asChild>
            <Link
              href="/en/dashboard/account/language"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Globe className="text-orange-600 dark:text-orange-400" />
              <span className="text-gray-800 dark:text-gray-200">Language</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        {/* Logout */}
        <DropdownMenuItem
          onClick={logOutHandler}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800 transition-all"
        >
          <LogOut className="text-red-600 dark:text-red-400" />
          <span className="text-gray-800 dark:text-gray-200">Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
