"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LodingOrder from "@/app/components/Order/LoadingOrder";
import { useGetProductQuery } from "@/redux/features/products/productsApi";
import ProductPage from "@/app/components/Product/ProductPage";

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

  console.log("product", product);
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
