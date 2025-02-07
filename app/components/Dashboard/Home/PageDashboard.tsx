"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import Statistic from "./Statistic";
import { AnalyticsSales } from "./AnalyticsSales";

const PageDashboard = () => {
  const [period, setPeriod] = React.useState<string>("wekly");
  return (
    <section className="w-full">
      <ExportAndchange period={period} setPeriod={setPeriod} />
      <Statistic period={period} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-10 mt-10 ">
        <AnalyticsSales period={period} setPeriod={setPeriod} />
      </div>
    </section>
  );
};

export default PageDashboard;
