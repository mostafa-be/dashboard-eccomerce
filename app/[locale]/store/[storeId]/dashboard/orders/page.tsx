import OrdersPage from "@/app/components/Orders/OrdersPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {

  return (
    <>
      <Heading title="Orders" keywords="Orders" description="Orders" />
      <OrdersPage />
    </>
  );
};

export default page;
