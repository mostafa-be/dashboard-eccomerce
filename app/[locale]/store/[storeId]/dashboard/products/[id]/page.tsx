"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import { useGetProductQuery } from "@/redux/features/products/productsApi";
import ProductPage from "@/app/components/Product/ProductPage";
import LoadingList from "@/app/components/Loader/LoadingList";
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
  const { data, isError, isLoading, refetch } = useGetProductQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );
  // Handle loading state
  if (isLoading) {
    return <LoadingList product={true} />;
  }
  // Handle error state
  if (isError) {
    return (
      <LoadingError
        message="Failed to load the product. Please try again."
        onRetry={refetch}
      />
    );
  }
  // Handle case when data is null or undefined
  const product = data?.product;
  return (
    <>
      <Heading
        title={`Product : ${product?.title} `}
        keywords="Product"
        description="Product"
      />
      <ProductPage product={product} refetch={refetch} />
    </>
  );
};

export default Page;
