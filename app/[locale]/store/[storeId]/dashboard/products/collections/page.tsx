
import CollectionsPage from "@/app/components/Collections/CollectionPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {

  return (
    <>
      <Heading
        title="Collections"
        keywords="collections "
        description="collections"
      />
      <CollectionsPage />
    </>
  );
};

export default page;
