"use client";
import React from "react";
import { SideBar, SideBarItem } from "./SideBar";
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
  HandCoins
} from "lucide-react";


const SideBarDesktop = () => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const url = `en/dashboard`;

  return (
    <SideBar expanded={expanded} setExpanded={setExpanded}>
      <SideBarItem
        icon={<LayoutDashboard size={25} />}
        text="Dashboard"
        active={true}
        links={false}
        url={`${url}`}
        alert={false}
      />
      <SideBarItem
        icon={<PackageOpen size={25} />}
        text="Orders"
        active={false}
        links={false}
        url={`${url}/orders`}
        alert={false}
      />
      <SideBarItem
        icon={<HandCoins size={25} />}
        text="Expenses"
        active={false}
        links={false}
        url={`${url}/expenses`}
        alert={false}
      />
      <SideBarItem
        icon={<UsersRound size={25} />}
        text="Customers"
        active={false}
        links={false}
        url={`${url}/customers`}
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
        text="Products"
        active={false}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: "Products List",
            url: `${url}/products`,
            active: false,
          },
          {
            text: "Brands List",
            url: `${url}/products/brands`,
            active: false,
          },
          {
            text: "Collections List",
            url: `${url}/products/collections`,
            active: false,
          },
          {
            text: "Categories List",
            url: `${url}/products/categories`,
            active: false,
          },
          {
            text: "Colors List",
            url: `${url}/products/colors`,
            active: false,
          },
          {
            text: "Sizes List",
            url: `${url}/products/sizes`,
            active: false,
          },
          {
            text: "Tags List",
            url: `${url}/products/tags`,
            active: false,
          },
        ]}
      />
      <SideBarItem
        icon={<MessagesSquare size={25} />}
        text="Enquiries"
        active={false}
        links={false}
        url={`${url}/enquiries`}
        alert={false}
      />
      <SideBarItem
        icon={<Bell size={25} />}
        text="Notifications"
        active={false}
        links={false}
        url={`${url}/notifications`}
        alert={false}
      />

      <SideBarItem
        icon={<ChartPie size={25} />}
        text="Analytics"
        active={false}
        links={false}
        url={`${url}/analytics`}
        alert={false}
      />
      <SideBarItem
        icon={<Newspaper size={25} />}
        text="Blogs"
        active={false}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: "Blogs List",
            url: `${url}/blogs`,
            active: false,
          },
          {
            text: "Categories List",
            url: `${url}/blogs/categories`,
            active: false,
          },
          {
            text: "Tags List",
            url: `${url}/blogs/tags`,
            active: false,
          },
        ]}
      />
      <SideBarItem
        icon={<Settings size={25} />}
        text="Settings"
        active={false}
        links={false}
        url={`${url}/settings`}
        alert={false}
      />
    </SideBar>
  );
};

export default SideBarDesktop;
