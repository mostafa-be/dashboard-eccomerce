"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetSizeQuery } from "@/redux/features/sizes/sizesApi";
import SizePage from "@/app/components/Size/SizePage";
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
  const { data, isLoading, isError, refetch } = useGetSizeQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );
  // Check if the data is still loading
  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }

  if (isError) {
    return <LoadingError message="Error loading size" onRetry={refetch} />;
  }
  // Check if data is null or undefined
  const size = data?.size ?? null;
  if (size === null) {
    return <div>Size not found</div>;
  }
  return (
    <>
      <Heading
        title={`Size : ${size?.name}`}
        description="View and manage the details of your product size."
        keywords="product, size, management"
      />
      <SizePage size={size} refetch={refetch} />
    </>
  );
};

export default Page;
