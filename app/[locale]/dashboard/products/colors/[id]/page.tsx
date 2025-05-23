"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetColorQuery } from "@/redux/features/colors/colorsApi";
import ColorPage from "@/app/components/Color/ColorPage";
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
  const { data, isLoading, isError, refetch } = useGetColorQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }

  if (isError) {
    return <LoadingError message="Error loading color" onRetry={refetch} />;
  }

  const color = data?.color;
  if (!color) {
    return <div>Color not found</div>;
  }
  return (
    <>
      <Heading
        title={`Color : ${color?.name}`}
        description="Manage your product colors here."
        keywords="category, blog, manage"
      />
      <ColorPage color={color} refetch={refetch} />
    </>
  );
};

export default Page;
