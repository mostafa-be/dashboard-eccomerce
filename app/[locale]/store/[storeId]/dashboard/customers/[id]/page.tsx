"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetUserQuery } from "@/redux/features/users/usersApi";
import CustomerPage from "@/app/components/Customer/CustomerPage";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import LoadingError from "@/app/components/Loader/LoadingError";

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
  const { data, isError, isLoading, refetch } = useGetUserQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <ViewLoading customer={true} />;
  }
  // Check if there was an error during the query
  if (isError) {
    return <LoadingError message="Error loading Customer" onRetry={refetch} />;
  }
  // Check if data is null or undefined
  const user = data?.user || {};

  return (
    <>
      <Heading
        title={`Customer : ${user?.name} `}
        keywords="Customer"
        description="Customer"
      />
      <CustomerPage user={user} />
    </>
  );
};

export default Page;
