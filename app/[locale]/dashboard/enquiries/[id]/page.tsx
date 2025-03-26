"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LodingOrder from "@/app/components/Order/LoadingOrder";
import { useGetEnquiryQuery } from "@/redux/features/enquiries/enquiriesApi";
import EnquiryPage from "@/app/components/Enquiry/EnquiryPage";



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
  const { data, error, isLoading } = useGetEnquiryQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LodingOrder />;
  }
  if (error) {
    return <div className="">Error</div>;
  }
    const enquiry = data?.enquiry

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
