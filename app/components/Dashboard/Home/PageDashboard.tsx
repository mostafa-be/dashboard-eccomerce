"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import Statistic from "./Statistic";
import { AnalyticsSales } from "./AnalyticsSales";
import RecentAndSales from "./RecentAndSales";
import BestSelling from "./BestSelling/BestSelling";
import { VisitorByBrowser } from "./VisitorByBrowser";
import { VisitorByDevice } from "./VisitorByDevice";

const PageDashboard = () => {
  const [period, setPeriod] = React.useState<string>("wekly");
  return (
    <section className="w-full">
      <ExportAndchange period={period} setPeriod={setPeriod} />
      <Statistic period={period} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-9 gap-5 mt-10 ">
        <AnalyticsSales period={period} setPeriod={setPeriod} />
        <RecentAndSales />
        <BestSelling />
        <div className="col-span-1 md:col-span-3 grid gap-5">
          <VisitorByBrowser period={ period} />
          <VisitorByDevice period={ period}/>
        </div>
      </div>
    </section>
  );
};

export default PageDashboard;
