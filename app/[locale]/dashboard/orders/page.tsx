import OrdersPage from "@/app/components/Orders/OrdersPage";
import Heading from "@/utils/Heading";
import PageInformation from "@/utils/PageInformation";
import React from "react";

const page = () => {
  const data = {
    title: "Orders",
    subTitle: "Orders",
  };
  return (
    <>
            <PageInformation data={data} />
      <Heading title="Orders" keywords="Orders" description="Orders" />
      <OrdersPage />

    </>
  );
};

export default page;
