"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import Statistic from "./Statistic";

const PageDashboard = () => {
  const [period, setPeriod] = React.useState<string>("wekly");
  return (
    <section className="w-full">
      <ExportAndchange period={period} setPeriod={setPeriod} />
      <Statistic period={period} />
    </section>
  );
};

export default PageDashboard;
