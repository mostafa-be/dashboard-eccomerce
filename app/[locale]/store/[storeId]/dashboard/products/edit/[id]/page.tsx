"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import EditProductPage from "@/app/components/EditProduct/EditProductPage";
import ViewLoading from "@/app/components/Loader/ViewLoading";
import LoadingError from "@/app/components/Loader/LoadingError";
import { useGetProductQuery } from "@/redux/features/products/productsApi";

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

  const { data, isError, isLoading, refetch } = useGetProductQuery(
    { id: id || "" },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (!id) {
    return (
      <LoadingError
        message="Invalid product ID. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Check if the data is still loading
  if (isLoading) {
    return <ViewLoading />;
  }

  // Check if there was an error during the query
  if (isError) {
    return (
      <LoadingError
        message="Error loading product. Please try again."
        onRetry={refetch}
      />
    );
  }
  // Check if data is null or undefined
  const product = data?.product;
  return (
    <>
      <Heading
        title={`Edit Product : ${product?.title} `}
        keywords="Edit Product"
        description="Edit Product"
      />
      <EditProductPage product={product} refetch={refetch} />
    </>
  );
};

export default Page;
