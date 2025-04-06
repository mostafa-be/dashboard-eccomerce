"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import { useGetSizeQuery } from "@/redux/features/sizes/sizesApi";
import SizePage from "@/app/components/Size/SizePage";

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

  if (isLoading || !resolvedParams) {
    return (
      <section className="w-full">
        <Skeleton className="w-full h-[500px] rounded-md" />
      </section>
    );
  }

  if (isError) {
    return <div>Error loading size </div>;
  }

  const size = data?.size;
  if (!size) {
    return <div>Size not found</div>;
  }
  return (
    <>
      <Heading
        title={`Size : ${size?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <SizePage size={size} refetch={refetch} />
    </>
  );
};

export default Page;
