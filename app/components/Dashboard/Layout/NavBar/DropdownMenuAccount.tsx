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
import { useLocale, useTranslations } from "next-intl";

/**
 * Helper component for consistent RTL-aware menu items
 */
const RTLMenuItem = ({
  icon,
  text,
  shortcut,
  href,
  onClick,
  isRtl,
  className = "",
  asChild = true,
}: {
  icon: React.ReactNode;
  text: string;
  shortcut?: string;
  href?: string;
  onClick?: () => void;
  isRtl: boolean;
  className?: string;
  asChild?: boolean;
}) => {
  const baseClasses = `flex items-center justify-between gap-2  py-2 rounded-md transition-all rtl:flex-row-reverse rtl:text-right ${className}`;

  const content = (
    <>
      <div className={`flex iems-center gap-2 ${isRtl ? "" :""}`}>
        <span className="rtl:ml-1 ltr:mr-1">{icon}</span>
        <span className="text-gray-800 dark:text-gray-200">{text}</span>
      </div>
      {shortcut && (
        <DropdownMenuShortcut className="rtl:mr-auto ">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </>
  );

  if (href) {
    return (
      <DropdownMenuItem asChild={asChild}>
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      asChild={asChild}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </DropdownMenuItem>
  );
};

/**
 * DropdownMenuAccount Component
 * Displays a dropdown menu for account-related actions, including navigation links and logout functionality.
 *
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
export function DropdownMenuAccount({ isRTL }: { isRTL?: boolean }) {
  const [logout, setLogout] = React.useState(false);
  const locale = useLocale();
  const t = useTranslations("dashboard.account");

  // Determine if using RTL direction
  const isRtlDirection = isRTL || locale === "ar";

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
      <DropdownMenuContent
        className={`w-56 bg-white dark:bg-black-100 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 ${
          isRtlDirection ? "rtl" : "ltr"
        }`}
        align={isRtlDirection ? "start" : "end"}
        side={isRtlDirection ? "left" : "bottom"}
        sideOffset={5}
        alignOffset={isRtlDirection ? -5 : 5}
      >
        <DropdownMenuLabel className="text-gray-800 dark:text-gray-200 font-semibold rtl:text-right">
          {t("myAccount")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Profile */}
          <RTLMenuItem
            icon={
              <User size={18} className="text-blue-600 dark:text-blue-400" />
            }
            text={t("profile")}
            shortcut="⇧⌘P"
            href={`/${locale}/dashboard/account/profile`}
            isRtl={isRtlDirection}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          />

          {/* Billing */}
          <RTLMenuItem
            icon={
              <CreditCard
                size={18}
                className="text-green-600 dark:text-green-400"
              />
            }
            text={t("billing")}
            shortcut="⌘B"
            href={`/${locale}/dashboard/account/billing`}
            isRtl={isRtlDirection}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          />

          {/* Settings */}
          <RTLMenuItem
            icon={
              <Settings
                size={18}
                className="text-yellow-600 dark:text-yellow-400"
              />
            }
            text={t("settings")}
            shortcut="⌘S"
            href={`/${locale}/dashboard/account/settings`}
            isRtl={isRtlDirection}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Team */}
          <RTLMenuItem
            icon={
              <Users
                size={18}
                className="text-purple-600 dark:text-purple-400"
              />
            }
            text={t("team")}
            href={`/${locale}/dashboard/account/team`}
            isRtl={isRtlDirection}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          />

          {/* New Team */}
          <RTLMenuItem
            icon={
              <Plus size={18} className="text-pink-600 dark:text-pink-400" />
            }
            text={t("newTeam")}
            shortcut="⌘+T"
            href={`/${locale}/dashboard/account/new-team`}
            isRtl={isRtlDirection}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Notifications */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/notifications`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <Bell className="text-orange-600 dark:text-orange-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("notifications")}
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Documents */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/documents`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <FileText className="text-teal-600 dark:text-teal-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("documents")}
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Favorites */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/favorites`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <Star className="text-yellow-600 dark:text-yellow-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("favorites")}
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        <DropdownMenuGroup>
          {/* Help */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/help`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <HelpCircle className="text-cyan-600 dark:text-cyan-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("help")}
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Privacy */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/privacy`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <Shield className="text-teal-600 dark:text-teal-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("privacy")}
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Language */}
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/dashboard/account/language`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                isRtlDirection ? "flex-row-reverse text-right" : ""
              }`}
            >
              <Globe className="text-orange-600 dark:text-orange-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {t("language")}
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
        {/* Logout */}
        <RTLMenuItem
          icon={<LogOut size={18} className="text-red-600 dark:text-red-400" />}
          text={t("logout")}
          shortcut="⇧⌘Q"
          onClick={logOutHandler}
          isRtl={isRtlDirection}
          asChild={false}
          className="hover:bg-red-100 dark:hover:bg-red-800"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
