"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import TagBlogPage from "@/app/components/TagBlog/TagBlogPage";
import { useGetBlogTagQuery } from "@/redux/features/blogTags/blogTagsApi";
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
  const { data, isLoading, isError, refetch } = useGetBlogTagQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (isLoading || !resolvedParams) {
    return <ViewLoading />;
  }

  if (isError) {
    return <div>Error loading tag blog</div>;
  }

  const tag = data?.tag;

  return (
    <>
      <Heading
        title={`Tag Blog: ${tag?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <TagBlogPage tag={tag} refetch={refetch} />
    </>
  );
};

export default Page;
