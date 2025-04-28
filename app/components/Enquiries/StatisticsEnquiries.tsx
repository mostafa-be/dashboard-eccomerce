"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, TitleCard } from "../ui/card";
import { ClipboardList, PhoneCall, Loader, CheckCircle } from "lucide-react";

type Enquiry = {
  status: "Submitted" | "Contacted" | "In Progress" | "Resolved";
};

type StatisticsEnquiriesProps = {
  enquiries: Array<Enquiry>;
};

const StatisticsEnquiries = ({ enquiries }: StatisticsEnquiriesProps) => {
  const [submittedCount, setSubmittedCount] = useState(0);
  const [contactedCount, setContactedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    setSubmittedCount(
      enquiries.filter((enquiry) => enquiry.status === "Submitted").length
    );
    setContactedCount(
      enquiries.filter((enquiry) => enquiry.status === "Contacted").length
    );
    setInProgressCount(
      enquiries.filter((enquiry) => enquiry.status === "In Progress").length
    );
    setResolvedCount(
      enquiries.filter((enquiry) => enquiry.status === "Resolved").length
    );
  }, [enquiries]);

  const statistics = [
    {
      title: "Submitted",
      value: submittedCount,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      textColor: "text-white",
      icon: <ClipboardList size={90} className="text-white" />,
    },
    {
      title: "Contacted",
      value: contactedCount,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-black",
      icon: <PhoneCall size={90} className="text-black" />,
    },
    {
      title: "In Progress",
      value: inProgressCount,
      bgColor: "bg-gradient-to-r from-orange-500 to-orange-700",
      textColor: "text-white",
      icon: <Loader size={90} className="text-white" />,
    },
    {
      title: "Resolved",
      value: resolvedCount,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      textColor: "text-white",
      icon: <CheckCircle size={90} className="text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {statistics.map((statistic, index) => (
        <Card
          key={index}
          className={`relative w-full rounded-lg shadow-lg p-5 flex flex-col items-center justify-center overflow-hidden ${statistic.bgColor} hover:shadow-xl transition-shadow duration-300`}
        >
          <div
            className={`absolute top-1 left-2 opacity-40 ${statistic.textColor}`}
          >
            {statistic.icon}
          </div>
          <CardContent className="flex flex-col items-center">
            <TitleCard
              title={statistic.title}
              className={`text-lg font-semibold text-center ${statistic.textColor}`}
            />
            <span className={`text-4xl font-extrabold ${statistic.textColor}`}>
              {statistic.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsEnquiries;
