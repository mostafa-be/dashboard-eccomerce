"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LodingOrder from "@/app/components/Order/LoadingOrder";
import { useGetProductQuery } from "@/redux/features/products/productsApi";
import EditProductPage from "@/app/components/EditProduct/EditProductPage";

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
  const { data, error, isLoading, refetch } = useGetProductQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LodingOrder />;
  }
  if (error) {
    return <div className="">Error</div>;
  }
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
