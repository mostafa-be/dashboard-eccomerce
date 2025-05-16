import PageBilling from "@/app/components/Account/Billing/PageBilling";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Billing"
        description="Manage your billing information and payment methods."
        keywords="billing, payment methods, account settings, dashboard"
      />
      <PageBilling />
    </>
  );
};

export default page;
