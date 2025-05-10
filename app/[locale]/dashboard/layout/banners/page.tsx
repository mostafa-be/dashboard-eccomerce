import BannersPage from "@/app/components/Banners/BannersPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Banners"
        description="Manage your banners here"
        keywords="banners, manage banners, dashboard banners"
      />
      <BannersPage />
    </>
  );
};

export default page;
