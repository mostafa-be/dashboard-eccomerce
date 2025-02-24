import Heading from "@/utils/Heading";
import React from "react";
import PageDashboard from "../../components/Dashboard/Home/PageDashboard";
import PageInformation from "@/utils/PageInformation";

const page = () => {
  const data = {
    title: "Dashboard",
    subTitle: "Dashboard",
  };
  return (
    <>
      <PageInformation data={data} />
      <Heading title="Dashboard" keywords="dashboard" description="dashboard" />
      <PageDashboard />
    </>
  );
};

export default page;
