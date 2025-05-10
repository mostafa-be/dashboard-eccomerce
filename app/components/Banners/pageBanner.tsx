import { Banner } from "@/app/@types/types";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import BannerDetails from "./BannerDetails";

/**
 * PageBanner Component
 * Displays the details of a specific banner along with breadcrumb navigation.
 *
 * @param {PageBannerProps} props - The component props.
 * @param {Banner} props.banner - The banner data to display.
 * @returns {JSX.Element} The rendered page banner component.
 */
type PageBannerProps = {
  banner: Banner;
};

const PageBanner = ({ banner }: PageBannerProps) => {
  // Breadcrumb navigation links
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
    { name: "Banners", url: "/en/dashboard/layout/banners" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Banner details" />

      {/* Banner details */}
      <BannerDetails banner={banner} />
    </section>
  );
};

export default PageBanner;
