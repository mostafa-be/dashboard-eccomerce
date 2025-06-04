import EnquiriesPage from "@/app/components/Enquiries/EnquiriesPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Enquiries" keywords="Enquiries" description="Enquiries" />
      <EnquiriesPage />
    </>
  );
};

export default page;
