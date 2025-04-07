"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import { useGetCollectionQuery } from "@/redux/features/collections/collectionsApi";
import CollectionPage from "@/app/components/Collection/CollectionPage";

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
    return (
      <section className="w-full">
        <Skeleton className="w-full h-[500px] rounded-md" />
      </section>
    );
  }

  if (isError) {
    return <div>Error loading collection </div>;
  }

  const collection = data?.collection;

  return (
    <>
      <Heading
        title={`Collection : ${collection?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <CollectionPage collection={collection} refetch={refetch} />
    </>
  );
};

export default Page;
