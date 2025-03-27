"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, TitleCard } from "../ui/card";
import { Eye, ThumbsUp, ThumbsDown, FileText } from "lucide-react";

type Blog = {
  likes: Array<string>;
  dislikes: Array<string>;
  numViews: number;
};

type StatisticsBlogsProps = {
  blogs: Array<Blog>;
};

const StatisticsBlogs = ({ blogs }: StatisticsBlogsProps) => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    setTotalBlogs(blogs.length);
    setTotalLikes(blogs.reduce((sum, blog) => sum + blog.likes.length, 0));
    setTotalDislikes(blogs.reduce((sum, blog) => sum + blog.dislikes.length, 0));
    setTotalViews(blogs.reduce((sum, blog) => sum + blog.numViews, 0));
  }, [blogs]);

  const statistics = [
    {
      title: "Total Blogs",
      value: totalBlogs,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      textColor: "text-white",
      icon: <FileText size={90} className="text-white" />,
    },
    {
      title: "Total Likes",
      value: totalLikes,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      textColor: "text-white",
      icon: <ThumbsUp size={90} className="text-white" />,
    },
    {
      title: "Total Dislikes",
      value: totalDislikes,
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      textColor: "text-white",
      icon: <ThumbsDown size={90} className="text-white" />,
    },
    {
      title: "Total Views",
      value: totalViews,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-black",
      icon: <Eye size={90} className="text-black" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
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

export default StatisticsBlogs;
