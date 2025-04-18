"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetTagQuery } from "@/redux/features/tags/tagsApi";
import TagPage from "@/app/components/Tag/TagPage";
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
  const { data, isLoading, isError, refetch } = useGetTagQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );
  // Check if the data is still loading
  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }
  // Check if there was an error during the query
  if (isError) {
    return <LoadingError message="Error loading tag" onRetry={refetch} />;
  }
  // Check if data is null or undefined
  const tag = data?.tag || {};

  return (
    <>
      <Heading
        title={`Product Tag: ${tag?.name}`}
        description="Manage your product tags here."
        keywords="product, tag, manage"
      />
      <TagPage tag={tag} refetch={refetch} />
    </>
  );
};

export default Page;
