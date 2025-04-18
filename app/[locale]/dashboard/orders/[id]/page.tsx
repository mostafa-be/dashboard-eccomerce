"use client";
import React, { useEffect, useState } from "react";
import OrderPage from "@/app/components/Order/OrderPage";
import { useGetOrderQuery } from "@/redux/features/orders/ordersApi";
import Heading from "@/utils/Heading";
import LoadingError from "@/app/components/Loader/LoadingError";
import LoadingList from "@/app/components/Loader/LoadingList";

const Page = ({ params }: { params: { id: string } }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    })();
  }, [params]);

  const id = unwrappedParams?.id;
  const {
    data: dataOrder,
    isError,
    isLoading,
    refetch,
  } = useGetOrderQuery({ id }, { refetchOnMountOrArgChange: true });
  // Handle loading state
  if (isLoading) {
    return <LoadingList order={true} />;
  }
  // Handle loading error
  if (isError) {
    return <LoadingError message="Error loading order" onRetry={refetch} />;
  }
  // Handle empty data
  const order = dataOrder.order || {};
  return (
    <>
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
