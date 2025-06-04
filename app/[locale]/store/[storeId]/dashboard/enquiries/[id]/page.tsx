"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetEnquiryQuery } from "@/redux/features/enquiries/enquiriesApi";
import EnquiryPage from "@/app/components/Enquiry/EnquiryPage";
import ViewLoading from '../../../../components/Loader/ViewLoading';
import LoadingError from "@/app/components/Loader/LoadingError";



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
  const { data, isError, isLoading,refetch } = useGetEnquiryQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );
  // Check if the data is still loading
  if (isLoading) {
    return <ViewLoading />;
  }
  // Check if there was an error during the query
  if (isError) {
    return <LoadingError message="Error loading Enquiry" onRetry={refetch} />;
  }
  // Check if data is null or undefined
    const enquiry = data?.enquiry || {};
  return (
    <>
      <Heading
        title={`Enquiry : ${enquiry?.name} `}
        keywords="Enquiry"
        description="enquiry"
      />
    <EnquiryPage enquiry={enquiry} />
   </>
  );
};

export default Page;
