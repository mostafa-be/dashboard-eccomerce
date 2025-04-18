"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetBrandQuery } from "@/redux/features/brand/brandsApi";
import BrandPage from "@/app/components/Brand/BrandPage";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import LoadingError from "@/app/components/Loader/LoadingError";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    })();
  }, [params]);

  const id = resolvedParams?.id;
  const { data, isLoading, isError, refetch } = useGetBrandQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );
  // Check if the data is still loading
  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }
  // Check if there was an error during the query
  if (isError) {
    return <LoadingError message="Error loading brand" onRetry={refetch}/>;
  }
  // Check if data is null or undefined
  const brand = data?.brand || {};

  return (
    <>
      <Heading
        title={`Brand : ${brand?.name}`}
        description="Manage your product brands here."
        keywords="category, blog, manage"
      />
      <BrandPage brand={brand} refetch={refetch} />
    </>
  );
};

export default Page;
