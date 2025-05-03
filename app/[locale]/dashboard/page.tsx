import Heading from "@/utils/Heading";
import React from "react";
import PageDashboard from "../../components/Dashboard/Home/PageDashboard";


const page = () => {

  return (
    <>

      <Heading title="Dashboard" keywords="dashboard" description="dashboard" />
      <PageDashboard />
    </>
  );
};

export default page;
