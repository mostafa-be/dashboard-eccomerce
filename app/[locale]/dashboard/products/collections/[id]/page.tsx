"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetCollectionQuery } from "@/redux/features/collections/collectionsApi";
import CollectionPage from "@/app/components/Collection/CollectionPage";
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
  const { data, isLoading, isError, refetch } = useGetCollectionQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }

  if (isError) {
    return <LoadingError message="Error loading collection" onRetry={refetch} />;
  }

  const collection = data?.collection;

  return (
    <>
      <Heading
        title={`Collection : ${collection?.name}`}
        description="Manage your product collections here."
        keywords="category, blog, manage"
      />
      <CollectionPage collection={collection} refetch={refetch} />
    </>
  );
};

export default Page;
