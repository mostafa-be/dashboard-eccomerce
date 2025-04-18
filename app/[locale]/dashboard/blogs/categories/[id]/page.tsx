"use client";

import React, { useEffect, useState } from "react";
import { useGetBlogCategoryQuery } from "@/redux/features/blogCategories/blogCategoriesApi";
import Heading from "@/utils/Heading";
import CategoryBlogPage from "@/app/components/CategoryBlog/CategoryBlogPage";
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
  const { data, isLoading, isError, refetch } = useGetBlogCategoryQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }

  if (isError) {
    return <div>Error loading category blog</div>;
  }

  const category = data?.category;

  return (
    <>
      <Heading
        title={`Category Blog: ${category?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <CategoryBlogPage category={category} refetch={refetch} />
    </>
  );
};

export default Page;
