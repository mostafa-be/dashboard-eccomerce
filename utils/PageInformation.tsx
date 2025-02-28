"use client";
import { useEffect } from "react";
import { handlePageInfoChange } from "./storage";

type Props = {
  data: {
    title: string;
    subTitle: string;
  };
};

const PageInformation = ({ data }: Props) => {
  useEffect(() => {
    if (data) {
      localStorage.setItem("pageInfo", JSON.stringify(data));
    }
  }, [data]);
  useEffect(() => {
    handlePageInfoChange(data);
  }, [data]);

  return <></>;
};

export default PageInformation;
