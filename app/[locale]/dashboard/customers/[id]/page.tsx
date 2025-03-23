"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LodingOrder from "@/app/components/Order/LoadingOrder";
import { useGetUserQuery } from "@/redux/features/users/usersApi";
import CustomerPage from "@/app/components/Customer/CustomerPage";

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
  const { data, error, isLoading } = useGetUserQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LodingOrder />;
  }
  if (error) {
    return <div className="">Error</div>;
  }
    const user = data?.user

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
