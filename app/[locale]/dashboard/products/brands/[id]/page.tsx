"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import { useGetBrandQuery } from "@/redux/features/brand/brandsApi";
import BrandPage from "@/app/components/Brand/BrandPage";

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

  if (isLoading || !resolvedParams) {
    return (
      <section className="w-full">
        <Skeleton className="w-full h-[500px] rounded-md" />
      </section>
    );
  }

  if (isError) {
    return <div>Error loading brand </div>;
  }

  const brand = data?.brand;

  return (
    <>
      <Heading
        title={`Brand : ${brand?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <BrandPage brand={brand} refetch={refetch} />
    </>
  );
};

export default Page;
