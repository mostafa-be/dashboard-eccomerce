"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsOrder from "./StatisticsOrder";
import Link from "next/link";
import { SquarePen } from "lucide-react";
//import { PieChartOrder } from "./PieChartOrder";

const OrdersPage = () => {
  const [period, setPeriod] = React.useState<string>("weekly");
  return (
    <section className="w-full">
      <ExportAndchange period={period} setPeriod={setPeriod} />
      <StatisticsOrder period={period} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/orders/create-order"}
          className="px-3 py-2.5 rounded-md shadow bg-blue-650 text-white flex items-center gap-2"
        ><SquarePen size={20}/>
          <span className="text-[16px] font-[500]">Create Order</span>
        </Link>
      </div>
      <div className="w-full">
        
      </div>
    </section>
  );
};

export default OrdersPage;
