import PageDashboard from "@/app/components/Dashboard/Home/PageDashboard";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Dashboard" keywords="dashboard" description="dashboard" />
      <PageDashboard />
    </>
  );
};

export default page;
