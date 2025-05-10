"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LoadingError from "@/app/components/Loader/LoadingError";
import { useGetBannerQuery } from "@/redux/features/banners/bannersApi";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import EditBannerPage from "@/app/components/Banners/EditBannerPage";

/**
 * Edit Banner Page
 * Fetches and displays a banner for editing based on the provided ID.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the banner to edit.
 * @returns {JSX.Element} The rendered edit banner page.
 */
const Page = ({ params }: { params: { id: string } }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    })();
  }, [params]);

  const id = unwrappedParams?.id;
  const { data, isError, isLoading, refetch } = useGetBannerQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  // Render loading state
  if (isLoading) {
    return <ViewLoading />;
  }

  // Render error state
  if (isError) {
    return <LoadingError message="Error loading Banner" onRetry={refetch} />;
  }

  // Extract banner data or use an empty object as fallback
  const banner = data?.banner || {};

  return (
    <>
      <Heading
        title={`Edit Banner: ${banner?.name}`}
        keywords="edit banner, banner management, dashboard"
        description="Edit an existing banner in the dashboard."
      />
      <EditBannerPage banner={banner} />
    </>
  );
};

export default Page;
