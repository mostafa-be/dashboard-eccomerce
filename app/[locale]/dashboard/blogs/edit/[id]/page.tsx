"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import LoadingError from "@/app/components/Loader/LoadingError";
import { useGetSingleBlogQuery } from "@/redux/features/blogs/blogsApi";
import BlogPage from "@/app/components/Blog/BlogPage";
import EditBlogPage from "@/app/components/EditBlog/EditBlogPage";

/**
 * Page Component
 * Fetches and displays a single blog post based on the provided ID.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the blog to fetch.
 * @returns {JSX.Element} The rendered component.
 */
const Page = ({ params }: { params: { id: string } }) => {
  // State to unwrap and store the route parameters
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  // Effect to resolve and set the route parameters
  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    })();
  }, [params]);

  // Extract the blog ID from the unwrapped parameters
  const id = unwrappedParams?.id;

  // Fetch the blog data using the Redux query hook
  const { data, isError, isLoading, refetch } = useGetSingleBlogQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  // Render a loading state while the data is being fetched
  if (isLoading) {
    return <ViewLoading />;
  }

  // Render an error state if the query fails
  if (isError && !data) {
    return <LoadingError message="Error loading Blog" onRetry={refetch} />;
  }

  // Extract the blog data or use an empty object as a fallback
  const blog = data?.blog || {};

  // Render the blog page with the fetched data
  return (
    <>
      <Heading
        title={`Edit Blog : ${blog?.title} `}
        keywords="edit blog, blogs, blog post, blog posts"
        description="edit blog"
      />
      <EditBlogPage blog={blog} />
    </>
  );
};

export default Page;
