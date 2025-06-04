"use client";
import React from "react";
import { SideBar, SideBarItem } from "./SideBar";
import { usePathname } from "next/navigation";
import {
  Bell,
  Box,
  ChartPie,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
  PackageOpen,
  Settings,
  UsersRound,
  HandCoins,
  Origami,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useStoreContext } from "@/hooks/ExpiredProtected";

const SideBarDesktop = () => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const locale = useLocale();
  const { storeId } = useStoreContext();
  const pathname = usePathname();
  const t = useTranslations("dashboard.sidebar"); // Initialize translations for sidebar

  // Properly construct URL with storeId - Add leading slash
  const baseUrl = `/${locale}/store/${storeId}/dashboard`;

  // Function to check if a link is active based on current pathname
  const isLinkActive = (linkUrl: string) => {
    // Exact match for dashboard
    if (linkUrl === baseUrl && pathname === baseUrl) {
      return true;
    }

    // For other links, check if pathname starts with the URL (nested routes)
    return linkUrl !== baseUrl && pathname.startsWith(linkUrl);
  };

  // Apply active state to all sidebar items
  return (
    <SideBar expanded={expanded} setExpanded={setExpanded}>
      <SideBarItem
        icon={<LayoutDashboard size={25} />}
        text={t("dashboard")}
        active={isLinkActive(baseUrl)}
        links={false}
        url={baseUrl}
        alert={false}
      />
      <SideBarItem
        icon={<PackageOpen size={25} />}
        text={t("orders")}
        active={isLinkActive(`${baseUrl}/orders`)}
        links={false}
        url={`${baseUrl}/orders`}
        alert={false}
      />
      <SideBarItem
        icon={<HandCoins size={25} />}
        text={t("expenses")}
        active={isLinkActive(`${baseUrl}/expenses`)}
        links={false}
        url={`${baseUrl}/expenses`}
        alert={false}
      />
      <SideBarItem
        icon={<UsersRound size={25} />}
        text={t("customers")}
        active={isLinkActive(`${baseUrl}/customers`)}
        links={false}
        url={`${baseUrl}/customers`}
        alert={false}
      />
      {/*   <SideBarItem
        icon={<UsersRound size={25} />}
        text="Suppliers"
        active={false}
        links={false}
        url={`${url}/suppliers`}
        alert={false}
      />*/}
      <SideBarItem
        icon={<Box size={25} />}
        text={t("products.main")}
        active={pathname.includes(`${baseUrl}/products`)}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: t("products.list"),
            url: `${baseUrl}/products`,
            active:
              isLinkActive(`${baseUrl}/products`) &&
              !pathname.includes("/products/"),
          },
          {
            text: t("products.brands"),
            url: `${baseUrl}/products/brands`,
            active: isLinkActive(`${baseUrl}/products/brands`),
          },
          {
            text: t("products.collections"),
            url: `${baseUrl}/products/collections`,
            active: isLinkActive(`${baseUrl}/products/collections`),
          },
          {
            text: t("products.categories"),
            url: `${baseUrl}/products/categories`,
            active: isLinkActive(`${baseUrl}/products/categories`),
          },
          {
            text: t("products.colors"),
            url: `${baseUrl}/products/colors`,
            active: isLinkActive(`${baseUrl}/products/colors`),
          },
          {
            text: t("products.sizes"),
            url: `${baseUrl}/products/sizes`,
            active: isLinkActive(`${baseUrl}/products/sizes`),
          },
          {
            text: t("products.tags"),
            url: `${baseUrl}/products/tags`,
            active: isLinkActive(`${baseUrl}/products/tags`),
          },
        ]}
      />
      <SideBarItem
        icon={<MessagesSquare size={25} />}
        text={t("enquiries")}
        active={isLinkActive(`${baseUrl}/enquiries`)}
        links={false}
        url={`${baseUrl}/enquiries`}
        alert={false}
      />
      <SideBarItem
        icon={<Bell size={25} />}
        text={t("notifications")}
        active={isLinkActive(`${baseUrl}/notifications`)}
        links={false}
        url={`${baseUrl}/notifications`}
        alert={false}
      />
      <SideBarItem
        icon={<ChartPie size={25} />}
        text={t("analytics")}
        active={isLinkActive(`${baseUrl}/analytics`)}
        links={false}
        url={`${baseUrl}/analytics`}
        alert={false}
      />
      <SideBarItem
        icon={<Newspaper size={25} />}
        text={t("blogs.main")}
        active={pathname.includes(`${baseUrl}/blogs`)}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: t("blogs.list"),
            url: `${baseUrl}/blogs`,
            active:
              isLinkActive(`${baseUrl}/blogs`) && !pathname.includes("/blogs/"),
          },
          {
            text: t("blogs.categories"),
            url: `${baseUrl}/blogs/categories`,
            active: isLinkActive(`${baseUrl}/blogs/categories`),
          },
          {
            text: t("blogs.tags"),
            url: `${baseUrl}/blogs/tags`,
            active: isLinkActive(`${baseUrl}/blogs/tags`),
          },
        ]}
      />
      <SideBarItem
        icon={<ChartPie size={25} />}
        text={t("reports")}
        active={isLinkActive(`${baseUrl}/reports`)}
        links={false}
        url={`${baseUrl}/reports`}
        alert={false}
      />
      <SideBarItem
        icon={<Origami size={25} />}
        text={t("layout.main")}
        active={pathname.includes(`${baseUrl}/layout`)}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: t("layout.banners"),
            url: `${baseUrl}/layout/banners`,
            active: isLinkActive(`${baseUrl}/layout/banners`),
          },
          {
            text: t("layout.policies"),
            url: `${baseUrl}/layout/policies`,
            active: isLinkActive(`${baseUrl}/layout/policies`),
          },
          {
            text: t("layout.faqs"),
            url: `${baseUrl}/layout/faqs`,
            active: isLinkActive(`${baseUrl}/layout/faqs`),
          },
        ]}
      />
      <SideBarItem
        icon={<Settings size={25} />}
        text={t("settings")}
        active={isLinkActive(`${baseUrl}/settings`)}
        links={false}
        url={`${baseUrl}/settings`}
        alert={false}
      />
    </SideBar>
  );
};

export default SideBarDesktop;
