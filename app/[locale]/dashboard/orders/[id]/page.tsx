"use client";
import React, { useEffect, useState } from "react";
import OrderPage from "@/app/components/Order/OrderPage";
import { useGetOrderQuery } from "@/redux/features/orders/ordersApi";
import Heading from "@/utils/Heading";
import PageInformation from "@/utils/PageInformation";
import LodingOrder from "@/app/components/Order/LoadingOrder";

const Page = ({ params }: { params: { id: string } }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
        setUnwrappedParams(resolvedParams);

    })();
  }, [params]);

  const id = unwrappedParams?.id;
    const { data: dataOrder, error, isLoading } = useGetOrderQuery({ id },
        { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LodingOrder/>;
  }
  if (error) {
    return <div className="">Error</div>;
  }

  const data = {
    title: "Orders",
    subTitle: `Order ${dataOrder._id}`,
  };
    const order = dataOrder.order
  return (
    <>
      <PageInformation data={data} />
      <Heading
        title={`Order Customer ${order.user.name}`}
        keywords="Orders"
        description="Orders"
      />
      <OrderPage order={order} />
    </>
  );
};

export default Page;