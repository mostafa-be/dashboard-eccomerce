"use client";
import React from 'react'
import { ChevronDown, ChevronRight, CloudDownload } from "lucide-react";
import Link from "next/link";

type Props = {
    setPeriod(period: string): void;
    period: string;
}
const ExportAndchange = ({setPeriod, period}: Props) => {
    const timePeriods = ["wekly", "monthly", "yearly"];
    const [isopen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="w-full flex flex-wrap gap-2 items-center justify-between">
    <div className="flex flex-col  justify-start gap-1">
      <h1 className="text-2xl font-semibold font-Poppins text-black dark:text-white">
        Good Morning , Darrell👋
      </h1>
      <div className="flex  items-center justify-start gap-1">
        <h5 className="text-sm cursor-no-drop text-gray-700/90 dark:text-white/90">
          Home
        </h5>
        <ChevronRight
          size={15}
          className="text-gray-700/90  dark:text-white/90"
        />
        <Link
          href={``}
          className="text-sm cursor-pointer  text-blue-500/90"
        >
          Dashboard
        </Link>
      </div>
    </div>
    <div className="flex items-center select-none gap-2.5">
      <div
        onClick={() => setIsOpen(!isopen)}
        className="w-32 py-2.5 px-3 flex items-center cursor-pointer justify-between relative bg-white dark:bg-black-100/90 shadow rounded border border-gray-500/90"
      >
        <span className="text-sm font-normal text-gray-900 dark:text-white capitalize ">
          {period}
        </span>
        <ChevronDown size={15} className="text-gray-900 dark:text-white" />
        {isopen && (
          <div className="absolute overflow-hidden top-14 left-0 w-full rounded-lg bg-white dark:bg-black-100/90 shadow flex-col border border-gray-500/90">
            {timePeriods &&
              timePeriods.map((time, i) => {
                return (
                  <div
                    onClick={() => setPeriod(time)}
                    key={i}
                    className={`hover:bg-gray-300/50 px-3 py-2.5 ${
                      i > 0 && "border-t border-gray-500/90"
                    } ${
                      period === time ? "bg-gray-300/60" : "bg-transparent"
                    } `}
                  >
                    <span className="text-sm text-gray-900 dark:text-white capitalize ">
                      {time}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className=" font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2  bg-blue-650 shadow rounded">
        <CloudDownload
          size={18}
          className="text-white text-sm font-semibold"
        />
        <span className="text-white text-sm ">Export PDF</span>
      </div>
    </div>
  </div>
  )
}

export default ExportAndchange