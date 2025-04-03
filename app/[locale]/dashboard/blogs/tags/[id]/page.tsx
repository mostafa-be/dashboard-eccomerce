"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import TagBlogPage from "@/app/components/TagBlog/TagBlogPage";
import { useGetBlogTagQuery } from "@/redux/features/blogTags/blogTagsApi";

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
  const { data, isLoading, isError, refetch } = useGetBlogTagQuery(
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
    return <div>Error loading tag blog</div>;
  }

  const tag = data?.tag;

  return (
    <>
      <Heading
        title={`Category Blog: ${tag?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <TagBlogPage tag={tag} refetch={refetch} />
    </>
  );
};

export default Page;
