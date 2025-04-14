"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import CategoryPage from "@/app/components/Category/CategoryPage";
import { useGetCategoryQuery } from "@/redux/features/categories/categoriesApi";

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
  const { data, isLoading, isError, refetch } = useGetCategoryQuery(
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
    return <div>Error loading category </div>;
  }

  const category = data?.category || [];

  return (
    <>
      <Heading
        title={`Category : ${category?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <CategoryPage category={category} refetch={refetch} />
    </>
  );
};

export default Page;
