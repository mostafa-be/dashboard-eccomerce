import { Banner } from "@/app/@types/types";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import BannerForm from "./BannerForm";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";

type EditBannerPageProps = {
  banner: Banner;
};

const EditBannerPage = ({ banner }: EditBannerPageProps) => {
  const { data } = useGetAllProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const products = data?.products || [];
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
    { name: "Banners", url: "/en/dashboard/layout/banners" },
  ];
  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Edit Banner" />
      {/* Edit Banner Form */}
      <BannerForm isEdit banner={banner} products={products} />
    </section>
  );
};

export default EditBannerPage;
