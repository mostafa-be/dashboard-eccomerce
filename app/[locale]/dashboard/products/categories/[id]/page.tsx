"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import CategoryPage from "@/app/components/Category/CategoryPage";
import { useGetCategoryQuery } from "@/redux/features/categories/categoriesApi";
import LoadingError from "@/app/components/Loader/LoadingError";
import ViewLoading from "@/app/components/Loader/ViewLoading";

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
  // Check if the data is still loading
  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }
  // Check if there was an error during the query
  if (isError) {
    return <LoadingError message="Error loading category" onRetry={refetch} />;
  }
  // Check if data is null or undefined
  const category = data?.category || {};

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
