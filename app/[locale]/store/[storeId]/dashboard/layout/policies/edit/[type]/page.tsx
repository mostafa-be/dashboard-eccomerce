"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import LoadingError from "@/app/components/Loader/LoadingError";
import { useGetPolicyByTypeQuery } from "@/redux/features/policies/policiesApi";
import EditPolicyPage from "@/app/components/Policies/EditPolicyPage";

/**
 * Page Component
 * Displays the details of a specific policy based on its type.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.type - The type of the policy.
 * @returns {JSX.Element} The rendered policy details page.
 */
const Page = ({ params }: { params: { type: string } }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    type: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    })();
  }, [params]);

  const type = unwrappedParams?.type?.replace(/-/g, " "); // Replace hyphens with spaces

  const { data, isError, isLoading, refetch } = useGetPolicyByTypeQuery(
    { type },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <ViewLoading />;
  }

  if (isError) {
    return <LoadingError message="Error loading policy" onRetry={refetch} />;
  }

  const policy = data?.policy || {};

  return (
    <>
      <Heading
        title={`Policy: ${policy?.title || "Unknown"}`}
        keywords="policy, details"
        description={`Details of the ${policy?.title || "policy"}`}
      />
      <EditPolicyPage refetch={refetch} policy={policy} />
    </>
  );
};

export default Page;
