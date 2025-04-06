"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import Heading from "@/utils/Heading";
import { useGetColorQuery } from "@/redux/features/colors/colorsApi";
import ColorPage from "@/app/components/Color/ColorPage";

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
  const { data, isLoading, isError, refetch } = useGetColorQuery(
    { id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  if (isLoading || !resolvedParams) {
    return (
      <section className="w-full">
        <Skeleton className="w-full h-[500px] rounded-md" />
      </section>
    );
  }

  if (isError) {
    return <div>Error loading color </div>;
  }

  const color = data?.color;
  if (!color) {
    return <div>Color not found</div>;
  }
  return (
    <>
      <Heading
        title={`Color : ${color?.name}`}
        description="Manage your blog categories here."
        keywords="category, blog, manage"
      />
      <ColorPage color={color} refetch={refetch} />
    </>
  );
};

export default Page;
